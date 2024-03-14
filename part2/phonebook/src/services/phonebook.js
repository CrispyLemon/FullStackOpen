import axios from 'axios';
const BaseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(BaseUrl);
};

const change = newObject =>{
    return axios.post(BaseUrl, newObject);
};

export default {
    func1: getAll,
    func2: change,
};

