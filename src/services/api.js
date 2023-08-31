import { BASE_URL, IMG_URL } from "../constants";
import axios from 'axios';

const headers = () => {
    const headers = {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    }
    return headers
    }

const POST = async (url, payload) => {
    let res = null;
    try {
        res = await axios.post(url, payload, headers());
    return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const PATCH = async (url, payload) => {
    let res = null;
    try {
        res = await axios.patch(url, payload, headers());
    return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const UPDATE = async (url, payload) => {
    let res = null;
    try {
        res = await axios.update(url, payload, headers());
    return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const GET = async (url) => {
    let res = null;
    try {
        res = await axios.get(url, headers());
    return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const DELETE = async (url) => {
    let res = null;
    try {
        res = await axios.delete(url, headers());
    return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const errorMessage = {
    message: "Error en el servidor",
    name: "serverError",
    statusCode: 500
    }
    
export default {
    POST,
    GET,
    PATCH,
    DELETE,
    pokemons:`${BASE_URL}/pokemon`,
}
        