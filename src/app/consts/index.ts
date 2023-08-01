// https://github.com/tuhinpal/imdb-api
const LOCAL_API_PORT = 4000

export const IMDB_API_KEY = 'k_80aey292'
export const IMDB_API_TOP250 = `https://imdb-api.com/en/API/Top250Movies/${IMDB_API_KEY}`
export const IMDB_API_DETAIL = `http://localhost:${LOCAL_API_PORT}/title`
export enum LOGIN_MODAL_TYPE {
  login = 'login',
  register = 'register',
}
export const DELAY = 200