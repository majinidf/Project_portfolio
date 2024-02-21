const getLatesNews = async () => {
  const url = new URL('https://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines');
  const response = await fetch(url);  console.log('response ', response);
  const data = await response.json();  console.log(data);
  newsList = data.articles; console.log('newslist', newsList);
}

getLatesNews();