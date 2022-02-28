import { useState, FC, useContext } from 'react'
import { Context } from '../index';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const { randomPassword } = require('custom-password-generator');


const Form: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true);};
    const { store } = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const eye = <FontAwesomeIcon icon={faEye} />;
    const pass = randomPassword();

    return (
        <div className='form'>
            <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
            {isLogin ?
                <></>
                :
                <input
                    type="username"
                    placeholder='Имя пользователя'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            }
            <input
                type="email"
                value={email}
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    style={{position: 'relative'}}
                    type={passwordShown ? "text" : "password"}
                    placeholder='Пароль'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <i style={{position: 'absolute', right: 215, height: 9, cursor: 'pointer'}} onClick={togglePasswordVisiblity}>{eye}</i>
                {isLogin ?
                    <></>
                    :
                    <>
                        <button
                            className='button'
                            style={{ minWidth: 150, maxWidth: 'none', marginLeft: 10, background: '#9acd32' }}
                            onClick={() => setPassword(pass)}
                        >Генерация пароля</button>
                    </>
                }
            </div>
            {isLogin ?
                <button className='button' onClick={() => store.login(email, password)}>Логин</button>
                :
                <button className='button' onClick={() => store.registration(email, password, username)}>Регистрация</button>
            }
        </div>
    );
};

export { Form };