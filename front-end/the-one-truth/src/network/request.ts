import axios, { AxiosRequestConfig } from 'axios'

export function request(config: AxiosRequestConfig){
    const instance = axios.create({
        timeout: 5000,
        baseURL: ''
    })

    instance.interceptors.response.use(result =>{
        return result.data
    })

    return instance(config)
}