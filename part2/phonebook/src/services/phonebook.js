import axios from 'axios';
const BaseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
    return axios.get(BaseUrl);
};

const change = newObject =>{
    return axios.post(BaseUrl, newObject);
};


const remove = (id) => {
    const request = axios.delete(`${BaseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${BaseUrl}/${id}`, updatedPerson);
    return request.then(response => response.data);
  }

export default {
    func1: getAll,
    func2: change,
    remove: remove,
    update
};

