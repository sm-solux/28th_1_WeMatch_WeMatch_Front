import styles from './Modal.module.css';
// 회원가입 모달
  const Modal = ({
    onClose,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleCreateAccount,
  }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
      <div className={styles.niceToMeet}>Nice to meet You!</div>
        <div className={styles.closeButton} onClick={onClose}>
          X
        </div>
        <div className={styles.inputContainer}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요."
          className={styles.infoInput}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요."
          className={styles.infoInput}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          className={styles.infoInput}
        />

        </div>
        <div className={styles.helpKey}>
          <p>username</p>
          <p>email</p>
          <p>password</p>
        </div>

        <div className={styles.createAccount}>
        <button onClick={handleCreateAccount} >Create Account</button> 
        </div>
        </div>
    </div>
  );
};

export default Modal;