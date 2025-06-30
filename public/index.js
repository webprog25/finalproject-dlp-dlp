const Name = document.querySelector("#Name");
let Wochenkalender;

document.addEventListener('DOMContentLoaded', function () {
  const calendar = document.getElementById('wochenKalender');

  Wochenkalender = new FullCalendar.Calendar(calendar, { 
        initialView: 'timeGridWeek',
        locale: 'de',
        firstDay: 1,
        allDaySlot: false,
        expandRows: true,
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: []
  });
  Wochenkalender.render();
});

const wochenName = Name.value;
const wochenFormular = document.querySelector("#wochenFormular");
const wochenCalendar = document.getElementById("wochenKalender");
const wochenInhalt = document.getElementById("wochenInhalt");
const wochenDatum = document.getElementById("wochenDatum");
const wochenUhrzeitbeginn = document.getElementById("wochenUhrzeitbeginn");
const wochenUhrzeitende = document.getElementById("wochenUhrzeitende");
const wochenFarbe = document.getElementById("wochenFarbe");

wochenFormular.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const wochenTerminbeginn = new Date(wochenDatum.value + 'T' + wochenUhrzeitbeginn.value);
    const wochenTerminende = new Date(wochenDatum.value + 'T' + wochenUhrzeitende.value);
    
    let wochenBackground;
    switch(wochenFarbe.value) {
        case "Rot":
                wochenBackground = "#F4A6A6";
            break;

        case "Gelb":
                wochenBackground = "#FFFACD";
            break;

        case "Grün":
                wochenBackground = "#BFD8B8";
            break;

        case "Blau":
                wochenBackground = "#AEC6CF";
            break;

        default: 
            break;
    }

    Wochenkalender.addEvent({
      title: `${Name.value}: ${wochenInhalt.value}`,
      start: wochenTerminbeginn,
      end: wochenTerminende,
      backgroundColor: wochenBackground,
      textColor: '#000000',
    });

});

const Kategorie = document.getElementById("Kategorie");
const menüFormular = document.getElementById("menüFormular");
const Wochenplan = document.getElementById("Wochenplan");
const Termin = document.getElementById("Termin");
const Todo = document.getElementById("Todo");

menüFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    switch(Kategorie.value) {
        case "Wochenplan":
            Wochenplan.classList.remove("hidden");
            Termin.classList.add("hidden");
            Todo.classList.add("hidden");
            break;

        case "Termin":
            Termin.classList.remove("hidden");
            Wochenplan.classList.add("hidden");
            Todo.classList.add("hidden");
            break;

        case "Todo":
            Todo.classList.remove("hidden");
            Wochenplan.classList.add("hidden");
            Termin.classList.add("hidden");
            break;

        default:
            break;
    }
});

const todoFormular = document.querySelector("#todoFormular");
const todoListe = document.getElementById("todoListe");
const todoInhalt = document.getElementById("todoInhalt");
const todoDatum = document.getElementById("todoDatum");
const todoFarbe = document.getElementById("todoFarbe");

todoFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    const datumObjekt = new Date(todoDatum.value);
    const datumFormatierung = datumObjekt.toLocaleDateString("de-DE");

    const listeTodoitems = document.createElement("li");
    listeTodoitems.className = "todoEintrag";
    listeTodoitems.dataset.name = Name.value; // Tipp von chatGPT: Name speichern. Dadurch wird nicht der Name des letzten Eintrages übernommen, wenn ich einen Eintrag nachträglich editiere.
    listeTodoitems.innerHTML = `
            <span class="todoItems">
            ${Name.value}: ${datumFormatierung} - ${todoInhalt.value}
            </span>
            <button class="checkButton"><img src="check_button.svg"></button>
            <button class="deleteButton"><img src="delete_button.svg"></button> 
        `;
    
    switch(todoFarbe.value) {
        case "Rot":
                listeTodoitems.style.backgroundColor = "#F4A6A6";
            break;

        case "Gelb":
                listeTodoitems.style.backgroundColor = "#FFFACD";
            break;

        case "Grün":
                listeTodoitems.style.backgroundColor = "#BFD8B8";
            break;

        case "Blau":
                listeTodoitems.style.backgroundColor = "#AEC6CF";
            break;

        default: 
            break;
    }
    
    todoListe.appendChild(listeTodoitems); 
       
    todoInhalt.value = "";
    todoDatum.value = "";
    todoFarbe.selectedIndex = 0;
});

const terminFormular = document.querySelector("#terminFormular");
const terminListe = document.getElementById("terminListe");
const terminInhalt = document.getElementById("terminInhalt");
const terminDatum = document.getElementById("terminDatum");
const terminUhrzeit = document.getElementById("terminUhrzeit");
const terminFarbe = document.getElementById("terminFarbe");

