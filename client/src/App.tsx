import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth';
import { Form } from './components/Form';
import './style.css'
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import { IUser } from './models/IUser';


const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([]);
  const [list, setList] = useState(true);
  const toggleListShow = () => {setList(list ? false : true)};

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
      toggleListShow();
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return (
      <div className='pure'>
        <div className="lds-dual-ring"></div>
        <h1 className='notification'>Загрузка...</h1>
      </div>
    )
  }

  if (!store.isAuth) {
    return (
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/login' element={<Form />} />
        <Route path='/registration' element={<Form />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      <h1 className='notification'>{store.isAuth ? `Пользователь авторизован, имя пользователя: ${store.user.username}` : 'Авторизуйтесь'}</h1>
      <div className='form__title'>{store.user.isActivated ? 'Аккаунт подтвержден' : <div style={{ background: '#ff6666', padding: 5, maxWidth: 300, margin: 'auto' }}>Подтвердите аккаунт!</div>}</div>
      <button className='button' onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers} className='button' style={{ background: '#2f353b' }}>Список пользователей</button>
      </div>
      {users.map(user =>
        <div key={user.email} style={list ?{display: 'block', margin: 15, background: '#2f353b', color: 'white', padding: 10, borderRadius: 5 }: {display: 'none'}}>
          <div>{user.email}</div>
          <div>{user.username}</div>
        </div>
      )}
    </div>
  );
}

export default observer(App);
