import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
const API_URL = "http://localhost:3001";
import { getAccessToken } from "../utils/common-utils";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  // headers: {
  //   "Accept": "application/json, multipart/form-data",
  //   "Content-Type": "application/json"
  // }
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Intercept request logic here
    console.log("Outgoing request intercepted:", config);
    // Update headers in the config object
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);
// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Stop global loader here
    // Intercept response logic here
    console.log("Incoming response intercepted:", response);
    return processResponse(response);
  },
  (error) => {
    // handle response error
    console.error("Response Interceptor error:", error);
    return Promise.reject(processError(error));
  }
);
//If success -> return{ isSuccess : true, data: Object}
// If fail ->  return{ isFailure: true, status: string, message: string, code: int}
// const processResponse = (response) => {
//   if (response?.status === 200) {
//     return { isSuccess: true, data: response.data };
//   } else {
//     return {
//       isFailure: true,
//       status: response?.status,
//       message: response?.data?.message, // Adjust to get the correct message
//       // code: response?.code
//       code: response?.status
//     };
//   }
// };

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      message: response?.data?.message, // Adjust to get the correct message
      code: response?.status
    };
  }
};

//If success -> return{ isSuccess : true, data: Object}
// If fail ->  return{ isFailure: true, status: string, message: string, code: int}
const processError = (error) => {
  if (error.response) {
    // reqquest sent and server responded with a status other
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isFailure: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure,
      message: error.response.data,
      code: error.response.status
    };
  } else if (error.request) {
    // Request sent but no response get back
    console.log("ERROR IN REQUEST : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure,
      code: ""
    };
  } else {
    //  Something happen in setting up request that triggers an error
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError,
      code: ""
    };
  }
};
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    return axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken()
      },
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      }
    });
  };
}
export { API };

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   API[key] = (body, showUploadProgress, showDownloadProgress) => {
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progressEvent) {
//         if (showUploadProgress) {
//           let percentageCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showUploadProgress(percentageCompleted);
//         }
//       },
//       onDownloadProgress: function (progressEvent) {
//         if (showDownloadProgress) {
//           let percentageCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           showDownloadProgress(percentageCompleted);
//         }
//       }
//     });
//   };
// }
