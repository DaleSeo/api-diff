import { fireGet, fireSet } from '../../src/services/fireUtils'
import db from './database'

export default class TestService {

  constructor (suiteKey) {
    this.suiteKey = suiteKey
  }

  prepareRequests () {
    this.extractSpecsAndHosts()
      .then(data => {
        this.pushTests(data.specs, data.hosts)
      })

  }

  extractSpecsAndHosts () {
    return new Promise((resolve, reject) => {
      fireGet('suites/' + this.suiteKey)
        .then(suite => {
          fireGet('apis/' + suite.apiKey)
          .then(api => {
            resolve({specs: api.specs, hosts: suite.hosts})
          })
        })
    })
  }

  pushTests (specs, hosts) {
    Object.values(specs)
      .filter(spec => !spec.skip)
      .forEach(spec => {
        let calls = Object.values(hosts)
          .map(host => {
            return {
              req: {
                method: spec.method,
                url: host + spec.url,
                body: spec.body
              }
            }
          })
        let test = {
          suiteKey: this.suiteKey,
          completed: false,
          calls: calls
        }
        console.log(test)
        db.ref('tests').push(test)
      })
  }
}
