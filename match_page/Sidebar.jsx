import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import LastModal from './LastModal';

function Sidebar() {
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showMinuteModal, setShowMinuteModal] = useState(false);
  const [sleepStart, setSleepStart] = useState('');
  const [sleepEnd, setSleepEnd] = useState('');
  const [minuteToRemove, setMinuteToRemove] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSleepModalOpen = () => {
    setShowSleepModal(true);
  };

  const handleSleepModalClose = () => {
    setShowSleepModal(false);
  };

  const handleMinuteModalOpen = () => {
    setShowMinuteModal(true);
  };

  const handleMinuteModalClose = () => {
    setShowMinuteModal(false);
  };

  const handleSleepSubmit = () => {
    const data = { startAt: sleepStart, endAt: sleepEnd };
    

  axios.patch(`https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/team/sleep?groupId=${groupId}`, data) 
    .then(response => {
      console.log('groupId:', response.data);
    })
    .catch(error => {
      console.error('Error updating sleep time:', error);
    });

    axios.patch('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/team/sleep', data)
      .then(response => {
        console.log('Sleep time updated successfully:', response.data);

        handleSleepModalClose();
      })
      .catch(error => {
        console.error('Error updating sleep time:', error);
      });
  };

  const handleMinuteSubmit = () => {
    const minuteData = { minute: minuteToRemove };
    const groupId = 'groupID'; 

  axios.patch(`/team/sleep?groupId=${groupId}`, data)
    .then(response => {
      console.log('Sleep time updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating sleep time:', error);
    });

    axios.patch('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/team/minute', null, { params: minuteData })
      .then(response => {
        console.log('Minutes removed successfully:', response.data);

        handleMinuteModalClose();
      })

      .catch(error => {
        console.error('Error removing minutes:', error);
      });
  };

  const handleFetchEventData = () => {
    const weekNumber = moment(start).isoWeek();
    const year = moment(start).year();
    const groupId = 'groupId'; // groupId 값을 설정
    const params = { groupId, weekNumber, year };

    axios.get('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/team/candidateId', { params })
      .then(response => {
        const eventData = response.data;
        console.log('Fetched event data:', eventData);

        setEventData(eventData);
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  };

  const handleLastModalOpen = () => {
    setShowModal(true);
  };

  const handleLastModalClose = () => {
    setShowModal(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // 이벤트를 선택하면 상태에 저장
  };

  const handleCombinedSubmitM = () => {
    handleMinuteSubmit();
    handleMinuteModalClose(); };

  const handleCombinedSubmit = () => {
    handleSleepSubmit();
    handleSleepModalClose(); };


  return (
    <div className={styles.sidebar}>
        <div className={styles.div4}>
      <button onClick={handleSleepModalOpen}>수면 시간 제거</button>
      </div>
      <button onClick={handleMinuteModalOpen}>분 단위 시간 제거</button>
      <div className={styles.div2}>
      <button onClick={handleFetchEventData} className={styles.candid}>후보 보러가기</button>

      {eventData.map(event => (
      <div key={event.id} onClick={() => handleEventClick(event)}>
        <p>Start: {event.start}</p>
        <p>End: {event.end}</p>
      </div>
    ))}
      </div>
      <div className={styles.fixing}>
      <button onClick={handleLastModalOpen} className={styles.last}> 최종 일정 정하기 </button>
      </div>
      

      {showSleepModal && (
      <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span> 수면 시간(비활동시간) 을 입력해주세요</span>
          <button className={styles.closeButton} onClick={handleSleepModalClose}>×</button>
        </div>
        <div className={styles.modalContent}>
          <input
            type="text"
            placeholder="시작 시간"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
          />
          <input
            type="text"
            placeholder="입력 시간"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
          />
          <button onClick={handleCombinedSubmit}>확인</button>
        </div>
        </div>
        </div>
    )}

      {showMinuteModal && (
        <div className={styles.modalBackground}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <span> 제거할 시간단위를 '분'으로 입력해주세요 </span>
            <button className={styles.closeButton} onClick={handleMinuteModalClose}> x </button>
          </div>
          <div className={styles.modalContent}>
          <input
            type="number"
            placeholder="분"
            value={minuteToRemove}
            onChange={(e) => setMinuteToRemove(e.target.value)}
          />
          <button onClick={handleCombinedSubmitM}>확인</button>
        </div>
        </div>
        </div>
    )}

    {showModal && <LastModal
    onClose={handleLastModalClose}/>}

  </div>
); }

export default Sidebar;
