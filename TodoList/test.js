const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");

const TODOLIST = "toDoList"; // TODOLIST 상수를 string으로 선언??
let toDoList = []; // TODOLIST 배열 선언

function saveToDo(toDo) {
  const toDoObj = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObj); // TODO 배열에 toDoObj Push
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList)); // local Storage에 자료 넣는다
}

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = toDo;
  li.appendChild(span);
  toDos.appendChild(li);
}

function createToDo(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  saveToDo(toDo);
  toDoInput.value = ""; // value값이 string 자료형이다
}

function loadToDoList() {
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (let toDo of parsedToDoList) {
      const { text } = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function init() {
  loadToDoList();
  toDoForm.addEventListener("submit", createToDo);
}
init();