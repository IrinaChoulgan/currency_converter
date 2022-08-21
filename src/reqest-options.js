var myHeaders = new Headers();
myHeaders.append('apikey', process.env.REACT_APP_API_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default requestOptions;
