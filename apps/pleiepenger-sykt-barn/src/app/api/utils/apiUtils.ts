import axios from 'axios';
import { axiosConfigPsb } from '../../config/axiosConfig';

export const multipartConfig = { ...axiosConfigPsb, headers: { 'Content-Type': 'multipart/form-data' } };
export const axiosJsonConfig = {
    ...axiosConfigPsb,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, multipartConfig);
};

export const apiUtils = {
    sendMultipartPostRequest,
};
