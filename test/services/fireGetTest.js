import db from '../../src/services/database'

db.ref('tests')
  .orderByChild('suiteKey')
  .equalTo('-KhbS1F4xQzmJIv0Xnpi')
  .once('value')
  .then(value => {
    console.log(value.toJSON())
    db.goOffline()
  })

// db.ref('apis/-KhQ6IOWQKJZbqjexNDj/specs')
//   .orderByChild('method')
//   .equalTo('GET')
//   .once('value')
//   .then(value => {
//     console.log(value.toJSON())
//     db.goOffline()
//   })
