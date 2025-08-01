export function termine(Name) {
    const terminFormular = document.querySelector('#terminFormular');
    const terminListe = document.getElementById('terminListe');
    const terminInhalt = document.getElementById('terminInhalt');
    const terminDatum = document.getElementById('terminDatum');
    const terminUhrzeit = document.getElementById('terminUhrzeit');
    const terminFarbe = document.getElementById('terminFarbe');
   
    // Formular absenden und Termin speichern. Hilfstellung chatGPG: async für fetch hinzugefügt.
    terminFormular.addEventListener('submit', async (event) => {
        event.preventDefault();

        const terminEintrag = {
            typ: 'Termin',
            name: Name.value,
            datum: terminDatum.value,
            uhrzeit: terminUhrzeit.value,
            inhalt: terminInhalt.value,
            farbe: terminFarbe.value
        };

        // Hilfestellung chatGPT: Termineintrag an Server senden (Diesen Block-Code habe ich komplett übernommen)
        try {
        const res = await fetch('/api/termin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(terminEintrag)
        });

        if (!res.ok) throw new Error('Fehler beim Speichern');

        termineAnzeigen(terminEintrag);
        terminFormular.reset();   // Formular leeren
        } catch (err) {
            console.error('Fehler beim Speichern:', err);
        }
    });

    //Termin editieren 
    terminListe.addEventListener('click', (event) => {
        const editTerminitem = event.target.closest('.terminItems');
        
        // Hilfesstellung chatGPT: Überprüfung ob Termineintrag vorhanden ist. 
        // Wenn nicht, soll keine Funktion ausgeführt werden. 
        // Damit beim Klicken auf einen leeren Bereich oder ein anderes Element kein Fehler erfolgt.
        if (!editTerminitem) return;

        // Hilfstellung chatGPT: Überprüfung, ob ein Input-Feld bereits existiert.
        // Damit man nicht mehrere Editierfelder auf denselben Eintrag stapeln kann.
        // Verhindert wiederholtes Klicken auf denselben Eintrag.
        if (editTerminitem.querySelector('input')) return;

        // Hilfestellung chatGPT: trim() hinzugefügt, um Leerzeichen zu entfernen.
        const terminItemvalue = editTerminitem.textContent.trim();
        const inputFeld = document.createElement('input');

        inputFeld.type = 'text';
        inputFeld.value = terminItemvalue;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'speichern';

        editTerminitem.innerHTML = '';
        editTerminitem.appendChild(inputFeld);
        editTerminitem.appendChild(saveButton);

        let gespeichert = false;
        function speichern() {
            if (gespeichert) return;
            gespeichert = true;
            const editierterText = inputFeld.value.trim();
            editTerminitem.textContent = editierterText;
        }
        saveButton.addEventListener('click', speichern);
    });

    //Termin durchstreichen (als erledigt markieren)
    terminListe.addEventListener('click', (event) => { 
        const checkButton = event.target.closest('.checkButton');
        if (!checkButton) return;

        const listenEintrag = checkButton.closest('.listenEintrag');
        const checkText = listenEintrag.querySelector('.terminItems');

        checkText.classList.toggle('erledigt');
    });

    //Termin löschen 
    terminListe.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.deleteButton');
        if (!deleteButton) return;

        const listenEintrag = deleteButton.closest('.listenEintrag');
        if (listenEintrag) {
            listenEintrag.remove();
        }
    });

    //Methoden:
    // Funktion zum Anzeigen der erzeugten Termine in der Liste
    function termineAnzeigen(terminEintrag) { 
        const datumObjekt = new Date(terminEintrag.datum);
        const datumFormatierung = datumObjekt.toLocaleDateString('de-DE');
        
        const listeTerminitems = document.createElement('li');
        listeTerminitems.className = 'listenEintrag';
        listeTerminitems.innerHTML = 
            `<span class="terminItems">      
            ${datumFormatierung}, ${terminEintrag.uhrzeit} Uhr: ${terminEintrag.name} - ${terminEintrag.inhalt}
            </span>
            <div class="listenButtons">
                <button class="Buttonicons"><img src="check_button.svg"></button>
                <button class="Buttonicons"><img src="delete_button.svg"></button>
            </div>     
            `;

        switch(terminEintrag.farbe) {
            case 'Rot':
                    listeTerminitems.style.backgroundColor = '#F4A6A6';
                break;

            case 'Gelb':
                    listeTerminitems.style.backgroundColor = '#FFFACD';
                break;

            case 'Grün':
                    listeTerminitems.style.backgroundColor = '#BFD8B8';
                break;

            case 'Blau':
                    listeTerminitems.style.backgroundColor = '#AEC6CF';
                break;

            default: 
                break;
        }

        terminListe.appendChild(listeTerminitems);
        /* Formular leeren
        terminDatum.value = '';
        terminUhrzeit.value = '';
        terminFarbe.selectedIndex = 0; */
    };

    // Hilfestellung chatGPT: Beim Laden alle vorhandenen Termine holen (Diesen Block-Code habe ich komplett übernommen)
    async function termineLaden() {
            try {
                const res = await fetch('/api/eintraege');
                if (!res.ok) throw new Error('Fehler beim Laden');

                const daten = await res.json();
                const termine = daten.termine.filter(e => e.typ === 'Termin');
                terminListe.innerHTML = ''; // Liste leeren

                termine.forEach(termineAnzeigen);
            } catch (err) {
                console.error('Fehler beim Laden der Termine:', err);
            }
        }
        
    //alle Termine laden stets bei Seitenaufruf bzw. -aktualisierung
    termineLaden();
};