import axios from 'axios';
const qs = require('qs')

import { Method } from '../types/app-types'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.debug('[Axios] Failed to make an HTTP request.')
    if (error.response) {
        console.debug(`[Axios] Status code is other than 200. Status: ${error.response.status}`);
    } else if (error.request) {
        console.debug(`[Axios] The server did not respond. Request: ${error.request}`);
    } else {
        console.debug(`[Axios] Something went wrong in the client side. Error: ${error.message}`);
    }
    return Promise.reject(error);
});

export const setAccessToken = (token: string): boolean => {
    if (!token) return false
    axios.defaults.headers.common['Authorization'] = token;
    return true
}

export class Request {
    constructor (url: string, method: Method) {
        this.url = url
        this.method = method
    }
    url: string
    method: Method
    params?: any
    data?: any
    
    setUrl (url: string): Request {
        this.url = url
        return this
    }

    setMethod (method: Method): Request {
        this.method = method
        return this
    }
    
    setParams (params: any): Request {
        this.params = params
        return this
    }

    setData (data: any): Request {
        this.data = data 
        return this
    }
    
    send <T> () {
        return axios.request<T>({
            url: this.url,
            method: this.method,
            params: this.params,
            data: this.data,
            paramsSerializer: p => qs.stringify(p, { arrayFormat: "repeat" })
        })
        .then(response => {
            return response
        })
    }
}
