console.log("JS File linked");
displayNotes();

function displayNotes(){
  let notesStorage = localStorage.getItem("notes");
  if (notesStorage == null) 
  {
    notesArray = [];
  } 
  else 
  {
    notesArray = JSON.parse(notesStorage);
  }

  let html = "";
  notesArray.forEach(function(element){
  html += `<div id="note-card">
              <p id="card-title"> ${element.title} </p>
              <p id="card-content"> ${element.content} </p>
              <button type="submit" class="card-del-button"><i class="fas fa-trash-alt"></i></button>
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

let addButton = document.getElementById("add-note-btn");
addButton.addEventListener("click", () =>{

  let noteTitle = document.getElementById("title");
  let noteContent = document.getElementById("content");

  let notesObject = {
    title: noteTitle.value,
    content: noteContent.value
  };

  if(notesObject.title.replace(/\s/g, "").length <= 0 || notesObject.content.replace(/\s/g, "").length <= 0)
  {
    setError("error", "* Title and Content cannot be Empty !");
  }
  else
  {
    clearError("error");
    let notesStorage = localStorage.getItem("notes");
 
    if (notesStorage == null) 
    {
      notesArray = [];
    }
    else 
    {
      notesArray = JSON.parse(notesStorage);
    }
    
    notesArray.push(notesObject);

    localStorage.setItem("notes", JSON.stringify(notesArray));
    noteTitle.value = "";
    noteContent.value = "";
    displayNotes();
  }  
});

