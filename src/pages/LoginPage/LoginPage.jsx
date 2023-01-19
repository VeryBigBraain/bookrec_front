import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './LoginPage.module.css';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)

  const schema = yup.object({
    email: yup.string().required('Обязательное поле!'),
    password: yup.string().required('Введите пароль!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)});

  const onSubmit = (formData) => {
    loginUser(formData);
  }

  return (
    <div>
        <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className={styles.form__head}>
              <h3>
                Вход
              </h3>
            </div>
            <div className={styles.inputs}>

              <label htmlFor="email">Email</label>
              <div className={styles.input__container}>
                <input id="email" name="email" {...register("email")} />
                <p className={styles.error}>{errors.email?.message}</p>
              </div >

              <label htmlFor="password">Пароль</label>
              <div className={styles.input__container}>
                <input type="password" id="password" {...register("password")} />
                <p className={styles.error}>{errors.password?.message}</p>
              </div>
            </div>

            <input className={styles.input__submit_btn} type="submit"/>
        </form>
    </div>
  )
}

export default LoginPage;
