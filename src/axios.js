import axios from "axios";

export const BASE_URL =
  "http://microlearning-backend.ap-south-1.elasticbeanstalk.com";

export const CLOUDFRONT_BASE_URL = "https://d3lf1ujcjce6zc.cloudfront.net";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error?.response || error);
  }
);

export const getAccessToken = () => {
  return (
    // CookieService.getValue(CookieKeys.TOKEN_CONTEXT)?.token ||
    localStorage.getItem("token") || localStorage.getItem("TOKEN")
  );
};
const getInstance = ({ headers: _headers = {}, baseUrl }) => {
  const headers = {
    ...{
      "Content-Type": "application/json",
    },
    ..._headers,
  };

  const Instance = axios.create({
    baseURL: baseUrl || BASE_URL,
    headers: headers,
  });
  Instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.clear();
        // CookieService.deleteValue(CookieKeys.TOKEN_CONTEXT);
      }
      // handle the error
      return Promise.reject(error?.response?.data?.error || error?.response);
    }
  );
  return Instance;
};

export const Client = {
  get: (endpoint, config = {}) => {
    let params = [];
    if (config.params) {
      for (let p in config.params) {
        let key = p;
        if (Array.isArray(config.params[p])) {
          config.params[p].forEach((element) => {
            params.push(`${key}=${encodeURIComponent(element)}`);
          });
        } else {
          params.push(`${key}=${encodeURIComponent(config.params[p])}`);
        }
      }
    }
    const Instance = getInstance({
      headers: config.headers || {},
      baseUrl: config.baseUrl,
    });
    return Instance(endpoint, {
      params: config.params || {},
    });
  },
  post: (endpoint, data, config = {}) => {
    const Instance = getInstance({ headers: config.headers || {} });
    return Instance.post(endpoint, data, {
      params: config.params || {},
    });
  },
  delete: (endpoint, data, config = {}) => {
    const Instance = getInstance({ headers: config.headers || {} });
    return Instance.delete(endpoint, data);
  },

  put: (endpoint, data, config = {}) => {
    const Instance = getInstance({ headers: config.headers || {} });
    return Instance.put(endpoint, data);
  },

  patch: (endpoint, data, config = {}) => {
    const Instance = getInstance({ headers: config.headers || {} });
    return Instance.patch(endpoint, data);
  },
};

export const getPresignedUrl = async (params) => {
  const { data } = await Client.get(`/aws/s3/presigned-url`, {
    params: { ...params },
  });
  return data?.data?.uploadURL || data?.data?.downloadURL;
};

export const uploadFileToS3 = async (uploadUrl, file, contentType, options) => {
  return await axios.put(uploadUrl, file, {
    headers: { "Content-Type": contentType },
    ...options,
  });
};
