import router from "@/router";
import { useUserStore } from "@/stores/modules/user";
import axios from "axios";
import { ElMessage } from "element-plus";

// 判断是否是192.168.20.
function isIPAddress16Dot16() {
  const url = new URL(window.location.href);
  const ipAddress = url.hostname;
  return /^192\.168\.20\./.test(ipAddress);
}

function ipEdit() {
  // '192.168.16.101:5173'
  const getIP = window.location.href.split("/#")[0].split("//")[1];
  const ip = getIP.replace(getIP.split(":")[1], "9015");
  return `http://${ip}`;
}

export const baseURL = isIPAddress16Dot16()
  ? import.meta.env.VITE_APP_BASE_URL
  : ipEdit();
console.log(baseURL);

export const instance = axios.create({
  baseURL: baseURL, // 替换为你的后端API URL
  timeout: 10000, // 请求超时时间
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "*", uuid: new Date().getTime() },
});

export default {
  async get(url: any) {
    try {
      const response = await instance.get(url);
      return response?.data;
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
      throw error;
    }
  },

  async post(url: any, data: any) {
    try {
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      console.error("An error occurred while posting the data:", error);
      return error;
    }
  },

  async put(url: any, data: any) {
    try {
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      console.error("An error occurred while puting the data:", error);
      throw error;
    }
  },

  async delete(url: any, data?: any) {
    try {
      const response = await instance.delete(url, { data: data });
      return response.data;
    } catch (error) {
      console.error("An error occurred while delete the data:", error);
      throw error;
    }
  },
};

// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use(
  (config: any) => {
    if(!config.url.includes("/login")){
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error: Error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应错误处理
const handleError = (error?: any) => {
  if (error?.code === 401) {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    router.replace({ path: "/login" });
  }
};

// 响应拦截器，处理数据
instance.interceptors.response.use(
  (response: any) => {
    console.log(response);
    console.log(response.data);
    // 未登录回到登录页
    if (response.data?.code === 401) {
      handleError(response.data);
    }
    if (response.data.code !== 200) {
      if(response.config.url.includes("/user/logout")){return}
      ElMessage({
        message: response.data.message || "系统异常",
        type: 'error',
        duration: 3000
      });
      return Promise.reject(response.data);
    } else {
      return response;
    }
  },
  (error: any) => {
    console.log(error);
    const errorString = error.toString()
    if (errorString.includes('Token invalid')) {
      // token失效
      ElMessage({
        message: error.response.data.message || "系统异常",
        type: 'error',
        duration: 3000
      });
      return false
    }
    if (errorString.includes('timeout')) {
      ElMessage({
        message: error.response.data.message || "接口请求超时",
        type: 'error',
        duration: 3000
      });
      return false
    }
    ElMessage({
      message: error.response.data.message || "系统异常",
      type: 'error',
      duration: 3000
    });
    return Promise.reject(error.response)
  }
);
