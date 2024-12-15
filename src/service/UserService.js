import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/user';

class UserService {
    async createUser(username, password, phoneNumber) {
        const response = await axios.post(`${API_URL}/create`, {
            username,
            password,
            phoneNumber,
        });
        return {data: response.data, status: response.status};
    }

    async loginUser(username, password) {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        return {data: response.data, status: response.status};
    }

    async updatePassword(password) {
        const response = await axios.put(`${API_URL}/update-password`, password);
        return response.data;
    }

    async deleteUser() {
        const response = await axios.delete(`${API_URL}/delete`);
        return response.data;
    }
}

export default new UserService();