import axios from 'axios';
const BaseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () => {
    return axios.get(BaseUrl + "all");
}

export default { getAll }