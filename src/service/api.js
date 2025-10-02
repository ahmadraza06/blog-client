
import axios from 'axios'
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config';
import { getAccessToken } from '../utils/common-utils';

const API_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
  function (config) {
    // If FormData → use multipart/form-data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // Default → JSON
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(err){
        return Promise.reject(processError(err));
    }
)

/// if success return - {istrue:true , data:object}

const processResponse  = (response)=>{
    if(response?.status === 200){
        return {
            isSuccess:true,
            data:response.data
        }
    }
    else{
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

const processError = (error)=>{
    if(error.response){
        // reponse status is other than 200
        console.log("Error in response",error.toJSON())
        return { 
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //request send
        console.log("Error in request",error.toJSON())
        return { 
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.requestFailure,
            code:""
        }
        
    }
    else{
        //network error
        console.log("Error in network",error.toJSON())
        return { 
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.responseFailure,
            code:""
        }
    }
}
const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress, pathParams = {}) => {
    let url = value.url;

    // Replace any :param in URL
    Object.entries(pathParams).forEach(([k, v]) => {
      url = url.replace(`:${k}`, v);
    });

    const config = {
      method: value.method,
      url: url,
      headers: {
        authorization: getAccessToken(),
      },
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showUploadProgress(percentage);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showDownloadProgress(percentage);
        }
      },
    };

    // GET requests → use params, others → use data
    if (value.method === "GET" || value.query) {
      config.params = body; // query string
    } else {
      config.data = body;   // request body
    }

    return axiosInstance(config);
  };
}

export {API}