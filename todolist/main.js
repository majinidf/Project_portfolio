'use strict';

/*
  - 유저가 값을 입력하고 + 버튼 클릭하면 
  - 할일이 추가된다.
  - check 버튼을 클릭하면 할일이 끝나며 밑줄이 생긴다.
  - delete 버튼을 클릭하면 할일이 삭제된다.
  - 진행중 끝남 탭을 누르면, 언더바가 이동한다.
  - 끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 보인다.
*/

const task_text = document.querySelector('.input-text');
const btn_add = document.querySelector('.button-plus');
const task_list = document.querySelector('.tasks');
let taskList = [];

const addTask = function(){ console.log('addTask')
  taskList.push(task_text.value);
  task_text.value = '';
  renderTask();
}

const renderTask = function(){
  let listHTML = '';

  for(let i = 0; i < taskList.length ; i++){
    listHTML += `
    <li class="task">
      <p class="content">${taskList[i]}</p>
      <div class="buttons">
        <button type="button" class="button-check">check</button>
        <button type="button" class="button-delete">delete</button>
      </div>
    </li>
    `;
  }

  task_list.innerHTML = listHTML;
}

btn_add.addEventListener('click', addTask);
