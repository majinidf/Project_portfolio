'use strict';

const counter = document.querySelector('.counter');
const input = document.querySelector('input[type=text]');
const notice = document.querySelector('.notice');
const btn_reset = document.querySelector('.btn-reset');
const btn_go = document.querySelector('.btn-go');
let goal_num;
let count;

const initGame = function(){
  goal_num = Math.floor(Math.random()*100)+1; // Math.floor(Math.random()*100) -> 0~99
  count = 5;
}

initGame();

console.log(goal_num); // 테스트를 위해 정답 노출

const compareNum = function(){
  const user_num = input.value * 1 ;

  if(user_num == goal_num){
    notice.textContent = `😘 ${user_num}은 정답입니다.`
  } else {
    notice.textContent = user_num > goal_num ? `${user_num} 보다 👎 down` : `${user_num} 보다 👍 up`;
  }
}

btn_go.addEventListener('click', compareNum);