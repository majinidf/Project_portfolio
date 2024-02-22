'use static';

let newsList = [];
const menus = document.querySelectorAll('.tab-list button');
const btn_search = document.querySelector('.search input[type=button]');

menus.forEach((menu) => menu.addEventListener('click', (e) => getNewsByCategory(e)));

const getLatesNews = async () => {
  const url = new URL('https://noona-times-v2.netlify.app/top-headlines'); // https://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines
  const response = await fetch(url);  //console.log('response ', response);
  const data = await response.json();  //console.log(data);
  newsList = data.articles; //console.log('newslist', newsList);
  render();
}

const getNewsByCategory = async (e) => {//console.log('category');
  const category = e.target.textContent.toLowerCase(); //console.log(category);
  const url = new URL(`https://noona-times-v2.netlify.app/top-headlines?category=${category}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles; //console.log('newsList category', newsList);
  render();
}

const getNewsByKeyword = async () => {
  const keyword = document.querySelector('.search input[type=search]').value; console.log(keyword);
  const url = new URL(`https://noona-times-v2.netlify.app/top-headlines?q=${keyword}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles; console.log('newsList keyword ', newsList);

  const no_data = document.querySelector('.news .no-data');
  const news_list = document.querySelector('.news .news-list');
  const news_keyword = document.querySelector('.news .keyword');

  no_data.classList.remove('is-active');
  news_list.classList.remove('is-hidden');
  
  if( newsList.length === 0 ){
    no_data.classList.add('is-active');
    news_list.classList.add('is-hidden');
    news_keyword.textContent = keyword;
  } else {
    render();
  }
}

btn_search.addEventListener('click', () => getNewsByKeyword());
document.addEventListener('keypress', (e) => {
  if(e.code == 'Enter' || e.code == 'NumpadEnter'){
    getNewsByKeyword();
  }
});

const render = () => { //console.log('render');
  const newsHTML = newsList.map( news => `
    <li class="news-item row">
      <figure class="news-img col-lg-4">
        <img src=${news.urlToImage} alt="">
      </figure>
      <div class="news-content col-lg-8">
        <h2 class="title">${news.title}</h2>
        <p class="description">${news.description}</p>
        <div class="info">${news.source.name} ${news.publishedAt}</div>
      </div>
    </li>
  `).join('');
  /* const newsHTML = newsList.map((new) => {
    return `내용`;
  });
  */
  /* const newsHTML = [10, 20, 30, 40].join(''); */
  //console.log('newsHTML' , newsHTML);
  document.querySelector('.news-list').innerHTML = newsHTML;
};

getLatesNews();