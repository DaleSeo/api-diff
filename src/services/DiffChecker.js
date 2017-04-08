import db from './database'
import superagent from 'superagent'

class DiffChecker {

  constructor () {
    this.db = db
    // this.mock_result = {
    //   serviceKey: this.service['.key'],
    //   date: Date(),
    //   responses: [
    //     {
    //       api: this.service.apis[0],
    //       host: this.service.hosts[0],
    //       response: {
    //         userId: 1,
    //         id: 1,
    //         title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //         body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    //       }
    //     },
    //     {
    //       api: this.service.apis[0],
    //       host: this.service.hosts[1],
    //       response: {
    //         userId: 1,
    //         id: 1,
    //         title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //         body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    //       }
    //     },
    //     {
    //       api: this.service.apis[1],
    //       host: this.service.hosts[1],
    //       response: {
    //         id: 101,
    //         title: 'foo',
    //         body: 'bar',
    //         userId: 1
    //       }
    //     },
    //     {
    //       api: this.service.apis[1],
    //       host: this.service.hosts[1],
    //       response: {
    //         id: 101,
    //         title: 'foo',
    //         body: 'bar',
    //         userId: 1
    //       }
    //     }
    //   ]
    // }
  }

  execute (service, callback) {
    console.log('DiffChecker#service')
    this.db.ref('results').remove()

    service.apis.forEach((api, i) => {
      service.hosts.forEach((host, j) => {
        let result = {
          date: Date(),
          serviceKey: service['.key'],
          apiIdx: i,
          hostIdx: j,
          request: {
            method: api.method,
            url: host.baseUrl + api.path,
            body: api.body || ''
          }
        }
        superagent(api.method, host.baseUrl + api.path)
          .send(api.body)
          .then(res => {
            result.response = {
              statusCode: res.statusCode,
              statusText: res.statusText,
              headers: res.header,
              body: res.body,
              text: res.text
            }
            this.db.ref('results').push(result)
          })
      })
    })
  }
}

export default DiffChecker
