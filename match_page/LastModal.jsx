import React, { useState } from 'react';
import styles from './LastModal.module.css';
import axios from 'axios';

function LastModal({ onClose, selectedEvent}) {
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');

  const handleConfirm = () => {
    const data = { startAt, endAt }; // startAt와 endAt 데이터 객체 생성

  const params = { candidateId }; // candidateId를 쿼리스트링으로 설정

  axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/fix', data, { params })
     .then(response => {
       console.log('일정이 성공적으로 전송되었습니다.', response.data);
    })
     .catch(error => {
       console.error('일정 전송 중 오류가 발생했습니다.', error);
     });
  };

  const lastMixed =()=> {
    handleConfirm();
    onClose();
  }

  return (
    <div className={styles.modal}>
      <h2>일정을 입력하세요</h2>
      <div className={styles.selectedEventInfo}>
        {selectedEvent && (
            <>
          <p>Start: {selectedEvent.start}</p>
          <p>End: {selectedEvent.end}</p>
          </>
        )}
      </div>
      <input
        type="text"
        placeholder="시작 시간"
        value={startAt}
        onChange={(e) => setStartAt(e.target.value)}
      />
      <input
        type="text"
        placeholder="종료 시간"
        value={endAt}
        onChange={(e) => setEndAt(e.target.value)}
      />

      <button onClick={lastMixed}>일정 확정</button>
    </div>
  );
}

export default LastModal;
