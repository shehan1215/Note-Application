// Variables
var form = document.getElementById('add-frm');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var items = document.getElementById('items');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');
var resetBtn = document.getElementById('reset');


var noteCount = 0; //Create variable To store the note Count
var newNote = ''; // To sotre the new note. 
var isUpdate = 'false';
var record = '';
var note = '';
var body = '';

//Events
window.onload = updateTable; // If the page is loading to call that function. Because we have to hide the table as a function 

form.addEventListener('submit', addNote);

search.addEventListener('keyup', searchNotes); // For the searching option

items.addEventListener('click', removeNote); // For the delete 

items.addEventListener('click', viewUpdateNote); // For the View 

resetBtn.addEventListener('click', resetAll);

//................. functions Create ............
//Update the Table
function updateTable(){
    if(noteCount > 0){
        tableDiv.style.display = ''; // Defaultly to set the property value.
        
        // Update the Table
        if(isUpdate){
            note.firstChild.textContent = ntitle.value;
            note.lastChild.textContent = nbody.value;
            // Reset the update and Notecount
            isUpdate = false;
            noteCount--;
        }else{
            items.appendChild(newNote); // Add the new note.
        }
    }else{
        tableDiv.style.display = 'none'; // If there is no any note to hide the table
    }
}

//Add Note
function addNote(e){
    e.preventDefault();

    //Input validates
    if(ntitle.value == '' || nbody.value == ''){
        alert("Please fill all the field");
    }else{
        //Create new note record

        //New tr
        var tr = document.createElement('tr');
        tr.className = 'item';

        //New td for title and body
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(ntitle.value));
        var span = document.createElement('span');
        span.className = 'note-body';
        span.appendChild(document.createTextNode(nbody.value));
        td1.appendChild(span);

        //New td for view
        var td2 = document.createElement('td');
        td2.className = 'btcellv';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id', 'vw');
        td2.appendChild(btn1);

         //New td for Delete
         var td3 = document.createElement('td');
         td3.className = 'btcelld';
         var btn2 = document.createElement('button');
         btn2.appendChild(document.createTextNode('Delete'));
         btn2.setAttribute('id', 'del');
         td3.appendChild(btn2);

         //Add All to the 
         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(td3);
         
         noteCount++; // To increment the note count
         // Set the new note
         newNote = tr;
         // For Add or Update the note
         updateTable();
    }
    resetAll(); // Reset All the notes
}

function searchNotes(e){
    var searchTxt = e.target.value.toLowerCase(); //  searching letters convert to the lower case letters
    // console.log(searchTxt);
    var list = items.getElementsByClassName('item'); // Assign a varible to the class name of item
    
    var listArr = Array.from(list); // Convert from the HtmlCpllection to the Array.
    listArr.forEach(function(item){
        var noteTitle = item.firstChild.textContent; // Get the Title.
        // To match 
        if(noteTitle.toLowerCase().indexOf(searchTxt) != -1){
            item.style.display = '';
        }else{
            item.style.display = 'none';
        }
    });  
}

function removeNote(e){
    if(e.target.id === 'del'){
        if(confirm("Are you Sure! ")){
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);

            noteCount --; // To update the table like previously
            if(noteCount === 0){
                updateTable();
            }
        }
    }
}

function viewUpdateNote(e){
    if(e.target.id === 'vw'){
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value = note.firstChild.textContent;
        nbody.value = note.lastChild.textContent;
        isUpdate = true; // Is doing any update of the Note
    }
}

function resetAll(){
    ntitle.value = '';
    nbody.value = '';
    isUpdate = false;
    newNote = '';
}

