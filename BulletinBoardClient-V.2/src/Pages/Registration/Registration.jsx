import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registration } from '../../utils/api';

export function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Введите почту';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Введите пароль';
    }
    if (formData.password !== formData.checkPassword) {
      newErrors.checkPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await registration(formData);

      const data = await response.json();
      if (response.status === 201) {
        navigate('/authorization');
      }
      setErrors(data.error.errors)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <main className="container d-flex justify-content-center align-items-center registration" style={{ height: '90vh' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Имя пользователя</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите имя"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

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

          <div className="mb-3">
            <label className="form-label">Подтвердите пароль</label>
            <input
              type="password"
              name="checkPassword"
              className={`form-control ${errors.checkPassword ? 'is-invalid' : ''}`}
              value={formData.checkPassword}
              onChange={handleChange}
              placeholder="Введите пароль"
            />
            {errors.checkPassword && (
              <div className="invalid-feedback">{errors.checkPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Зарегистрироваться
          </button>

          <div className="text-center mt-3">
            <Link to="/authorization" className="btn btn-outline-secondary w-100">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
