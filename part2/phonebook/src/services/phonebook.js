import axios from 'axios';
const BaseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(BaseUrl);
};

const change = newObject =>{
    return axios.post(BaseUrl, newObject);
};

export default {
    getAll: getAll,
    change: change,
};

