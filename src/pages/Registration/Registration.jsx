import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './Registration.module.css';


const regex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g;

const Registration = () => {
  let {loginUser} = useContext(AuthContext)

    const schema = yup.object({
      name: yup.string().required('Введите логин!'),
      email: yup.string().required('Обязательное поле!'),
      password: yup.string().required('Введите новый пароль!'),
      password_repeat: yup.string()
        .required('Повторите новый пароль')
        .matches(regex,
            ' - Пароль должен содержать не менее 8 символов \n - Прописные и строчные буквы \n - Хотя бы одну цифру'
        )
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    }).required();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({resolver: yupResolver(schema)});

    async function send(formData) {
      const response = await fetch('http://127.0.0.1:8000/create_user/', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        const result = await response.json()
        console.log(result);

        loginUser({
          email: formData.email,
          password: formData.password
        })
      } else {
        console.log(response.status);
      }
    }

    const onSubmit = (formData) => {
      send({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }

    return (
      <div>
        <form className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className={styles.form__head}>
              <h3>
                Регистрация
              </h3>
            </div>
            <div className={styles.inputs}>
              <label htmlFor="name">Логин</label>
              <div className={styles.input__container}>
                <input id="name" name="name" {...register("name")} />
                <p className={styles.error}>{errors.name?.message}</p>
              </div >

              <label htmlFor="email">Email</label>
              <div className={styles.input__container}>
                <input id="email" name="email" {...register("email")} />
                <p className={styles.error}>{errors.email?.message}</p>
              </div >

              <label htmlFor="password">Пароль</label>
              <div className={styles.input__container}>
                <input id="password" type="password" name="password" {...register("password")} />
                <p className={styles.error}>{errors.password?.message}</p>
              </div>

              <label htmlFor="password_repeat">Подтверждение пароля</label>
              <div className={styles.input__container}>
                <input id="password_repeat" type="password" name="password_repeat" {...register("password_repeat")} />
                <p className={styles.error}>{errors.password_repeat?.message}</p>
              </div>
            </div>

            <input className={styles.input__submit_btn} type="submit"/>
        </form>
    </div>
    )
}

export default Registration;
