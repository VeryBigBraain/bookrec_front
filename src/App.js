import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import Header from './components/Header/Header'
import PrivateRoute from './utils/PrivateRoute/PrivateRoute'
import Registration from './pages/Registration/Registration';
import NotAuth from './utils/RouteWrappers/NotAuth';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route element={<PrivateRoute />} path="/" exact >
              <Route element={<HomePage />} index />
            </Route>
            <Route element={<NotAuth />}>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<Registration />} path="/registration" />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
