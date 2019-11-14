//adds a todo to the list
document.getElementById("add").addEventListener("click",post);

//list -- show saved todos when refreshes
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos);
        var i;
        for (i=0; i<todos.length; i++){
          renderToDos(todos[i]);
          if(todos[i].completed==true){
            var span=document.getElementById(todos[i].id);
            var p = span.childNodes[1];
            p.className="toDoTextComplete";
          }
        }
    }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key","62a83b-dd0595-259c51-78553e-b3f8de");
xhttp.send();

//function to render to dos
function renderToDos(todo){
  var toDoTask=document.createElement("span");
  toDoTask.className="toDoTask";
  toDoTask.setAttribute("id",todo.id);

  var checkbox=document.createElement("button");
  var checkboxText=document.createTextNode("");
  checkbox.innerHTML= "&#10004;";
  checkbox.className="checkboxBefore";
  checkbox.appendChild(checkboxText);
  checkbox.addEventListener("click",complete); //calling update to change complete to true when clicked

  var toDoText=document.createElement("p");
  var toDoTextNode=document.createTextNode(todo.text);
  toDoText.appendChild(toDoTextNode);

  var deleteBtn=document.createElement("button");
  var deleteBtnText=document.createTextNode("X");
  deleteBtn.className="deleteBtn";
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.addEventListener("click",deleteFromList); //calling delete to delete from list

  toDoTask.appendChild(checkbox);
  toDoTask.appendChild(toDoText);
  toDoTask.appendChild(deleteBtn);
  document.getElementById("todo-list").appendChild(toDoTask);

  document.getElementById("new-task").value=""
}

function post(){
  // Setting variable for form input (get from HTML form)
  var data = {
      text: document.getElementById("new-task").value
  }
  // Initalize AJAX Request
  var xhttp2 = new XMLHttpRequest();
  // Response handler
  xhttp2.onreadystatechange = function() {
      // Wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {
          // parse JSON response
          var todo = JSON.parse(this.responseText);
          renderToDos(todo); //calling render here
          console.log(todo);
      } else if (this.readyState == 4) {
          // this.status !== 200, error from server
          console.log(this.responseText);
      }
  };
  xhttp2.open("POST", "https://cse204.work/todos", true);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
  xhttp2.send(JSON.stringify(data));
  }

  function complete(event){
    var a = event.target.parentNode.id;
    var data = {
      completed: true
    }
    var xhttp5 = new XMLHttpRequest();
    xhttp5.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        if(todo.completed="true"){
        var span=document.getElementById(a);
        var p = span.childNodes[1];
        p.className="toDoTextComplete";
      }
      } else if (this.readyState == 4){
        console.log(this.responseText);
      }
    }
      xhttp5.open("PUT", "https://cse204.work/todos/"+a, true);
      xhttp5.setRequestHeader("Content-type", "application/json");
      xhttp5.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
      xhttp5.send(JSON.stringify(data));

  }

  function deleteFromList(event){
    var a = event.target.parentNode.id;
    // Initalize AJAX Request
    var xhttp4 = new XMLHttpRequest();
    // Response handler
    xhttp4.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("todo-list").removeChild(event.target.parentNode);
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            console.log(todo);
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp4.open("DELETE", "https://cse204.work/todos/"+a, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "62a83b-dd0595-259c51-78553e-b3f8de");
    xhttp4.send();
  }
