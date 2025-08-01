export function todo(Name) {
    const todoFormular = document.querySelector('#todoFormular');
    const todoListe = document.getElementById('todoListe');
    const todoInhalt = document.getElementById('todoInhalt');
    const todoDatum = document.getElementById('todoDatum');
    const todoFarbe = document.getElementById('todoFarbe');

    // Formular absenden und Termin speichern
    todoFormular.addEventListener('submit', async (event) => {
        event.preventDefault();

        const todoEintrag = {
            typ: 'Todo',
            name: Name.value,
            datum: todoDatum.value,
            inhalt: todoInhalt.value,
            farbe: todoFarbe.value
        };
        console.log('Eintrag, der gespeichert wird:', todoEintrag);
        try {
        const res = await fetch('/api/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoEintrag)
        });

        if (!res.ok) throw new Error('Fehler beim Speichern');

        todoAnzeigen(todoEintrag);
        todoFormular.reset();   // Formular leeren
        } catch (err) {
            console.error('Fehler beim Speichern:', err);
        }
    });

    //Todo editieren 
    todoListe.addEventListener("click", (event) => {
        const editTodoitem = event.target.closest('.todoItems');
        
        if (!editTodoitem) return;
        if (editTodoitem.querySelector('input')) return; // Prüfen, ob bereits ein Input-Feld existiert

        const todoitemValue = editTodoitem.textContent.trim();
        const inputFeld = document.createElement('input');
        
        inputFeld.type = 'text';
        inputFeld.value = todoitemValue;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'speichern';
  
        // Tipp chatGPT: Inhalt leeren und Input + Button hinzufügen
        editTodoitem.innerHTML = '';
        editTodoitem.appendChild(inputFeld);
        editTodoitem.appendChild(saveButton);

        let gespeichert = false;
        function speichern() {
            if (gespeichert) return;
            gespeichert = true;
            const editierterText = inputFeld.value.trim();
            editTodoitem.textContent = editierterText;
        }
        saveButton.addEventListener('click', speichern);
    });

    //Todo durchstreichen (als erledigt markieren)
    todoListe.addEventListener('click', (event) => { 
        const checkButton = event.target.closest('.checkButton');
        if (!checkButton) return;

        const todoEintrag = checkButton.closest('.listenEintrag');
        const checkText = todoEintrag.querySelector('.todoItems');

        checkText.classList.toggle('erledigt');
    });

    //Todo löschen 
    todoListe.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.deleteButton');
        if (!deleteButton) return;

        const deleteTodoItem = deleteButton.closest('li');
        if (deleteTodoItem) {
            deleteTodoItem.remove();
        }
    });

    //Methoden:
    // Funktion zum Anzeigen der erzeugten Todos in der Liste
    function todoAnzeigen(todoEintrag) {
        const datumObjekt = new Date(todoEintrag.datum);
        const datumFormatierung = datumObjekt.toLocaleDateString('de-DE');

        const listeTodoitems = document.createElement('li');
        listeTodoitems.className = 'listenEintrag';
        listeTodoitems.innerHTML = `
            <span class="todoItems">
                ${datumFormatierung}: ${todoEintrag.name} - ${todoEintrag.inhalt}
            </span>
            <div class="listenButtons">
                <button class="Buttonicons"><img src="check_button.svg"></button>
                <button class="Buttonicons"><img src="delete_button.svg"></button>
            </div>    
            `;
        
        switch(todoEintrag.farbe) {
            case 'Rot':
                    listeTodoitems.style.backgroundColor = '#F4A6A6';
                break;

            case 'Gelb':
                    listeTodoitems.style.backgroundColor = '#FFFACD';
                break;

            case 'Grün':
                    listeTodoitems.style.backgroundColor = '#BFD8B8';
                break;

            case 'Blau':
                    listeTodoitems.style.backgroundColor = '#AEC6CF';
                break;

            default: 
                break;
        }
        
        todoListe.appendChild(listeTodoitems); 
        };

    async function todoLaden() {
        try {
            const res = await fetch('/api/eintraege');
            if (!res.ok) throw new Error('Fehler beim Laden');

            const daten = await res.json();
            const todos = daten.todos.filter(e => e.typ === 'Todo');
            todoListe.innerHTML = ''; // Liste leeren

            todos.forEach(todoAnzeigen);
        } catch (err) {
            console.error('Fehler beim Laden der Termine:', err);
        }
    }

        todoLaden(); // Alle Todos laden bei Seitenaufruf bzw. -aktualisierung
    };