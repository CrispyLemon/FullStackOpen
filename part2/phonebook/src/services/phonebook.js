import axios from 'axios';
const BaseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(BaseUrl);
};

const change = newObject =>{
    return axios.post(BaseUrl, newObject);
};

const del = object => {
    return axios.delete('http://localhost:3001/persons', object);
}

export default { getAll, change, del };

