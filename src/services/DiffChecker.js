import request from 'superagent'

class DiffChecker {

  constructor () {
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
    let result = {
      serviceKey: service['.key'],
      date: Date()
    }
    let promises = []
    service.apis.forEach(api => {
      service.hosts.forEach(host => {
        let url = host.baseUrl + api.path
        promises.push(request(api.method, url).send(api.body))
      })
    })
    Promise.all(promises).then(responses => {
      result.results = responses.map(res => {
        console.log('res:', res)
        let request = {
          method: res.req.method,
          url: res.req.url
        }
        let response = {
          statusCode: res.statusCode,
          statusText: res.statusText,
          headers: res.header,
          body: res.body,
          text: res.text
        }
        return {request, response}
      })
      callback(result)
    })
  }
}

export default DiffChecker
