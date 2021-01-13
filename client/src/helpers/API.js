export default async (path, method, body) => {
  const url = '/api' + path
  const response = await fetch(url, {
    method: method ? method : 'GET',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  if (response.status >= 400) {
    const err = new Error()
    err.code = response.status
    err.response = response
    throw err
  }
  return await response.json()
}
