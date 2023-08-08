import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Header.module.css';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('login-token');

    useEffect(() => {
      if (token) {
        axios.post(
          'https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/login',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        )
          .then(response => {
            const data = response.data;
            const memberId = data.memberId;
            const teamId = data.teamId;
    
            // Now you can do something with memberId and teamId
          })
          .catch(error => {
            console.error('Error fetching memberId and teamId:', error);
          });
      } else {
        console.error('Login token not found in local storage');
      }
    }, [token]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTeamName('');
  };

  const openInviteModal = () => {
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
    setEmail('');
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      const token = localStorage.getItem('login-token');
      if (!token) {
        console.error('Login token not found in local storage');
        return;
      }
  
      const responser = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/login', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      const memberId = responser.data.memberId;

      const createTeamResponse = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/create-team', {
        teamName,
        memberId,
      });

      if (createTeamResponse.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error('팀 만들기 에러:', error);
    }
  };

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem('login-token');
      if (!token) {
        console.error('Login token not found in local storage');
        return;
      }
  
      const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/login', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      const memberId = response.data.memberId;
      const teamId = response.data.teamId;
  
      const inviteResponse = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/invite', {
        email,
        memberId,
        teamId,
      });
  
      if (inviteResponse.status === 200) {
        closeInviteModal();
      }
    } catch (error) {
      console.error('멤버 초대에 실패했습니다:', error);
    }
  };
  

  const handleLoadSchedule = async () => {
    const token = localStorage.getItem('login-token');
      if (!token) {
        console.error('Login token not found in local storage');
        return;
      }
  
      const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/auth/login', {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      const groupId = response.data.groupId;
      
    try {
      const response = await axios.get('https://cors-anywhere.herokuapp.com/http://13.124.181.169:8080/team/info', {
        params: {
          groupId
        },
      });
      
      if (response.status === 200) {
        console.log('일정 정보:', response.data); // 일정 정보를 콘솔에 출력합니다
      }
    } catch (error) {
      console.error('일정 불러오기 에러:', error);
    }
  };

  return ( 
    <>
    <header>
         
          <button className={styles.dropbtn} onClick={toggleDropdown}>profile</button>
            <button onClick={openModal} >그룹 생성하기</button>
            <button onClick={openInviteModal} >모임 초대하기</button>
        
        <button onClick={handleLoadSchedule} className={styles.bringit}>팀 일정 불러오기</button>
      </header>

    {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <input
              type="text"
              placeholder="팀 이름"
              value={teamName}
              onChange={handleTeamNameChange}
            />
            <button onClick={handleCreateTeam}>모임 생성</button>
          </div>
        </div>
      )}

    {inviteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleInvite}>초대하기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;