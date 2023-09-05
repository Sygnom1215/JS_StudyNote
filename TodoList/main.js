let TODOLIST = [];

Init();

function Init() {
    document.querySelector('form').addEventListener('submit', AddToDo);
    document.getElementById('clear').addEventListener('click', ClearToDoList);
    document.querySelector('ul').addEventListener('click', DeleteOrCheck);

    // 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
    // 이렇게 하면 중복생성이 되어서 새로고침할 때 화면에 보이는 출력값을 한 번 날려줘야 한다.
    const storedTodoList = localStorage.getItem('TODOLIST');
    if (storedTodoList) {
        TODOLIST = JSON.parse(storedTodoList);
        TODOLIST.forEach((task) => {
            AddTask(task.value, task.checked);
        });
    }
}

function DeleteOrCheck(e) {
    if (e.target.classList.contains('delete')) {
        DeleteToDo(e);
    } else {
        CheckToDo(e);
    }
}

function DeleteToDo(e) {
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);

    // 로컬 스토리지에서 해당 할 일 제거 (가 안 됨)
    const taskValue = e.target.previousSibling.textContent;
    TODOLIST = TODOLIST.filter((task) => task.value !== taskValue);
    SaveTodoList();
}

function CheckToDo(e) {
    const todo = e.target.nextSibling;
    if (e.target.checked) {
        todo.style.color = '#dddddd';
    } else {
        todo.style.color = '#000000';
    }

    // 로컬 스토리지에서 체크 여부 저장
    const taskValue = todo.textContent;
    const taskIndex = TODOLIST.findIndex((task) => task.value === taskValue);
    if (taskIndex !== -1) {
        TODOLIST[taskIndex].checked = e.target.checked;
        SaveTodoList();
    }
}

function ClearToDoList() {
    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    // 로컬 스토리지에서 데이터 모두 제거
    localStorage.removeItem('TODOLIST');
    TODOLIST = [];
}

function AddToDo(e) {
    e.preventDefault();
    let toDoValue = document.querySelector("input");
    if (toDoValue.value !== '') {
        AddTask(toDoValue.value);
        toDoValue.value = '';
    }
}

function AddTask(value, checked = false) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.classList.add("item");
    li.innerHTML = `<input type="checkbox" ${checked ? 'checked' : ''}><label>${value}</label>  <span class="delete btn">x</span>`;
    ul.appendChild(li);
    document.querySelector('.todolist').style.display = 'block';

    // 로컬 스토리지에 할 일 추가
    TODOLIST.push({ value, checked });
    SaveTodoList();
}

function SaveTodoList() {
    // 로컬 스토리지에 할 일 목록 저장
    localStorage.setItem('TODOLIST', JSON.stringify(TODOLIST));
}