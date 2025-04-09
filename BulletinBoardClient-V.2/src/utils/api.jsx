const host = 'http://127.0.0.1:8000/api';

export const registration = async (formData) => {
    const response = await fetch(`${host}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        })
    });

    return response;
};

export const authorization = async (formData) => {
    const response = await fetch(`${host}/authorization`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        })
    });

    return response;
};


export const logout = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${host}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        },
    });

    const data = await response.json();
    return data;
};

export const loadAd = async () => {

    const response = await fetch(`${host}/advertisements`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    const data = await response.json();
    return data;
};

export const deleteAd = async id => {
    const token = localStorage.getItem('token')
    const response = await fetch(
        `${host}/advertisements/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    )

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error('Ошибка при удалении миссии')
    }

    if (response.status !== 204) {
        return await response.json();
    } else {
        return null;
    }
}
