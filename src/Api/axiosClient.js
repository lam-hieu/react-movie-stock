import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig.js";

// https://axios-http.com/docs/intro
/**
 * Axios là một thư viện HTTP Client dựa trên Promise.
 * Cơ bản thì nó cung cấp một API cho việc xử lý XHR (XMLHttpRequests)
 */

const axiosClient = axios.create({
    // `baseURL` sẽ được gán vào trước url khi url là đường dẫn tương đối.
    baseURL: apiConfig.baseUrl,
    // `headers` là các header được đặt lại trước khi gửi lên server
    headers: {
        'Content-Type': 'application/json'
    },
    // `params` là các tham số URL sẽ được gửi lên cùng request
    // `paramsSerializer` là một hàm tùy chọn, có nhiệm vụ là serialize `params`
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});

axiosClient.interceptors.request.use(async (config) => config)

// Any status code that lie within the range of 2xx cause this function to trigger
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;