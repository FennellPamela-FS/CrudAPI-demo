import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "/students";

const getAllPrivateStudents = () => {
    // return axios.get(`${API_URL}/private`, { headers: authHeader() });
    // return axios.get(`/`, { headers: authHeader() });
    return axios.get(`${API_URL}/`, { headers: authHeader() });
}

const studentService = {
    getAllPrivateStudents
}

export default studentService;
