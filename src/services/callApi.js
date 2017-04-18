import superagent from 'superagent'

export default function callApi (req) {
  return new Promise((resolve, reject) => {
    superagent(req.method, req.url)
      .send(req.body)
      .then(res => {
        resolve({
          statusCode: res.statusCode,
          statusText: res.statusText,
          headers: res.header,
          body: res.body,
          text: res.text
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
