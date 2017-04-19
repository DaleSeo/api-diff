import db from '../src/services/database'

db.ref('apis')
  .once('value')
  .then(snapshot => snapshot.val())
  .then(apis => console.log(apis))
  .then(_ => db.goOffline())
