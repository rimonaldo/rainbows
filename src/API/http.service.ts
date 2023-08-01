import Axios from 'axios'

const http = Axios.create({
   baseURL: 'http://127.0.0.1:3030/api',
   headers: {
      'Content-type': 'application/json',
   },
   withCredentials: true, // this is the missing part
})

export const httpService = {
   get: (endpoint: string, data: any) => ajax(endpoint, 'GET', data),
   post: (endpoint: string, data: any) => ajax(endpoint, 'POST', data),
   put: (endpoint: string, data: any) => ajax(endpoint, 'PUT', data),
   delete: (endpoint: string, data: any) => ajax(endpoint, 'DELETE', data),
}

async function ajax(endpoint: string, method = 'GET', data = null) {
   try {
      const res = await http({
         url: `${endpoint}`,
         method,
         data,
         params: method === 'GET' ? data : null,
      })
      return res.data
   } catch (err: any) {
      console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
      console.dir(err)
      if (err.response && err.response.status === 401) {
         // Depends on routing startegy - hash or history
         // window.location.assign('/#/login')
         // window.location.assign('/login')
         // router.push('/login')
      }
      throw err
   }
}

export default http
