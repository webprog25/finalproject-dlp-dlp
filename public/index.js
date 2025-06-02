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
})

const Name = document.querySelector("#Name");

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
    listeTodoitems.className = "todoItems";
    listeTodoitems.innerHTML = `
            ${Name.value}: ${datumFormatierung} - ${todoInhalt.value}
            <input type="checkbox" id="checkbox"></input>
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
})

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
    listeTerminitems.className = "terminItems";
    listeTerminitems.innerHTML = `
            ${Name.value}: ${datumFormatierung}, ${terminUhrzeit.value} - ${terminInhalt.value}
            <input type="checkbox" id="checkbox"></input>
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
})

