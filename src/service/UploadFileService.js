import axios from 'axios';
import config from "@/config/config.js";

const API_URL = config.baseUrl + '/api/v1/file';

class UploadFileService {


    async uploadSmallFile(multipartFile) {
        const formData = new FormData();
        formData.append('multipartFile', multipartFile);
        const response = await axios.post(`${API_URL}/upload-small-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('jwtToken'),
            },
        });
        return {data: response.data, status:response.status};
    }

    async uploadLargeFile(multipartFile) {
        const formData = new FormData();
        formData.append('file', multipartFile);
        const response = await axios.post(`${API_URL}/upload-large-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('jwtToken'),
            },
        });
        return {data: response.data, status:response.status};
    }
}

export default new UploadFileService();