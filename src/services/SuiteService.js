import { fireGet, firePush, fireRemove } from '../../src/services/fireUtils'
import db from './database'
import callApi from './callApi'
import _ from 'lodash'

export default class SuiteService {

  constructor (serviceId) {
    this.suiteRef = db.ref(`services/${serviceId}/suites`)
  }

  getRef () {
    return this.suiteRef
  }

  create (suite) {
    console.log('SuiteService#create')
    return this.findApis()
      .then(apis => {
        suite.apis = apis
        return suite
      })
      .then(suite => this.suiteRef.push(suite))
      .then(snap => snap.key)
  }

  remove (id) {
    console.log('SuiteService#remove')
    return this.suiteRef
      .child(id)
      .remove()
  }

  populateTests (id) {
    console.log('SuiteService#populateTests')
    return this.suiteRef.child(id).once('value')
      .then(snap => snap.val())
      .then(suite =>
        Object.values(suite.apis).map(api => {
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
          let test = { reqA, reqB }
          return db.ref('tests').child(id).push(test)
        })
      )
      .then(promises => Promise.all(promises))
  }

  callTests (id) {
    console.log('SuiteService#callTests')
    return db.ref('tests').child(id)
      .once('value')
      .then(snap => snap.val())
      .then(tests => {
        _.flatMap(Object.keys(tests), key => {
          [
            callApi(tests[key].reqA)
              .then(res => db.ref('tests').child(id).child(key).child('resA').set(res))
              .catch(err => db.ref('tests').child(id).child(key).child('errA').set(err))
          ,
            callApi(tests[key].reqB)
              .then(res => db.ref('tests').child(id).child(key).child('resB').set(res))
              .catch(err => db.ref('tests').child(id).child(key).child('errB').set(err))
          ]
        })
      })
      .then(promises => Promise.all(promises))
  }

  //////////////////////////////////////////////////////////////////////////////

  findApis () {
    return this.suiteRef.parent.child('apis').once('value')
      .then(snap => snap.val())
      .then(apis => Object.values(apis).filter(api => !api.skip))
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
