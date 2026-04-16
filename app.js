function analizzaRisultati() {
    // 1. Recuperiamo i valori dagli input
    const data = document.getElementById('dataEstrazione').value;
    const estrattiString = document.getElementById('numeriEstratti').value;
    const giocateString = document.getElementById('combinazioniGiocate').value;
    const divRisultati = document.getElementById('risultati');

    // Controllo di sicurezza base
    if (!estrattiString || !giocateString) {
        alert("Inserisci sia i numeri estratti che le tue combinazioni!");
        return;
    }

    // 2. Pulizia e conversione dei numeri estratti in un Array di interi
    // Usiamo una RegEx per gestire sia spazi multipli che virgole
    const estrattiArray = estrattiString.split(/[\s,]+/).map(Number).filter(n => n > 0 && n <= 90);
    
    if (estrattiArray.length !== 6) {
        alert("Assicurati di aver inserito esattamente 6 numeri estratti validi (da 1 a 90).");
        return;
    }

    // 3. Elaborazione delle combinazioni giocate
    const righeGiocate = giocateString.trim().split('\n');
    let htmlRisultati = `<h3>📊 Risultati del ${data || 'Oggi'}:</h3><ul>`;

    // Analizziamo riga per riga
    righeGiocate.forEach((riga, indice) => {
        // Estrapoliamo i numeri della singola giocata
        const giocataArray = riga.split(/[\s,]+/).map(Number).filter(n => n > 0 && n <= 90);
        
        if (giocataArray.length === 0) return; // Salta righe vuote

        // 4. LA MAGIA: Troviamo i numeri in comune (Intersezione)
        const numeriIndovinati = giocataArray.filter(numero => estrattiArray.includes(numero));
        const punteggio = numeriIndovinati.length;

        // 5. Formattazione dell'output visivo
        let etichettaPunti = punteggio === 1 ? "punto" : "punti";
        htmlRisultati += `
            <li class="match-${punteggio}">
                Combinazione ${indice + 1} [${giocataArray.join(', ')}]: 
                Hai fatto ${punteggio} ${etichettaPunti}! 
                ${punteggio > 0 ? `(Presi: ${numeriIndovinati.join(', ')})` : ''}
            </li>
        `;
    });

    htmlRisultati += `</ul>`;
    
    // Mostriamo il pannello dei risultati
    divRisultati.innerHTML = htmlRisultati;
    divRisultati.style.display = 'block';
}
