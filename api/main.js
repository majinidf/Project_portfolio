let newList = [];

const getLatesNews = async () => {
  const url = new URL('https://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines');
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles; console.log('newslist', newsList);
}

getLatesNews();