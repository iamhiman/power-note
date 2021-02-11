console.log("JS File linked");
noteForm.reset();
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

function checkStorage()
{
  //Checking if there are any notes stored in the localstorage
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
  html += `<div id="note-card" class="note-card">
              <p id="card-title"> ${element.title} </p>
              <p id="card-content"> ${element.content} </p>
              <button type="submit" id="${index}" onclick="deleteNote(this.id)" class="card-del-button"><i class="fas fa-trash-alt"></i></button>
              <button type="submit" id="${index}" onclick="editNote(this.id)" class="card-edit-button"><i class="fas fa-edit"></i></button>
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
function deleteNote(index)
{
  checkStorage();

  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  displayNotes();
}


/********Delete All Notes Function*******/
let navModalBg = document.querySelector(".nav-modal-bg");
let navYesDelete = document.getElementById("nav-yes-delete");
let navDontDelete = document.getElementById("nav-no-delete");
let deleteAll = document.getElementById("delete-all-btn");
deleteAll.addEventListener("click",()=>{
  if(notesArray.length !== 0)
  {
    navModalBg.classList.add("bg-active");
  }
  else{
    alert("Nothing to delete");
  }
});

navDontDelete.addEventListener("click", function(){
  navModalBg.classList.remove("bg-active");
});

navYesDelete.addEventListener("click", function(){
  checkStorage();

  localStorage.clear();
  notesArray.splice(0,notesArray.length);
  navModalBg.classList.remove("bg-active");
  let notesDomElement = document.getElementById("notes-container");
  notesDomElement.innerText = `Section is empty! Use "Add Note" section above to add notes.`;
});


/********Search Function*******/
function searchFunction()
{
  let input = document.getElementById("search-input");
  let filter = input.value.toUpperCase();
  let notesContainer = document.getElementById("notes-container");
  let notes = notesContainer.getElementsByClassName("note-card");

  for(i=0; i<notes.length; i++)
  {
    let titleContainer = notes[i].getElementsByTagName("p")[0];
    let cardContainer = notes[i].getElementsByTagName("p")[1];

    if(cardContainer || titleContainer)
    {
      let titleContent = titleContainer.textContent || titleContainer.innerText;
      let cardContent = cardContainer.textContent || cardContainer.innerText;
      if(titleContent.toUpperCase().indexOf(filter) > -1 || cardContent.toUpperCase().indexOf(filter) > -1)
      {
        notes[i].style.display = "";
      }
      else
      {
        notes[i].style.display = "none";
      }
    }    
  }
}


/********Edit Function*******/
function editNote(index)
{
  //console.log(index);
  let selectedid = document.getElementById(index);
  let cardContent = selectedid.previousElementSibling;
  let titleContent = selectedid.previousElementSibling.previousElementSibling;

  let noteTitle = document.getElementById("title");
  let noteContent = document.getElementById("content");

  noteTitle.value = titleContent.innerText;
  noteContent.value = cardContent.innerText;
  alert("Check Form to edit note and note will be deleted.");

  deleteNote(index);
 
}