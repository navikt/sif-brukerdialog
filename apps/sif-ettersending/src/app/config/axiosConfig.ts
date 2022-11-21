const axiosConfig = {
    withCredentials: false,
};

export const axiosJsonConfig = { ...axiosConfig, headers: { 'Content-type': 'application/json; charset=utf-8' } };
export const axiosMultipartConfig = { ...axiosConfig, headers: { 'Content-Type': 'multipart/form-data' } };
