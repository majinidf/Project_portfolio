const getLatesNews = async () => {
  const url = new URL('https://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines');
  const response = await fetch(url);
  const data = response.json();
  console.log(response);
}