import superagent from 'superagent'

export default function callApi (req) {
  console.log(req)
  return superagent.post('http://localhost:3000/callApi')
    .send(req)
    .then(res => {
      return {
        statusCode: res.body.statusCode,
        statusText: res.body.statusMessage,
        headers: res.body.headers,
        body: res.body.body,
        text: res.body.text
      }
    })
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => {
      console.error(err)
    })
}
