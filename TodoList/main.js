let TODOLIST = [];
const storageKey = "TODOLIST";
let idx = 0;

const StatusMap = 
{
    0: "progress",
    1: "success",
    2: "failed",
}

Init();

function Init() {
    document.querySelector('form').addEventListener('submit', AddToDo);
    document.getElementById('clear').addEventListener('click', ClearToDoList);
    document.querySelector('ul').addEventListener('click', DeleteOrCheck);

    // 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
    const storedTodoList = localStorage.getItem(storageKey);
    if (storedTodoList) {
        TODOLIST = [];
        let loadData = JSON.parse(storedTodoList);
        loadData.forEach((task) => {
            AddTask(task.idx, task.value, task.checked);
            idx = task.idx +1;
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

    // 로컬 스토리지에서 해당 할 일 제거
    console.log(e.target.dataset.idx);
    let findIdx = TODOLIST.findIndex(x => x.idx == e.target.dataset.idx);
    TODOLIST.splice(findIdx, 1);
    SaveTodoList();
}

function CheckToDo(e) {
    const todo = e.target.nextSibling;
    // if (e.target.checked) {
    //     todo.style.color = '#dddddd';
    // } else {
    //     todo.style.color = '#000000';
    // }

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
    localStorage.removeItem(storageKey);
    TODOLIST = [];
    idx = 0;
}

function AddToDo(e) {
    e.preventDefault();
    let toDoValue = document.querySelector("input");
    if (toDoValue.value !== '') {
        AddTask(idx, toDoValue.value);
        idx++;
        toDoValue.value = '';
    }
}

function newDate() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    recordDate = year + "/" + month + "/" + day;

    return recordDate; // 타임스탬프 찍은 뒤에 해당 시간을 담아줄 수 있는 변수 필요
}

function AddTask(idx, value, checked = false, status) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.classList.add("item");

    let date = newDate();

    status = 1;
    li.innerHTML = 
        `<input type="checkbox" ${checked ? 'checked' : ''}>
        <span class='status ${StatusMap[status] === undefined ? '' : StatusMap[status] }'>${status}</span>
        <label>${value}</label>  
        <div class="date-label">${date}</div>
        <span data-idx="${idx}" class="delete btn small">x</span>`;   
    ul.appendChild(li);
    document.querySelector('.todolist').style.display = 'block';
    
    // 로컬 스토리지에 할 일 추가
    TODOLIST.push({idx, value, checked, date });
    
    SaveTodoList();
}

function SaveTodoList() {
    // 로컬 스토리지에 할 일 목록 저장
    localStorage.setItem(storageKey, JSON.stringify(TODOLIST));
}

function PageAlgo() {
    let totalCount = 10; // todo가 추가될 때마다 ++되게 만들기
    const limit = 5;

    let totalPage = Math.ceil(totalCount / limit);
    

}