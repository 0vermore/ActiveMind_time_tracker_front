const API_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:4000'
  : window.location.origin.includes('active-mind-api')
    ? 'https://active-mind-api.herokuapp.com'
    : 'https://portal.milestep.io'

export default {
  API: API_URL,
}