import axios from 'axios'

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        //console.log(config);

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        const { authorization } = response.headers
        authorization && localStorage.setItem('token', authorization)
        return response
    },
    (error) => {
        const {status} = error.response

        if (status === 401){
            window.location.href = '#/login'
        }
        return Promise.reject(error)
    }
)