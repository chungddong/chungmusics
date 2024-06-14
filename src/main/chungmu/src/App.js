import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { BiSolidHome } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidPlaylist } from "react-icons/bi";

import { TbPlayerPlayFilled } from "react-icons/tb";

import './App.css';
import "./css/MusicControl.css";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Playlist from "./Pages/Playlist";
import Login from "./Pages/Login";
import MusicPlayer from "./Components/MusicPlayer";
import useStore from './js/store';

function App() {
  const { M_PlayerBox, showMPlayer } = useStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        showMPlayer('none');
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="NavBar">
          <NavButtons />
        </div>
        <div className="ViewBox">
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Playlist" element={<Playlist />} />
          </Routes>
        </div>

        <div className="PlayerBox">
          <MusicPlayer />
        </div>

        <div className="M_PlayerBox" style={M_PlayerBox}>
          <MusicPlayer />
        </div>

        <div className="M_PlayerBar" onClick={() => showMPlayer('flex')}>
          <MPlayerBar />
        </div>
      </div>
    </BrowserRouter>
  );
}

function NavButtons() {
  const navigate = useNavigate();

  return (
    <>
      <div className="NavBtn" onClick={() => navigate("/Home")}>
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

function MPlayerBar() {
  return (
    <div className='MPlayerBar'>
      <div className='MPlayerLeftBox'>
        <div className='MplayerThumb'>
        </div>
        <div className='MplayerInfoBox'>
          <div className='MplayerTitle'>
            대충 노래 제목 공간입니다
          </div>
          <div className='MplayerArtist'>
            대충 가수 이름
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
