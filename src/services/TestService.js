import callApi from './callApi'
import diffResponse from './diffResponse'

import db from './database'

export default class TestService {

  constructor (suiteId) {
    this.testRef = db.ref('tests').child(suiteId)
  }

  prep (suite) {
    console.log('TestService#prep')
    Object.values(suite.apis).forEach(api => {
      let reqA = {
        method: api.method,
        url: suite.hostA + api.path,
        body: api.body || {}
      }
      let reqB = {
        method: api.method,
        url: suite.hostB + api.path,
        body: api.body || {}
      }
      this.testRef.push({ reqA, reqB })
    })
  }

  call () {
    console.log('TestService#call')
    return this.testRef
      .once('value')
      .then(tests =>
        tests.forEach(test => {
          callApi(test.val().reqA)
            .then(res => this.testRef.child(test.key).child('resA').set(res))
            .catch(err => this.testRef.child(test.key).child('errA').set(err))
          callApi(test.val().reqB)
            .then(res => this.testRef.child(test.key).child('resB').set(res))
            .catch(err => this.testRef.child(test.key).child('errB').set(err))
        })
      )
  }

  diff () {
    console.log('TestService#diff')
    return this.testRef
      .once('value')
      .then(tests => {
        tests.forEach(test => {
          let result = diffResponse(test.val().resA, test.val().resB)
          this.testRef.child(test.key).child('result').set(result)
        })
      })
  }

}
