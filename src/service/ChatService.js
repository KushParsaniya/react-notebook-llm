import axios from 'axios';
import config from "@/config/config.js";

const API_BASE_URL = config.baseUrl + '/api/v1/chat';

const ChatService = {
    sendMessage: async (chatId, message) => {
        const response = await axios.post(`${API_BASE_URL}`, {
            chatId,
            message
        },{
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        });
        return {status: response.status, data: response.data};
    },

    getChatHistory: async (chatId) => {
        const response = await axios.get(`${API_BASE_URL}/chat-history`, {
            params: {chatId},
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        });
        return {status: response.status, data: response.data};
    }
};

export default ChatService;