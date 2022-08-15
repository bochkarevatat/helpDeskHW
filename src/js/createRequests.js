export default async function createRequest(options) {
  const baseUrl = 'http://localhost:7080/';
  const requestUrl = baseUrl + options.url;
  const response = await fetch(requestUrl, {
    method: options.method || 'GET',
    body: options.body,
  });
  // console.log(response)
  return response.json();

  
}

