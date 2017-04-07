import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAAazZNEgSLuUjLip2ZqIlbrlZZaUhyWbw',
  authDomain: 'api-diff.firebaseapp.com',
  databaseURL: 'https://api-diff.firebaseio.com',
  projectId: 'api-diff',
  storageBucket: 'api-diff.appspot.com',
  messagingSenderId: '790197097252'
}

const app = Firebase.initializeApp(config)
const db = app.database()

export default db
