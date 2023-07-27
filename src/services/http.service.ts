import Axios from 'axios'

const http = Axios.create({
   baseURL: 'http://localhost:3030/api',
   headers: {
      'Content-type': 'application/json',
   },
})

export const httpService = {
   get: (endpoint: string, data: any) => ajax(endpoint, 'GET', data),
   post: (endpoint: string, data: any) => ajax(endpoint, 'POST', data),
   put: (endpoint: string, data: any) => ajax(endpoint, 'PUT', data),
   delete: (endpoint: string, data: any) => ajax(endpoint, 'DELETE', data),
}

async function ajax(endpoint: string, method = 'GET', data = null) {
   try {
      const res = await Axios({
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

// async function ajax(endpoint, method = "GET", data = null) {
//     try {
//        const res = await axios({
//           url: `${BASE_URL}${endpoint}`,
//           method,
//           data,
//           params: method === "GET" ? data : null,
//        })
//        return res.data
//     } catch (err) {
//        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
//        console.dir(err)
//        if (err.response && err.response.status === 401) {
//           // Depends on routing startegy - hash or history
//           // window.location.assign('/#/login')
//           // window.location.assign('/login')
//           // router.push('/login')
//        }
//        throw err
//     }
//  }
// export const get = async (url: string) => {
//    const response = await http.get(url)
//    return response.data
// }

// export const post = async (url: string, data: any) => {
//    const response = await http.post(url, data)
//    return response.data
// }

// export const put = async (url: string, data: any) => {
//    const response = await http.put(url, data)
//    return response.data
// }

// export const remove = async (url: string) => {
//    const response = await http.delete(url)
//    return response.data
// }
