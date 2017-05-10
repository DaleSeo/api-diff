import superagent from 'superagent'

const restUrl = 'http://localhost:3000/services'

function find() {
  return superagent.get(restUrl)
    .then(res => res.body._embedded.services)
}

function create(service) {
  return superagent.post(restUrl)
    .send(service)
}

export default {
  find, create
}
