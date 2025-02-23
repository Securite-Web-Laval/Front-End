import Cookies from 'js-cookie';

const API_URL = 'https://back-end-uhlyzq.fly.dev';

interface User {
    username: string,
    password: string,
    email: string,
}

export const getAccessToken = () => {
    return Cookies.get('access_token');
};

export const userGet = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const result = await response.json();
            throw (`${result.message}`);
        }
        return await response.json();
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const userGetOne = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const result = await response.json();
            throw (`${result.message}`);
        }
        return await response.json();
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const userPut = async (endpoint: string, token: string, data: Partial<User>) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const result = await response.json();
            throw (`${result.message}`);
        }
        return await response.json();
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const userDelete = async (endpoint: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const result = await response.json();
            throw (`${result.message}`);
        }
        return await response.json();
    } catch (error) {
        // handleError(error);
        throw error;
    }
};