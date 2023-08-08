import { useState } from 'react';
import Modal from './Modal';
import styles from './NewAccount.module.css';

const NewAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 추가
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateAccount = () => {
    // 서버로 회원가입 정보 전송
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버에서 처리 결과에 따른 메시지 표시
        if (data.success) {
          setSuccessMessage('Successfully created your account');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to create an account');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error('Account does not exist.', error);
        } else {
          console.error('서버와의 연결에 문제가 있습니다.', error);
        }
        
      });

      handleCloseModal();
  };

  return (
    <div>
      {successMessage && <p className={styles.successText}>{successMessage}</p>}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

      <div className={styles.ask_new}>
        아직 회원이 아니신가요?{' '}
        <span className={styles.span} onClick={handleOpenModal}>
          회원가입
        </span>
      </div>
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleCreateAccount={handleCreateAccount}
        />
      )}
    </div>
  );
};

export default NewAccount;