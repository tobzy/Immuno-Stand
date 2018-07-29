import axios from 'axios';
import { clientConfig } from '../config/httpConfig.js'
import {message} from "antd/lib/index";

let axiosClient = axios.create(clientConfig);



const endpointCallerService = (url, method, params) => {
  let parameters = {};
  if(method == "get"){
    parameters = {
      params:{...params}
    }
  }else{
    parameters = {...params}
  }
  axiosClient[method](url, parameters)
    .then((response)=>{
      return response
    })
    .catch((error)=>{
      return error
    })
}

export {axiosClient, endpointCallerService};