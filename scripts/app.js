let noteArray = (localStorage.getItem("Note") ? JSON.parse(localStorage.getItem("Note")) : []);

/**
 * @name - Name of note
 * @description - Description of note
 */
class Note {
    name = "";
    content = "";
    createdDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    constructor(name, content) {
        this.name = name;
        this.content = content;
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
}