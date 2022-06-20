export default function fetcher(
  url: string,
  method: undefined | string = undefined,
  data: Object = undefined
) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: method ? method : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      console.log(';((')
      throw new Error()
    }
    return res.json()
  })
}
