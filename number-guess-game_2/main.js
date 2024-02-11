'use strict';

const counter = document.querySelector('.counter');
const input = document.querySelector('input[type=text]');
const notice = document.querySelector('.notice');
const btn_reset = document.querySelector('.btn-reset');
const btn_go = document.querySelector('.btn-go');
let goal_num;
let prev_num = 0;
let count;

const initGame = function(){
  goal_num = Math.floor(Math.random()*100)+1; // Math.floor(Math.random()*100) -> 0~99
  count = 5;
  notice.textContent = '';
  input.value = '';
  input.focus();
  btn_go.removeAttribute('disabled');
}

initGame();

console.log(goal_num); // 테스트를 위해 정답 노출

btn_reset.addEventListener('click', initGame);

const compareNum = function(){
  const user_num = input.value * 1 ;
  input.value = '';
  input.focus();

  if(user_num == 0 || user_num > 100){
    notice.textContent = '1~100 사이의 숫자를 입력해주세요.';
    return false;
  }

  if(prev_num == user_num){
    notice.textContent = `😅 ${user_num}은 이전과 동일한 숫자입니다. 다른 숫자를 입력해주세요.`;
    return false;
  }

  if(user_num == goal_num){
    notice.textContent = `😘 ${user_num}은 정답입니다.`
    btn_go.setAttribute('disabled', true);
  } else {
    prev_num = user_num;
    counter.textContent = --count;
    if( count != 0 ) {
      notice.textContent = user_num > goal_num ? `${user_num} 보다 👎 down` : `${user_num} 보다 👍 up`;
    } else {
      notice.textContent = `😥 가능 횟수가 모두 끝났습니다. 정답은 ${goal_num} 입니다. 게임을 다시 해보세요~`;
      btn_go.setAttribute('disabled', true);
    }
  }
}

btn_go.addEventListener('click', compareNum);

document.addEventListener('keypress', (e) => {
  if( e.code == 'Enter' || e.code == 'NumpadEnter'){
    compareNum();
  }
})