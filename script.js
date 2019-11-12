//adds a todo to the list
document.getElementById("add").addEventListener("click",post);

//list -- show saved todos when refreshes
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos);
    }
};
xhttp.open("GET", "https://api.kraigh.net/todos", true);
xhttp.setRequestHeader("x-api-key", "026c07fc839dabeeafe789417067738eccfdf3cab77fd9f9fad7074257c64503");

//function to render to dos
function renderToDos(todo){
  var toDoTask=document.createElement("span");
  toDoTask.className="toDoTask";
  toDoTask.setAttribute("id",todo.id);

  var checkbox=document.createElement("button");
  var checkboxText=document.createTextNode("Check");
  checkbox.className="check";
  checkbox.appendChild(checkboxText);
  checkbox.addEventListener("click",complete); //calling update to change complete to true when clicked

  var toDoText=document.createElement("p");
  var toDoTextNode=document.createTextNode(todo.text);
  toDoText.appendChild(toDoTextNode);

  var deleteBtn=document.createElement("button");
  var deleteBtnText=document.createTextNode("Delete");
  deleteBtn.className="deleteBtn";
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.addEventListener("click",deleteFromList); //calling delete to delete from list

  toDoTask.appendChild(checkbox);
  toDoTask.appendChild(toDoText);
  toDoTask.appendChild(deleteBtn);
  document.getElementById("todo-list").appendChild(toDoTask);
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
  xhttp2.open("POST", "https://api.kraigh.net/todos", true);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "026c07fc839dabeeafe789417067738eccfdf3cab77fd9f9fad7074257c64503");
  xhttp2.send(JSON.stringify(data));
  }

  function get(){
    // Setting variable for ToDo id
    var id = this.id;
    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // Response handler
    xhttp2.onreadystatechange = function() {
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);
            console.log(todo);
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };
    xhttp2.open("GET", "https://api.kraigh.net/todos/"+id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "026c07fc839dabeeafe789417067738eccfdf3cab77fd9f9fad7074257c64503");
    xhttp2.send();
  }

  function complete(event){
    var a = event.target.parentNode.id;
    var data = {
      completed: "true"
    }
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        console.log(todo);
        //add in here to change the class after it is pressed and then
        //style it differently in the css using a different class
      } else if (this.readyState == 4){
        console.log(this.responseText);
      }
    xhttp3.open("PUT", "https://api.kraigh.net/todos/"+a, true);
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key", "026c07fc839dabeeafe789417067738eccfdf3cab77fd9f9fad7074257c64503");
    xhttp2.send(JSON.stringify(data));
    }
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
    xhttp4.open("DELETE", "https://api.kraigh.net/todos/"+a, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "026c07fc839dabeeafe789417067738eccfdf3cab77fd9f9fad7074257c64503");
    xhttp4.send();
  }
