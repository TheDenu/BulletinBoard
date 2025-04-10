import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from './Components/Header/Header';

import { Authorization } from './Pages/Authorization/Authorization';
import { Registration } from './Pages/Registration/Registration';
import { Advertisement } from './Pages/Advertisement/Advertisement';
import { Account } from './Pages/Account/Account';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="*" element={<h1>Страница не найдена</h1>} />
        <Route path='/' element={<Navigate to='/advertisement' />} />
        <Route path='/authorization' element={<Authorization />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/advertisement' element={<Advertisement />} />
        <Route path='/account' element={<Account />} />
        <Route path='/account/update' element={<Account />} />
      </Routes>
    </Router>
  )
}

export default App
