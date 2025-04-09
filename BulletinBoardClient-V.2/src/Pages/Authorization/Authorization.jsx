import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authorization } from '../../utils/api';

export function Authorization() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Введите почту';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Некорректная почта';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Введите пароль';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await authorization(formData)
            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                navigate('/advertisement');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <>
            <main className="container d-flex justify-content-center align-items-center registration" style={{ height: '90vh' }}>
                <div className="card shadow p-4" style={{ width: '400px' }}>
                    <h2 className="text-center mb-4">Авторизация</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Почта</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Введите почту"
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Введите пароль"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Авторизоваться
                        </button>

                        <div className="text-center mt-3">
                            <Link to="/registration" className="btn btn-outline-secondary w-100">
                                Нет аккаунта? Зарегистрируй!
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}