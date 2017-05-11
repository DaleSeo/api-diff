import superagent from 'superagent'

const restUrl = 'http://localhost:3000/hosts'

function list(serviceId) {
  return superagent.get(restUrl + '/search/findByServiceId?serviceId=' + serviceId)
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
