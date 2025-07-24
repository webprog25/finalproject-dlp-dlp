export function todo(Name) {

    const todoFormular = document.querySelector('#todoFormular');
    const todoListe = document.getElementById('todoListe');
    const todoInhalt = document.getElementById('todoInhalt');
    const todoDatum = document.getElementById('todoDatum');
    const todoFarbe = document.getElementById('todoFarbe');

    todoFormular.addEventListener('submit', (event) => {
        event.preventDefault();

        const datumObjekt = new Date(todoDatum.value);
        const datumFormatierung = datumObjekt.toLocaleDateString('de-DE');

        const listeTodoitems = document.createElement('li');
        listeTodoitems.className = 'listenEintrag';
        listeTodoitems.dataset.name = Name.value; // Tipp von chatGPT: Name speichern. Dadurch wird nicht der Name des letzten Eintrages übernommen, wenn ich einen Eintrag nachträglich editiere.
        listeTodoitems.innerHTML = `
            <span class="todoItems">
                ${datumFormatierung}: ${Name.value} - ${todoInhalt.value}
            </span>
            <div class="listenButtons">
                <button class="checkButton"><img src="check_button.svg"></button>
                <button class="deleteButton"><img src="delete_button.svg"></button>
            </div>    
            `;
        
        switch(todoFarbe.value) {
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
        
        todoInhalt.value = '';
        todoDatum.value = '';
        todoFarbe.selectedIndex = 0;
    });

    //Editieren Todo
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


    //Todo als erledigt markieren (durchstreichen)
    todoListe.addEventListener('click', (event) => { 
        const checkButton = event.target.closest('.checkButton');
        if (!checkButton) return;

        const todoEintrag = checkButton.closest('.listenEintrag');
        const checkText = todoEintrag.querySelector('.todoItems');

        checkText.classList.toggle('erledigt');
    });

    //Löschen Todo
    todoListe.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.deleteButton');
        if (!deleteButton) return;

        const deleteTodoItem = deleteButton.closest('li');
        if (deleteTodoItem) {
            deleteTodoItem.remove();
        }
    });

}