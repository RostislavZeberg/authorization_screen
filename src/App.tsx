import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from './components/LogIn'
import { Logo } from './components/Logo'
import { GetNew } from './components/GetNew';
import { SuccessMessage } from './components/SuccessMessage'; 
import { toggleIsModalOpen } from './store/slices/isModalOpen';
import { ArrowLeft } from './components/ArrowLeft';
import type { RootState } from './store/store';
import './App.scss'

function App() {
  const dispatch = useDispatch();
  const [show2FA, setShow2FA] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false); 
  const isModalOpen = useSelector((state: RootState) => state.isModalOpen.isModalOpen);

  const handleArrowClick = () => {
    dispatch(toggleIsModalOpen());
    setShow2FA(false);
    setShowSuccess(false); // Сбрасываем успешное сообщение
  };

  const handleLoginSuccess = (requires2FA: boolean) => {
    if (requires2FA) {
      setShow2FA(true);
    } else {
      // Успешный вход без 2FA
      console.log('Login successful!');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Здесь можно добавить редирект или другие действия
      }, 3000);
    }
  };

  const handle2FASuccess = () => {
    // Успешная верификация 2FA
    console.log('2FA verification successful!');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Здесь можно добавить редирект или другие действия
    }, 3000);
  };

  return (
    <div className='module'>
      {!isModalOpen && (
        <ArrowLeft
          onClick={handleArrowClick}
        />
      )}
      <Logo />
      
      {/* Показываем сообщение об успехе */}
      {showSuccess ? (
        <SuccessMessage />
      ) : (
        /* Показываем формы аутентификации */
        show2FA ? (
          <GetNew
            onSuccess={handle2FASuccess}
          />
        ) : (
          <LogIn onSuccess={handleLoginSuccess} />
        )
      )}
    </div>
  )
}

export default App