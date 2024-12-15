import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/chat';

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
        return {status: response.status, data: response.data, chatId: response.headers.get("x-chat-id")};
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