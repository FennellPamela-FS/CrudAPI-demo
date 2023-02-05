import axois from 'axios';

const API_URL = "/api/v1/auth";

const signup = (email, password) => {
    return axois.post(`${API_URL}/`, {
        email, password
    })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
}

const login = (email, password) => {
    return axois.post(`${API_URL}/signin`, {
        email, password
    })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const authService = {
    signup,
    login,
    logout,
    getCurrentUser
}

export default authService;