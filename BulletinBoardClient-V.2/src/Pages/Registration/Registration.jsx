import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    checkPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim() || !/^[а-яА-Яa-zA-Z]+$/.test(formData.name.trim())) {
      newErrors.name = 'Имя должно состоять только из букв';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите почту';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Некорректная почта';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Введите номер телефона';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    } else if (/\s/.test(formData.password)) {
      newErrors.password = 'В пароле не должно быть пробелов';
    } else if (
      !/[a-z]/.test(formData.password) ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[^a-zA-Z0-9]/.test(formData.password)
    ) {
      newErrors.password = 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол';
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
      try {
        const response = await fetch('http://127.0.0.1:8000/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone_number: formData.phoneNumber,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Регистрация успешна!');
          navigate('/authorization');
        } else {
          alert(data.message || 'Ошибка регистрации');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        alert('Ошибка сети');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <>
      <main className="container d-flex justify-content-center align-items-center registration">
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
              <label className="form-label">Номер телефона</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Введите номер телефона"
              />
              {errors.phoneNumber && (
                <div className="invalid-feedback">{errors.phoneNumber}</div>
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
    </>
  );
}
