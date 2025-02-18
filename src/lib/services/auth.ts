import Cookies from 'js-cookie';

const API_URL = 'https://back-end-uhlyzq.fly.dev';

interface Login {
    username: string,
    password: string
}

interface Register {
    username: string,
    password: string,
    email: string,
}

const handleError = (error: any) => {
    console.error('Une erreur est survenue:', error);
};

export const register = async (endpoint: string, data: Register) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

export const login = async (endpoint: string, data: Login) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const result = await response.json();
            throw (`${result.message}`);
        }
        const result = await response.json();
        Cookies.set('access_token', result.access_token, { expires: 1 });
        localStorage.setItem('id', result.id);
        return result;
    } catch (error) {
        // handleError(error);
        throw error;
    }
};

export const logout = () => {
    Cookies.remove('access_token');
    localStorage.removeItem('id');
};
