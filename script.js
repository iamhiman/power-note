console.log("JS File linked");
displayNotes();

/********Utility Functions*******/
function setError(id, errormsg) 
{
  element = document.getElementById(id);
  element.innerText = errormsg;
}

function clearError(id) 
{
  errormsg = document.getElementById(id);
  errormsg.innerText = "";
}

//Checking if there are any notes stored in the localstorage

function checkStorage()
{
  let notesStorage = localStorage.getItem("notes");
  if (notesStorage == null) 
  {
    notesArray = [];
  } 
  else 
  {
    //If notes are found, we store them in array of objects as well
    notesArray = JSON.parse(notesStorage);
  }
}


/********Display Notes in DOM*******/
function displayNotes(){
  checkStorage();

  //appending the note-card in DOM
  let html = "";
  notesArray.forEach(function(element, index){
  html += `<div id="note-card">
              <p id="card-title"> ${element.title} </p>
              <p id="card-content"> ${element.content} </p>
              <button type="submit" id="${index}" onclick="deleteNote(this.id)" class="card-del-button"><i class="fas fa-trash-alt"></i></button>
           </div>`;
  });  

  let notesDomElement = document.getElementById("notes-container");
  if(notesArray.length != 0) 
  {
    notesDomElement.innerHTML = html;
  } 
  else 
  {
    notesDomElement.innerHTML = `Section is empty! Use "Add Note" section above to add notes.`;
  }
}


/********Add Note Function*******/
let addButton = document.getElementById("add-note-btn");
addButton.addEventListener("click", () =>{

  let noteTitle = document.getElementById("title");
  let noteContent = document.getElementById("content");

  let notesObject = {
    title: noteTitle.value,
    content: noteContent.value
  };

  //Form-Validation for Empty Spaces
  if(notesObject.title.replace(/\s/g, "").length <= 0 || notesObject.content.replace(/\s/g, "").length <= 0)
  {
    setError("error", "* Title and Content cannot be Empty !");
  }
  else
  {
    clearError("error");
    checkStorage();
    
    //Push notes to array as well
    notesArray.push(notesObject);

    //Push notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notesArray));
    noteTitle.value = "";
    noteContent.value = "";
    displayNotes();
  }  
});


/********Delete Note Function*******/
let modalBg = document.querySelector(".modal-bg");
let yesDelete = document.getElementById("yes-delete");
let dontDelete = document.getElementById("no-delete");

function deleteNote(index)
{
  //console.log("Delete triggered", index);
  modalBg.classList.add("bg-active");
}

dontDelete.addEventListener("click", function(){
  modalBg.classList.remove("bg-active");
});

yesDelete.addEventListener("click", function(index){
  //console.log("yes", index);
  checkStorage();

  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  modalBg.classList.remove("bg-active");
  displayNotes();
});