import serviceSvc from './serviceSvc'

// serviceSvc.find()
//   .then(services => console.log(services))

serviceSvc.create({
  code: 'JPH',
  name: 'Jsonplaceholder',
  description: ''
})
.then(res => console.log(res))
