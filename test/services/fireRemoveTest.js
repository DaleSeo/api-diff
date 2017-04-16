import db from '../../src/services/database'

db.ref('suites/-KhbS1F4xQzmJIv0Xnpi').child('tests').remove()
  .then(_ => {
    db.goOffline()
  })
