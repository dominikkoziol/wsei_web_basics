let noteArray = (localStorage.getItem("Note") ? JSON.parse(localStorage.getItem("Note")) : []);
let currentPage = localStorage.getItem("currentPage") ? localStorage.getItem("currentPage") : "home";
const contentSection = document.getElementById("content");
let notesContent;
loadPage(currentPage);
loadNotes();


/**
 * @name - Name of note
 * @description - Description of note
 */
class Note {
    name = "";
    content = "";
    createdDate = null;
    constructor(name, content) {
        this.name = name;
        this.content = content;
       
        this.createdDate = getDate();
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
    console.log(noteArray);

    localStorage.setItem("Note", JSON.stringify(noteArray));

    var newElement = document.createElement("div");
    newElement.innerHTML = "Nazwa notatki: " + note.name + "<br /> Opis: " + note.content + "<br /> Data stworzenia: " + note.createdDate;
    notesContent.appendChild(newElement);
}

function loadNotes() {
    if (localStorage.getItem("Note") && notesContent) {
        var noteArray = JSON.parse(localStorage.getItem("Note"));
        noteArray.forEach(note => {
            var newElement = document.createElement("div");
            newElement.innerHTML = "Nazwa notatki: " + note.name + "<br /> Opis: " + note.content + "<br /> Data stworzenia: " + note.createdDate;
            notesContent.appendChild(newElement);
        });
    }
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
    if (href == "todo" && !notesContent) {
        notesContent = document.getElementById("my-notes");
    }
    currentPage = href;
    localStorage.setItem("currentPage", currentPage);
}


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