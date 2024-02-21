'use static';

let newsList = [];

const getLatesNews = async () => {
  const url = new URL('https://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines');
  const response = await fetch(url);  console.log('response ', response);
  const data = await response.json();  console.log(data);
  newsList = data.articles; console.log('newslist', newsList);
  render();
}

const render = () => { console.log('render');
  const news_list = document.querySelector('.news-list');

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
  console.log('newsHTML' , newsHTML);
  news_list.innerHTML += newsHTML;
};

getLatesNews();