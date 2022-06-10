import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ApplicationApiData } from '../types/ApplicationApiData';
import { ResourceType } from '../types/ResourceType';
import { getApiUrl, sendMultipartPostRequest } from '../utils/apiUtils';

export const getSøker = () => axios.get(getApiUrl(ResourceType.SØKER), axiosConfig);

export const sendApplication = (data: ApplicationApiData) =>
    axios.post(getApiUrl(ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrl(ResourceType.VEDLEGG), formData);
};

export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
