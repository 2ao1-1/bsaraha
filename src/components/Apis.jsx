export const BASE_URL = import.meta.env.VITE_API_URL;

export const POST_NEWUSER = `${BASE_URL}/api/auth/register`;

export const GET_EXISTUSER = `${BASE_URL}/api/auth/login`;

export const GET_USER_MESSAGES = `${BASE_URL}/api/messages/`;

export const POST_MESSAGES_TOUSER = `${BASE_URL}/api/messages/`;

export const USERS = `${BASE_URL}/api/users`;
