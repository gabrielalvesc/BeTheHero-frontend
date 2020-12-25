import api from './api';

const BaseService = {
    async post(url, data) {
        const response = await api.post(url, data, {
            headers: this.getHeaders()
        });
        return response;
    },

    async get(url, params = {}) {
        return await api.get(url, {
            headers: this.getHeaders(),
            params: params
        });
    },

    async delete(url, id) {
        return await api.delete(`${url}/${id}`, {
            headers: this.getHeaders()
        });
    },

    async login({ email, password }) {
        const response = await api.post('login', { email, password })
        localStorage.setItem('ong', JSON.stringify(response.data.ong));
        localStorage.setItem('token', response.data.token);
    }, 

    getHeaders() {
        const token = localStorage.getItem('token');
        return { authorization: `Bearer ${token}`  }
    }

    
}

export default BaseService;