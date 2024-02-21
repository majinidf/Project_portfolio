let newList = [];

const getLatesNews = async () => {
  const url = new URL('https://noona-times-v2.netlify.app/top-headlines');
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles; console.log('newslist', newsList);
}

getLatesNews();