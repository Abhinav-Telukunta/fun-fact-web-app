import axios from 'axios';
axios.defaults.withCredentials = true;
export const loginUrl = 'http://localhost:4000/auth/google';
export const logoutUrl = 'http://localhost:4000/auth/logout';
export const movieApi = 'http://localhost:4000/api/movie';
export const funfactApi = 'http://localhost:4000/api/funfact';
export const authUrl = 'http://localhost:4000/auth/me';