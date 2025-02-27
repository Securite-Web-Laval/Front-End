import Cookies from 'js-cookie';

const API_URL = 'https://back-end-uhlyzq.fly.dev';

export interface Ingredient {
    nom: string,
    quantite: number,
    unite: string,
}

export interface Like {
    total: number,
    users: string[],
}

export interface Comment {
    user: string,
    note: number,
    description: string,
}

export interface Dish {
    nom: string,
    ingredients: Ingredient[],
    user: string,
    like?: Like,
    comments?: [Comment],
    _id: string,
}

export const getAccessToken = () => {
    return Cookies.get('access_token');
};

export const dishPost = async (endpoint: string, token: string, data: Dish) => {
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

export const dishPut = async (endpoint: string, token: string, data: Dish) => {
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

export const dishGetUser = async (endpoint: string) => {
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
}

export const dishDelete = async (endpoint: string, token: string) => {
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

export const dishLike = async (endpoint: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log("response like", response);
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

export const dishGetLiked = async (endpoint: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log("response liked", response);
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