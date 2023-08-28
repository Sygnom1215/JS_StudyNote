Init();

function Init(){
    document.querySelector('form').addEventListener('submit', AddToDo);
    document.getElementById('clear').addEventListener('click', ClearToDoList); // HTML의 clear id에 click이벤트 파싱
    document.querySelector('ul').addEventListener('click', DeleteOrCheck);
}

function DeleteOrCheck(e){
    if(e.target.className == 'delete')
        DeleteToDo(e);
    else
        CheckToDo(e);
}

function DeleteToDo(e){
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
}

function CheckToDo(e){
    const todo = e.target.nextSibling;
    if(e.target.checked) // 체크가 되면 색상 변경
        todo.style.color = '#dddddd';
    else
        todo.style.color = '#000000';
}

function ClearToDoList(e){
    let ul = document.querySelector('ul').innerHTML = '';
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
	li.innerHTML = `<input type="checkbox"><label>${value}</label>  <span class="delete">x</span>`;
	ul.appendChild(li);
	document.querySelector('.todolist').style.display = 'block';
}