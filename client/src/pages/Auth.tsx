import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth: FC = () => {
    return (
        <div>
            <h1 className='form__title'>Пройти</h1>
            <Link className='button' to={LOGIN_ROUTE}>Авторизацию</Link>
            <Link className='button' to={REGISTRATION_ROUTE}>Регистрацию</Link>
        </div>
    );
};

export default Auth;