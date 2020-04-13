let noteArray = (localStorage.getItem("Note") ? JSON.parse(localStorage.getItem("Note")) : []);
let currentPage = localStorage.getItem("currentPage") ? localStorage.getItem("currentPage") : "home";
const contentSection = document.getElementById("content");
let notesContent = null;
loadPage(currentPage);

function getLastId(array) {
    if (noteArray.length == 0) return 0;
    var lastNoteById = _.sortBy(noteArray, (o) => o.id);
    var newId = lastNoteById[lastNoteById.length - 1].id + 1;
    return newId;
}


function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", href + '.html', false);
    xmlhttp.send();
    var element = document.getElementById(currentPage);
    if (element) element.parentNode.removeChild(element);

    var newElement = document.createElement("div");
    newElement.setAttribute("id", href);

    newElement.innerHTML = xmlhttp.responseText;
    contentSection.appendChild(newElement);


    var oldMenuElement = document.getElementById(currentPage + '-link');
    var newMenuElement = document.getElementById(href + '-link');
    oldMenuElement.removeAttribute("class");
    newMenuElement.classList.add("active");
    if (href == "todo") {
        if (!notesContent) notesContent = document.getElementById("my-notes");

        loadNotes();
    }
    currentPage = href;
    localStorage.setItem("currentPage", currentPage);
}

// ------------------ ALL ONCLICKS --------------------

document.getElementById("home-link").addEventListener("click", () => loadPage("home"));
document.getElementById("about-link").addEventListener("click", () => loadPage("about"));
document.getElementById("movie-link").addEventListener("click", () => loadPage("movie"));
document.getElementById("todo-link").addEventListener("click", () => loadPage("todo"));

// ------------------ END ONCLICKS --------------------

// ------------------ NOTES FUNCTIONS ------------------


/**
 * @name - Name of note
 * @description - Description of note
 */
class Note {
    name = "";
    content = "";
    createdDate = null;
    id;
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.createdDate = getDate();
        this.id = getLastId(noteArray);
    }
}

/**
 * @summary - adding note to note array and save to storage
 */
function addNote() {
    const name = document.getElementById("note-form").elements[0].value;
    const description = document.getElementById("note-form").elements[1].value;

    let note = new Note(name, description);
    noteArray.push(note);
    localStorage.setItem("Note", JSON.stringify(noteArray));
    addToHtml(note);
}

function loadNotes() {
    notesContent.innerHTML = "";
    if (noteArray && notesContent) {
        noteArray.forEach((note) => {
            addToHtml(note);
        });
    }
}

function addToHtml(note) {
    var newElement = document.createElement("div");
    newElement.innerHTML = "Nazwa notatki: " + note.name + "<br /> Opis: " + note.content + "<br /> Data stworzenia: " +
        note.createdDate + "<br /> <button id='note-button" + note.id + "'> Usuń notatkę </button>";

    newElement.setAttribute("id", "note" + note.id);
    document.getElementById("my-notes").appendChild(newElement);
    document.getElementById("note-button" + note.id).addEventListener("click", () => removeNote(note.id));
    document.getElementById("note" + note.id).addEventListener("click", () => enableEditNote(note.id));
}

function removeNote(id) {
    document.getElementById("note" + id).remove();
    _.remove(noteArray, (el) => el.id == id);
    localStorage.setItem("Note", JSON.stringify(noteArray));
}

function enableEditNote(id) {
    var oldElement = document.getElementById("editNote");
    var newElement = oldElement.cloneNode(true);
    document.getElementById("editNote").addEventListener("click", () => editNote(id));
    var note = _.find(noteArray, (n) => n.id == id);
    if (note) {
        document.getElementById("note-form").elements[0].value = note.name;
        document.getElementById("note-form").elements[1].value = note.content;
    }

}

function editNote(id) {
    var index = _.findIndex(noteArray, (n) => n.id == id);
    if (index != -1) {
        const name = document.getElementById("note-form").elements[0].value;
        const content = document.getElementById("note-form").elements[1].value;

        noteArray[index].name = name;
        noteArray[index].content = content;

        document.getElementById("note" + id).innerHTML = "Nazwa notatki: " + noteArray[index].name + "<br /> Opis: " + noteArray[index].content + "<br /> Data stworzenia: " +
            noteArray[index].createdDate + "<br /> <button id='note-button" + noteArray[index].id + "'> Usuń notatkę </button>";

        localStorage.setItem("Note", JSON.stringify(noteArray));
    }

}


// ------------------ END NOTES FUNCTIONS ------------------

// ------------------ UTILITIES ------------------
function getDate() {
    var currentdate = new Date();
    var day = currentdate.getDate();
    var month = currentdate.getMonth() + 1;
    var hour = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var seconds = currentdate.getSeconds();

    return (day < 10 ? '0' + day : day) + "/" +
        (month < 10 ? '0' + month : month) + "/" +
        currentdate.getFullYear() + " " +
        (hour < 10 ? '0' + hour : hour) + ":" +
        (minutes < 10 ? '0' + minutes : minutes) + ":" +
        (seconds < 10 ? '0' + seconds : seconds)
}

// ------------------ END UTILITIES ------------------