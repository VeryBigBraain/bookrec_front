import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import styles from './Header.module.css';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <div className={styles.header}>
      <nav className={styles.header__navigation}>
        <li className={styles.header__link}>
          <Link to="/">Главная</Link>
        </li>
      </nav>

      <div className={styles.auth}>
        {user ?
          <p className={styles.auth__logout} onClick={logoutUser}>Logout</p>
          :
          <div className={styles.auth__links}>
            <Link to="/login">Вход</Link>
            <span>/</span>
            <Link to="/registration">Регистрация</Link>
          </div>
        }
      </div>



        {/* {user && <p>Hello {user.email}</p>} */}
    </div>
  )
}

export default Header
