import { fireGet, firePush, fireRemove } from '../../src/services/fireUtils'
import db from './database'

export default class TestService {

  createSuite (suite) {
    suite.date = new Date().getTime()
    firePush('suites', suite)
      .then(this.readSpecsAndHosts)
      .then(this.pushTests)
  }

  removeSuite (suite) {
    fireGet('tests', 'suiteKey', suite['.key'])
      .then(tests => {
        if (tests) {
          Object.keys(tests).forEach(key => {
            fireRemove('tests/' + key)
          })
        }
        fireRemove('suites/' + suite['.key'])
      })
  }

  readSpecsAndHosts (suiteKey) {
    return new Promise((resolve, reject) => {
      fireGet('suites/' + suiteKey)
        .then(suite => {
          fireGet('apis/' + suite.apiKey)
          .then(api => {
            resolve({specs: api.specs, hosts: suite.hosts, suiteKey: suiteKey})
          })
        })
    })
  }

  pushTests (data) {
    let specs = data.specs
    let hosts = data.hosts
    let suiteKey = data.suiteKey

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
          suiteKey: suiteKey,
          completed: false,
          calls: calls
        }
        firePush('tests', test)
      })
  }
}
