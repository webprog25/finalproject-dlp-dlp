import { wochenplan } from './wochenplan.js';
import { termine } from './termine.js';
import { todo } from './todo.js';

document.addEventListener('DOMContentLoaded', () => {
    const Name = document.querySelector('#Name');
    wochenplan(Name);
    termine(Name);
    todo(Name);

    const Kategorie = document.getElementById('Kategorie');
    const menüFormular = document.getElementById('menüFormular');
    const Wochenplan = document.getElementById('Wochenplan');
    const Termin = document.getElementById('Termin');
    const Todo = document.getElementById('Todo');

    menüFormular.addEventListener('submit', (event) => {
        event.preventDefault();
        
        console.log("Kategorie gewählt:", Kategorie.value);

        switch(Kategorie.value) {
            case 'Wochenplan':
                Wochenplan.classList.remove('hidden');
                Termin.classList.add('hidden');
                Todo.classList.add('hidden');
                break;

            case 'Termin':
                Termin.classList.remove('hidden');
                Wochenplan.classList.add('hidden');
                Todo.classList.add('hidden');
                break;

            case 'Todo':
                Todo.classList.remove('hidden');
                Wochenplan.classList.add('hidden');
                Termin.classList.add('hidden');
                break;

            default:
                break;
        }
    });

});
