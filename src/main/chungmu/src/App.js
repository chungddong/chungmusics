import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { BiSolidHome } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidPlaylist } from "react-icons/bi";
import { TbPlayerPlayFilled } from "react-icons/tb";

import './App.css';
import "./css/MusicControl.css";
import Home from './Pages/Home';
import Search from './Pages/Search';
import Playlist from './Pages/Playlist';
import Login from './Pages/Login';
import MusicPlayer from './Components/MusicPlayer';
import PrivateRoute from './Components/PrivateRoute';
import axios from 'axios';
import useStore from './js/store';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 세션 체크 중인지 여부를 확인하기 위한 상태

  const { selectedTrack } = useStore();
  


  useEffect(() => {
    checkSession(); // 컴포넌트가 마운트될 때 세션 체크를 시작

    const handleResize = () => {
      const playerBox = document.querySelector('.PlayerBox');
      if (window.innerWidth >= 800) {
        playerBox.style.display = 'flex';
      } else {
        playerBox.style.display = 'none'; // 기본 display 설정
      }
    };
  
    window.addEventListener('resize', handleResize);
    
    // 초기 실행 시 현재 크기 체크
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get('/api/checkSession', { withCredentials: true });
      setIsLoggedIn(response.data === 'Session is active');
    } catch (error) {
      console.error('Error checking session', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false); // 세션 체크 완료

    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 세션 체크 중이면 로딩 표시
  }

  return (
    <BrowserRouter>
      <div className={`App ${isLoggedIn ? '' : 'logged-out'}`}>
        {isLoggedIn && (
          <div className="NavBar">
            <NavButtons />
          </div>
        )}

        <div className="ViewBox">
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
            <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Playlist" element={<Playlist />} />
            </Route>
          </Routes>
        </div>

        {isLoggedIn && (
          <>
            <div className="PlayerBox">
              <MusicPlayer />
            </div>


            <div className="M_PlayerBar" onClick={() => document.querySelector('.PlayerBox').style.display = 'flex'}>
              <MPlayerBar selectedTrack={selectedTrack}/>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

function NavButtons() {
  const navigate = useNavigate();

  return (
    <>
      <div className="NavBtn" id='topNav' onClick={() => navigate("/Home")}>
        <BiSolidHome size={23} />
        Home
      </div>
      <div className="NavBtn" onClick={() => navigate("/Search")}>
        <BiSearchAlt2 size={23} />
        Search
      </div>
      <div className="NavBtn" onClick={() => navigate("/Playlist")}>
        <BiSolidPlaylist size={23} />
        Playlist
      </div>
    </>
  );
}

function MPlayerBar({ selectedTrack }) {
  if (!selectedTrack) {
    return null; // selectedTrack가 null이거나 비어 있으면 아무 것도 렌더링하지 않음
  }

  return (
    <div className='MPlayerBar'>
      <div className='MPlayerLeftBox'>
        <div className='MplayerThumb'>
          {selectedTrack && <img src={selectedTrack.thumbUrl} alt="thumbnail" />}
        </div>
        <div className='MplayerInfoBox'>
          <div className='MplayerTitle'>
            {selectedTrack ? selectedTrack.title : "대충 노래 제목 공간입니다"}
          </div>
          
          <div className='MplayerArtist'>
            {selectedTrack ? selectedTrack.author : "대충 가수 이름"}
          </div>
        </div>
      </div>
      <div className='MPlayerRightBox'>
        <TbPlayerPlayFilled size={40} />
      </div>
    </div>
  );
}


export default App;


