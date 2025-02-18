import Cookies from 'js-cookie';

const API_URL = 'https://back-end-uhlyzq.fly.dev';

interface Ingredient {
    nom: string,
    quantite: number,
    unite: string,
}

interface Like {
    total: number,
    users: string[],
}

interface Comment {
    user: string,
    note: number,
    description: string,
}

interface Dish {
    nom : string,
    ingredients: Ingredient[],
    user: string,
    like?: Like,
    comments?: [Comment],
}

export const getAccessToken = () => {
    return Cookies.get('access_token');
};

export const dishPost = async (endpoint: string, data: Dish) => {
    const token = getAccessToken();
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

export const dishGet = async (endpoint: string) => {
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

export const dishGetOne = async (endpoint: string) => {
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

export const dishPut = async (endpoint: string, data: Dish) => {
    const token = getAccessToken();
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

export const dishDelete = async (endpoint: string) => {
    const token = getAccessToken();
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
