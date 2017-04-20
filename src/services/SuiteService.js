import { fireGet, firePush, fireRemove } from '../../src/services/fireUtils'
import db from './database'

export default class SuiteService {

  constructor (serviceId) {
    this.suiteRef = db.ref(`services/${serviceId}/suites`)
  }

  getRef () {
    return this.suiteRef
  }

  create (suite) {
    return this.findApis()
      .then(apis => {
        suite.apis = apis
        return suite
      })
      .then(suite => this.suiteRef.push(suite))
      .then(snap => snap.key)
  }

  remove (id) {
    return this.suiteRef
      .child(id)
      .remove()
  }

  findApis () {
    return this.suiteRef.parent.child('apis').once('value')
      .then(snap => snap.val())
      .then(apis => Object.values(apis).filter(api => !api.skip))
  }

  loadTests (id) {
    this.readApisAndHosts(suiteKey)
      .then(this.pushTests)
  }

  readApisAndHosts (suiteKey) {
    return new Promise((resolve, reject) => {
      fireGet('suites/' + suiteKey)
        .then(suite => {
          fireGet('apis/' + suite.apiKey)
          .then(api => {
            resolve({apis: api.apis, hostA: suite.hostA, hostB: suite.hostB, suiteKey: suiteKey})
          })
        })
    })
  }

  pushTests (data) {
    let apis = data.apis
    let hostA = data.hostA
    let hostB = data.hostB
    let suiteKey = data.suiteKey

    Object.values(apis)
      .filter(spec => !spec.skip)
      .forEach(spec => {
        let reqA = {
          method: spec.method,
          url: hostA + spec.url,
          body: spec.body || {}
        }
        let reqB = {
          method: spec.method,
          url: hostB + spec.url,
          body: spec.body || {}
        }
        let test = { reqA, reqB }
        firePush('suites/' + suiteKey + '/tests', test)
      })
  }

}
