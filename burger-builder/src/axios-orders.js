import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-a7ffb.firebaseio.com/'
})


export default instance;