terminFormular.addEventListener("submit", (event) => {
    event.preventDefault();

    const datumObjekt = new Date(terminDatum.value);
    const datumFormatierung = datumObjekt.toLocaleDateString("de-DE");
    
    const listeTerminitems = document.createElement("li");
    listeTerminitems.className = "terminEintrag ";
    listeTerminitems.innerHTML = `
            <span class="terminItems">      
                ${Name.value}: ${datumFormatierung}, ${terminUhrzeit.value} - ${terminInhalt.value}
            </span>
            <button class="checkButton"><img src="check_button.svg"></button>
            <button class="deleteButton"><img src="delete_button.svg"></button>  
        `;

    switch(terminFarbe.value) {
        case "Rot":
                listeTerminitems.style.backgroundColor = "#F4A6A6";
            break;

        case "Gelb":
                listeTerminitems.style.backgroundColor = "#FFFACD";
            break;

        case "Grün":
                listeTerminitems.style.backgroundColor = "#BFD8B8";
            break;

        case "Blau":
                listeTerminitems.style.backgroundColor = "#AEC6CF";
            break;

        default: 
            break;
    }

    terminListe.appendChild(listeTerminitems);
    terminDatum.value = "";
    terminUhrzeit.value = "";
    terminFarbe.selectedIndex = 0;
});

//Editieren
terminListe.addEventListener("dblclick", (event) => {
    const eintrag = event.target.closest("li.terminEintrag");
    if (!eintrag) return;

    const textSpan = eintrag.querySelector(".terminItems");

    // Hilfstellungen von chatGPT: 
    // verhindert Doppelklick im Input-Feld
    if (event.target.tagName.toLowerCase() === "input") return;

    // prüft, ob schon ein Input-Feld da ist
    if (textSpan.querySelector("input")) return;
    const fullText = textSpan.textContent.trim();

    // teilt den Text anhand des ersten Doppelpunkts auf
    const trennIndex = fullText.indexOf(":");
    if (trennIndex === -1) return;

    const name = fullText.slice(0, trennIndex).trim();
    const inhalt = fullText.slice(trennIndex + 1).trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = inhalt;
    input.classList.add("terminEditInput");

    textSpan.innerHTML = "";
    textSpan.appendChild(input);
    input.focus();

    let gespeichert = false;

    function speichern() {
        if (gespeichert) return;
        gespeichert = true;

        const neuerInhalt = input.value.trim();
        textSpan.textContent = `${name}: ${neuerInhalt}`;
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") speichern();
    });

    input.addEventListener("blur", speichern);
});

//Check
terminListe.addEventListener("click", (event) => { 
    const checkButton = event.target.closest(".checkButton");
    if (!checkButton) return;

    const terminEintrag = checkButton.closest(".terminEintrag");
    const checkText = terminEintrag.querySelector(".terminItems");

    checkText.classList.toggle("checkText");
});

//Editieren
terminListe.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".deleteButton");
    if (!deleteButton) return;

    const terminEintrag = deleteButton.closest(".terminEintrag");
    if (terminEintrag) {
        terminEintrag.remove();
    }
});

const todoListeEdit = document.getElementById("todoListe");
const NameEdit = document.querySelector("#Name");

todoListeEdit.style.cursor = "pointer";


//Editieren
todoListe.addEventListener("dblclick", (event) => {
    const eintrag = event.target.closest("li.todoEintrag");
    if (!eintrag) return;

    const textSpan = eintrag.querySelector(".todoItems");

    // Hilfstellungen von chatGPT: 
    // verhindert Doppelklick im Input-Feld
    if (event.target.tagName.toLowerCase() === "input") return;

    // prüft, ob schon ein Input-Feld da ist
    if (textSpan.querySelector("input")) return;
    const fullText = textSpan.textContent.trim();

    // teilt den Text anhand des ersten Doppelpunkts auf
    const trennIndex = fullText.indexOf(":");
    if (trennIndex === -1) return;

    const name = fullText.slice(0, trennIndex).trim();
    const inhalt = fullText.slice(trennIndex + 1).trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = inhalt;
    input.classList.add("todoEditInput");

    textSpan.innerHTML = "";
    textSpan.appendChild(input);
    input.focus();

    let gespeichert = false;

    function speichern() {
        if (gespeichert) return;
        gespeichert = true;

        const neuerInhalt = input.value.trim();
        textSpan.textContent = `${name}: ${neuerInhalt}`;
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") speichern();
    });

    input.addEventListener("blur", speichern);
});

//Check
todoListe.addEventListener("click", (event) => { 
    const checkButton = event.target.closest(".checkButton");
    if (!checkButton) return;

    const todoEintrag = checkButton.closest(".todoEintrag");
    const checkText = todoEintrag.querySelector(".todoItems");

    checkText.classList.toggle("checkText");
});

//Löschen
todoListe.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".deleteButton");
    if (!deleteButton) return;

    const todoEintrag = deleteButton.closest(".todoEintrag");
    if (todoEintrag) {
        todoEintrag.remove();
    }
});