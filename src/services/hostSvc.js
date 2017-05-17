import superagent from 'superagent'

const restUrl = 'http://localhost:3000/hosts'

function list(serviceId) {
  let url = restUrl
  if (serviceId) {
    url = restUrl + '/search/findByServiceId?serviceId=' + serviceId
  }
  return superagent.get(url)
    .then(res => res.body._embedded.hosts)
}

function create(host) {
  return superagent.post(restUrl)
    .send(host)
}

function detail(id) {
  return superagent.get(restUrl + '/' + id)
    .then(res => res.body)
}

function remove(id) {
  return superagent.delete(restUrl + '/' + id)
}

export default {
  list, create, detail, remove
}
