var cls = document.getElementsByClassName("cl");
add.addEventListener("click", addNote, false);

function addEvents() {
	for(var i = 0; i < cls.length; i++) {
		cls[i].removeEventListener("click", delNote, false);
		cls[i].addEventListener("click", delNote, false);
	}
}

function addNote() {
	if(toAdd.value) {
		var note      = document.createElement("LI");
		var noteItem  = document.createElement("SPAN");
		var noteCl    = document.createElement("SPAN");
		note.classList.add("todo-list-item");
		note.classList.add("del");
		noteItem.classList.add("item");
		noteItem.innerHTML = toAdd.value;
		note.appendChild(noteItem);
		noteCl.classList.add("cl");
		noteCl.innerHTML = "&#215;";
		note.appendChild(noteCl);
		
		todoList.insertBefore(note, todoList.firstChild);
		addEvents();
		toAdd.value = "";
		
		setTimeout(function() {
			note.classList.remove("del");
		}, 10);
	}
}

function delNote(event) {
	event = event || window.event;
	var noteToDel = event.target.parentElement;
	noteToDel.classList.add("del");
	setTimeout(function() {
		todoList.removeChild(noteToDel);
	}, 500);
}

// Init
addEvents();