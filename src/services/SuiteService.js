export default class SuiteService {

  constructor () {
    this.suiteRef = ''
  }

  doSth () {
    console.log('Done that!')
  }

  createSuite (suite) {
    suite.date = new Date().getTime()
    firePush('suites', suite)
  }

}
