export function termine(Name) {
    const terminFormular = document.querySelector('#terminFormular');
    const terminListe = document.getElementById('terminListe');
    const terminInhalt = document.getElementById('terminInhalt');
    const terminDatum = document.getElementById('terminDatum');
    const terminUhrzeit = document.getElementById('terminUhrzeit');
    const terminFarbe = document.getElementById('terminFarbe');

    terminFormular.addEventListener('submit', (event) => {
        event.preventDefault();

        const datumObjekt = new Date(terminDatum.value);
        const datumFormatierung = datumObjekt.toLocaleDateString('de-DE');
        
        const listeTerminitems = document.createElement('li');
        listeTerminitems.className = 'listenEintrag';
        listeTerminitems.innerHTML = 
            `<span class="terminItems">      
            ${datumFormatierung}, ${terminUhrzeit.value} Uhr: ${Name.value} - ${terminInhalt.value}
            </span>
            <div class="listenButtons">
                <button class="checkButton"><img src="check_button.svg"></button>
                <button class="deleteButton"><img src="delete_button.svg"></button>
            </div>     
            `;

        switch(terminFarbe.value) {
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
        terminDatum.value = '';
        terminUhrzeit.value = '';
        terminFarbe.selectedIndex = 0;
    });

    //Editieren Termin
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

        const terminItemvalue = editTerminitem.textContent;
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

    //Termin als erledigt markieren (durchstreichen)
    terminListe.addEventListener('click', (event) => { 
        const checkButton = event.target.closest('.checkButton');
        if (!checkButton) return;

        const terminEintrag = checkButton.closest('.listenEintrag');
        const checkText = terminEintrag.querySelector('.terminItems');

        checkText.classList.toggle('erledigt');
    });

    //Löschen Termin
    terminListe.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.deleteButton');
        if (!deleteButton) return;

        const terminEintrag = deleteButton.closest('.listenEintrag');
        if (terminEintrag) {
            terminEintrag.remove();
        }
    });

}