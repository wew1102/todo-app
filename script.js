const addTodo = (e) => {
    e.preventDefault();

    let newTodoText = document.getElementById('todo-input').value;

    if (newTodoText === '') return;

    const todo = {
        id: Date.now().toString(),
        text: newTodoText,
        completed: false
    };

    addTodoToList(todo);

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    newTodoText.value = '';
};


document.querySelector("#todo-form").addEventListener("submit", addTodo);

const addTodoToList = (todo) => {

    //get the parent list
    let parentList = document.getElementById('todo-list-items');

    //create new list item and append it
    let newListItem = document.createElement("li");

    newListItem.innerText = todo.text;
    
    newListItem.classList.add("list-item");
    //TODO: add 'data-todoid' attribute to newListitem with value "todo.id"
    newListItem.setAttribute('data-todoid', todo.id);
    
    //add the newly created list item to the parent list
    parentList.appendChild(newListItem);

    //add a delete button to the new list item
    let delBtn = document.createElement("button");
    delBtn.innerText = 'Delete';
    delBtn.classList.add("del-btn");
    delBtn.addEventListener('click', deleteTodo);
    newListItem.appendChild(delBtn);

    let checkBox = document.createElement("input");
    checkBox.setAttribute('type', 'checkbox');
    newListItem.appendChild(checkBox);
    //TODO: add event listener to the checkbox
    checkBox.addEventListener('change', toggleCompletedStatus);
}

//TODO: create a delete function
const deleteTodo = (e) => {
    const li = e.target.parentElement;
    const id = li.getAttribute('data-todoid');

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));

    li.remove();
};

//TODO: create a function to toggle the 'completed' status
const toggleCompletedStatus = (e) => {
    const li = e.target.parentElement;
    const id = li.getAttribute('data-todoid');

    console.log('the checkbox is currenlty:'+e.target.checked);

    let todos = JSON.parse(localStorage.getItem('todos'));

    let todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.completed = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

// Load todos from localStorage on page load
window.addEventListener('load', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo));
});




 // function call
// addTwoNums(1, 2); //hoisting

//function decalre
// function addTwoNums(a, b) {
    //     console.log (a + b);
    // }

    

//function decalre
// const addTwoNumbers = (a, b) => {
//     console.log(a + b);
// }