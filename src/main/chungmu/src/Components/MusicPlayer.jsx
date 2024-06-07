import React, { useState, useEffect  } from 'react';
import "../css/MusicPlayer.css";
import MusicControl from "../Components/MusicControl";

import { TbArrowBarToRight } from "react-icons/tb";
import { TbMenu2 } from "react-icons/tb";
import useStore from '../js/store';

function MusicPlayer() {
  const showMPlayer = useStore((state) => state.showMPlayer);

  



  return (
    <div className="MusicPlayer">
      <div className='plyaerHeader'>
        <div className="HeaderBtn">
          <TbArrowBarToRight className='rightarrowBtn' size={35} onClick={() => showMPlayer('none')} />
          <TbMenu2 className='menuBtn' size={35} />
        </div>
      </div>
      <div className='MainBox'>
        <div className='AlbumBox'>
          <div className='ThumbNail'>
          </div>
          <div className="AlbumInfoBox">
            <div className='AlbumName'>
              대충 노래 제목 공간입니다
            </div>
            <div className='AlbumArtist'>
              대충 가수 이름
            </div>
          </div>
        </div>
        <div className='ControlBox'>
          <MusicControl />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
