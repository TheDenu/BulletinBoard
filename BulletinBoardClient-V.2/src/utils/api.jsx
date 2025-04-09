const host = 'http://127.0.0.1:8000/api';

export const logout = async () => {
    try {
        const token = localStorage.getItem('token'); 

        const response = await fetch(`${host}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Ошибка при выходе');
        }

        return response;
    } catch (err) {
        throw new Error('Ошибка при выходе: ' + err.message);
    }
};

export const loadAd = async () => {
    const sort = localStorage.getItem('sort') || 'desc';
    const field = localStorage.getItem('field') || 'created_at';

    const params = new URLSearchParams({
        sort: sort,
        field: field,
    });

    try {
        const response = await fetch('/api/ads?' + params.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при загрузке объявлений');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
};

export const deleteAd = async id => {
    try {
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
    } catch (err) {
        throw new Error(err.message)
    }
}
