import React from 'react';
import "../css/MusicPlayer.css";
import MusicControl from "../Components/MusicControl";
import { TbArrowBarToRight, TbMenu2, TbChevronDown  } from "react-icons/tb";
import useStore from '../js/store';

function MusicPlayer() {
  const { selectedTrack, showMPlayer, isOpenPlaylist, togglePlaylist } = useStore();

  return (
    <div className="MusicPlayer">
      <div className="PlayerContainer" style={{ display: isOpenPlaylist ? 'none' : 'block' }}>
        <div className='playerHeader'>
          <div className="HeaderBtn">
            <TbArrowBarToRight className='rightarrowBtn' size={35} onClick={() => showMPlayer('none')} />
            <TbMenu2 className='menuBtn' size={35} />
          </div>
        </div>
        <div className='MainBox'>
          <div className='AlbumBox'>
            <div className='ThumbNail'>
              {selectedTrack && <img src={selectedTrack.thumbUrl} alt="thumbnail" />}
            </div>
            <div className="AlbumInfoBox">
              <div className='AlbumName'>
                {selectedTrack ? selectedTrack.title : "대충 노래 제목 공간입니다"}
              </div>
              <div className='AlbumArtist'>
                {selectedTrack ? selectedTrack.author : "대충 가수 이름"}
              </div>
            </div>
          </div>
          <div className='ControlBox'>
            <MusicControl />
          </div>
        </div>
      </div>
      <div className="PlayListModal" style={{ display: isOpenPlaylist ? 'block' : 'none' }}>
        <div className="playlistContent">

          <div className="playlistHeader">

            <h1>Playlist</h1>
            <TbChevronDown className='playlistBtn' onClick={togglePlaylist} size={40}/>

          </div>



        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
