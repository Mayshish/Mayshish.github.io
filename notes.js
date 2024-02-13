const notesContainer = document.getElementById("stickyapp");
const addNoteButton = notesContainer.querySelector(".add-note");


function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}


getNotes().forEach(note => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});


addNoteButton.addEventListener("click", () => addNote());

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");
    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {

  const existingNotes = getNotes();


  const noteObject = {
    id: Math.floor(Math.random() * 1000000),
    content: ""
  };


  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);


  existingNotes.push(noteObject);
  saveNotes(existingNotes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.find(note => note.id == id);

  if (targetNote) {
    targetNote.content = newContent;
    saveNotes(notes);
  }
}

function deleteNote(id, element) {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id != id);
  saveNotes(filteredNotes);
  element.remove();
}
