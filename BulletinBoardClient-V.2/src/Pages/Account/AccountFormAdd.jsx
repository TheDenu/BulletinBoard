import React, { useState } from 'react';
import { createAd } from '../../utils/api';

function AccountFormAdd() {
    const [errors, setErrors] = useState({});
    const [formDataState, setFormDataState] = useState({
        name: '',
        description: '',
        price: '',
        images: [],
    });
    const [message, setMessage] = useState('');

    const validate = () => {
        let newErrors = {};

        if (!formDataState.name.trim()) {
            newErrors.name = 'Введите название';
        }

        if (!formDataState.description.trim()) {
            newErrors.description = 'Введите описание';
        }

        if (!formDataState.price.trim() || isNaN(formDataState.price)) {
            newErrors.price = 'Введите цену';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append('name', formDataState.name);
            formData.append('description', formDataState.description);
            formData.append('price', formDataState.price);
            for (let i = 0; i < formDataState.images.length; i++) {
                formData.append('images[]', formDataState.images[i]);
            }

            const response = await createAd(formData);

            if (response.status === 201) {
                onAdCreated(); // Вызов функции для перехода на вкладку "Мои объявления"
            } else {
                setMessage('Ошибка при добавлении объявления');
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormDataState({ ...formDataState, images: e.target.files });
        } else {
            setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
        }
        setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название объявления:</label>
                <input type="text" className="form-control" id="name" name='name' value={formDataState.name} onChange={handleChange} placeholder="Введите название" required />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание:</label>
                <textarea className="form-control" id="description" name='description' value={formDataState.description} onChange={handleChange} rows="5" placeholder="Введите описание" required></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="price">Цена:</label>
                <input type="number" className="form-control" id="price" name='price' value={formDataState.price} onChange={handleChange} placeholder="Введите цену" required />
            </div>
            <div className="form-group">
                <label htmlFor="images">Фотографии:</label>
                <input type="file" className="form-control" id="images" multiple onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Добавить объявление</button>
            {message && <p className="mt-2">{message}</p>}
        </form>
    );
};

export default AccountFormAdd;
