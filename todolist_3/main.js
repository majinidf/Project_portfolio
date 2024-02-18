'use strict';

const task_text = document.querySelector('.input-text');
const btn_add = document.querySelector('.button-plus');
const no_data = document.querySelector('.no-data');
const task_list = document.querySelector('.tasks');
const tab_wrap = document.querySelector('.tabs');
const tabs = tab_wrap.querySelectorAll('button');
let taskList = [];
let filteredList = [];
let mode = 'all';

const filterList = function(e){
  mode = e === undefined ? mode : e.target.dataset.mode;
  filteredList = [];

  if(mode === "doing"){
    for(let i = 0; i < taskList.length ; i++){
      if(taskList[i].isComplete == false){
        filteredList.push(taskList[i]);
      }
    }
  } else if(mode === "done"){
    for(let i = 0; i < taskList.length ; i++){
      if(taskList[i].isComplete == true){
        filteredList.push(taskList[i]);
      }
    }
  }

  renderTask();
}

for(let i = 0; i < tabs.length ; i++){
  tabs[i].addEventListener('click', (e) => { 
    tab_wrap.style.setProperty('--underline-left', `${e.target.offsetLeft}px`);
    filterList(e);
  });
}

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
  
  if( mode !== 'all' ){
    filterList();
  } else {
    renderTask();
  }
}

const removeItem = function(id){
  for(let i=0 ; i < taskList.length ; i++){
    if(taskList[i].id == id){
      taskList.splice(i, 1);
      break;
    }
  }
  if( filteredList.length !== 0 ){
    for(let i=0 ; i < filteredList.length ; i++){
      if(filteredList[i].id == id){
        filteredList.splice(i, 1);
        break;
      }
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
  let list = [];
  
  if(mode === "all"){
    list = taskList;
  } else {
    list = filteredList;
  }

  if( list.length !== 0){
    no_data.style.display = 'none';
  } else {
    no_data.removeAttribute('style');
  }

  for(let i = 0; i < list.length ; i++){
    if( list[i].isComplete == true ){
      listHTML += `
      <li class="task is-checked">
        <button type="button" class="button-check" onclick="toggleComplete('${list[i].id}')"><span class="visually-hidden">check</span></button>
        <p class="content">${list[i].content}</p>
        <button type="button" class="button-delete" onclick="removeItem('${list[i].id}')"><span class="visually-hidden">delete</span></button>
      </li>
      `;
    } else {
      listHTML += `
      <li class="task">
        <button type="button" class="button-check" onclick="toggleComplete('${list[i].id}')"><span class="visually-hidden">check</span></button>
        <p class="content">${list[i].content}</p>
        <button type="button" class="button-delete" onclick="removeItem('${list[i].id}')"><span class="visually-hidden">delete</span></button>
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