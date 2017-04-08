import request from 'superagent'

export default request = function (api, url) {
  let url = host.baseUrl + api.path
  return request(api.method, url)
    .send(api.body)
}
