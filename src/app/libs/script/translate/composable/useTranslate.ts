import md5 from 'js-md5'
import { composeApiParams } from '../../../../service/utils'
import request from '../../../../service/request'


const BASE_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
const APP_ID = '20201015000590183'
const SECRATET_KEY = 'VVUMHEM_9yc7yN5dkhzo'
const SALT = 'zxc12kas32143djklqw214njzxcj'
const FORM = 'en'
const TO = 'zh'

const getSign = (query: string) => {
  const raw = APP_ID + query + SALT + SECRATET_KEY
  return md5(raw)
}

type TransResult = {
  src: string
  dst: string
}

interface ReqSuccess {
  from: typeof FORM
  to: typeof TO
  trans_result: TransResult[]
}

interface ReqError {
  error_code: string
  error_msg: string
}

export const useTranslate = async (query: string) => {
  const url = composeApiParams({
    baseUrl: BASE_URL,
    params: {
      q: query,
      from: FORM,
      to: TO,
      appid: APP_ID,
      salt: SALT,
      sign: getSign(query),
    },
  })

  const res = await request.get<ReqSuccess & ReqError>(url)

  if (res.error_code) {
    console.log('code:', res.error_code)
    console.log('msg:', res.error_msg)
    return null
  } else if(!res.trans_result[0].dst){
    console.log('return nothing');
    return null
  } else {
    return res.trans_result[0].dst
  }
}