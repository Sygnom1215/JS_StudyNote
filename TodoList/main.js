let TODOLIST = [];

Init();

function Init(){
    document.querySelector('form').addEventListener('submit', AddToDo);
    document.getElementById('clear').addEventListener('click', ClearToDoList);
    document.querySelector('ul').addEventListener('click', DeleteOrCheck);
}

function DeleteOrCheck(e){
    if(e.target.classList.contains('delete'))
        DeleteToDo(e);
    else
        CheckToDo(e);
}

function DeleteToDo(e){
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
    localStorage.removeItem(TODOLIST);
}

function CheckToDo(e){
    const todo = e.target.nextSibling;
    if(e.target.checked)
        todo.style.color = '#dddddd';
    else
        todo.style.color = '#000000';
}

function ClearToDoList(e){
    let ul = document.querySelector('ul').innerHTML = '';
    localStorage.clear()
}

function AddToDo(e){
    e.preventDefault();
    let toDoValue = document.querySelector("input");
    if(toDoValue.value!=='')
        AddTask(toDoValue.value);
        toDoValue.value = '';
}

function AddTask(value){
	let ul = document.querySelector('ul');
	let li = document.createElement('li');
    li.classList.add("item");
	li.innerHTML = `<input type="checkbox"><label>${value}</label>  <span class="delete btn">x</span>`;
	ul.appendChild(li);
	document.querySelector('.todolist').style.display = 'block';
    SaveTodoList(li);
}

function SaveTodoList(toDo){
    localStorage.setItem(TODOLIST, toDo);
}