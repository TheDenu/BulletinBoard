import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/api";



export function CustomNav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
      const response = await logout();

      if (response.status === 204) {
        localStorage.removeItem('token');
        navigate('/authorization');
      } else {
        throw new Error('Не удалось выполнить выход');
      }
  };

  return (
    <>
      <Link to='/registration' className="nav-link">Регистрация</Link>
      <Link to='/authorization' className="nav-link">Авторизация</Link>
      <Link to='/advertisement' className="nav-link">Объявления</Link>
      <Link to='/account' className="nav-link">Аккаунт</Link>
      <Link onClick={handleLogout} className="nav-link">
        Выход
      </Link>
    </>
  );
}
