import db from './database'

class TestManager {

  createTestCases (apiKey) {
    let specRef = db.ref('apis/' + apiKey).child('specs')
    console.log(specRef.toString())
    specRef.on('value', function (snapshot) {
      console.log(snapshot.val())
    })
  }

}

export default TestManager
