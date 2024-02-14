'use strict';

const task_text = document.querySelector('.input-text');
const btn_add = document.querySelector('.button-plus');
const task_list = document.querySelector('.tasks');
const tab_wrap = document.querySelector('.tabs');
const tabs = tab_wrap.querySelectorAll('button');
let taskList = [];

const generateId = function(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

const toggleComplete = function(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      //taskList[i].isComplete = taskList[i].isComplete ? false : true;
      break;
    }
  }
  renderTask();
}

const removeItem = function(id){
  for(let i=0 ; i < taskList.length ; i++){
    if(taskList[i].id == id){
      taskList.splice(i, 1);
      break;
    }
  }
  renderTask();
}

const addTask = function(){
  if( task_text.value == '' ){
    return false;
  }
  const task = {
    id: generateId(),
    content : task_text.value,
    isComplete : false
  };
  taskList.push(task);
  task_text.value = '';
  renderTask();
}

const renderTask = function(){ 
  let listHTML = '';

  for(let i = 0; i < taskList.length ; i++){
    if( taskList[i].isComplete == true ){
      listHTML += `
      <li class="task is-checked">
      <p class="content">${taskList[i].content}</p>
        <button type="button" class="button-check" onclick="toggleComplete('${taskList[i].id}')">check</button>
        <button type="button" class="button-delete" onclick="removeItem('${taskList[i].id}')"><span class="visually-hidden">delete</span>🗑</button>
      </li>
      `;
    } else {
      listHTML += `
      <li class="task">
      <p class="content">${taskList[i].content}</p>
        <button type="button" class="button-check" onclick="toggleComplete('${taskList[i].id}')">check</button>
        <button type="button" class="button-delete" onclick="removeItem('${taskList[i].id}')"><span class="visually-hidden">delete</span>🗑</button>
      </li>
      `;
    }
  }

  task_list.innerHTML = listHTML;
}

btn_add.addEventListener('click', addTask);

document.addEventListener('keypress', (e) => {
  if(e.code == 'Enter' || e.code == 'NumpadEnter'){
    addTask();
  }
})