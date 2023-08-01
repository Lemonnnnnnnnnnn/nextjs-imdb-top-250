import axios from 'axios'
import { toast } from 'react-hot-toast'

const request = {
  get: async <T>(url: string, params?: any , showToast = true) => {
    let id
    if(showToast){
      id = toast.loading('加载中...')
    } 
    const response = await axios.get<T>(url, { params })
    if(id) { 
      toast.remove(id) 
    }
    return response.data
  },
  post: async <T>(url: string, body: {}) => {
    let id = toast.loading('加载中...')
    const response = await axios.post<T>(url, body)
    toast.remove(id)
    return response.data
  },
}

export default request
