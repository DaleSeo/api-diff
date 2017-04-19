import { fireGet, firePush, fireRemove } from '../../src/services/fireUtils'
import callApi from './callApi'
import diffResponse from './diffResponse'

import db from './database'

export default class TestService {

  createSuite (suite) {
    suite.date = new Date().getTime()
    firePush('suites', suite)
  }

  loadSuite (suiteKey) {
    this.readApisAndHosts(suiteKey)
      .then(this.pushTests)
  }

  removeSuite (suiteKey) {
    fireGet('suites/' + suiteKey + '/tests')
      .then(tests => {
        Object.keys(tests).forEach(key => {
          fireRemove('suites/' + suiteKey + '/tests/' + key)
        })
        fireRemove('suites/' + suiteKey)
      })
      .catch(err => {
        console.error(err)
        fireRemove('suites/' + suiteKey)
      })
  }

  callSuite (suiteKey) {
    console.log('# callSuite')
    db.ref('suites/' + suiteKey + '/tests')
      .once('value')
      .then(tests => {
        tests.forEach(test => {
          callApi(test.val().reqA)
            .then(res => db.ref('suites/' + suiteKey + '/tests').child(test.key).child('resA').set(res))
            .catch(err => db.ref('suites/' + suiteKey + '/tests').child(test.key).child('errA').set(err))
          callApi(test.val().reqB)
            .then(res => db.ref('suites/' + suiteKey + '/tests').child(test.key).child('resB').set(res))
            .catch(err => db.ref('suites/' + suiteKey + '/tests').child(test.key).child('errB').set(err))
        })
      })
  }

  diffSuite (suiteKey) {
    db.ref('suites/' + suiteKey + '/tests')
      .once('value')
      .then(tests => {
        tests.forEach(test => {
          let result = diffResponse(test.val().resA, test.val().resB)
          db.ref('suites/' + suiteKey + '/tests').child(test.key).child('result').set(result)
        })
      })
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
