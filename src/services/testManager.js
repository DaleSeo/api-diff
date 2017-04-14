import db from './database'

class TestManager (

  createTestCases (suite) {
    let requests = db.ref('apis/' + suite.apiKey).child('requests')
    
  }

)

testManager = new TestManager()
export default testManager
