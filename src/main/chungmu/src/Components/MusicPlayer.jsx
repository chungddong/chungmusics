import React, { useState } from "react";
import axios from "axios";
import "../css/MusicPlayer.css";
import MusicControl from "../Components/MusicControl";
import { TbArrowBarToRight, TbMenu2, TbChevronDown } from "react-icons/tb";
import useStore from '../js/store';
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

function MusicPlayer() {
  //TODO : 내일 플레이리스트 목록 가져와서 보여주기 해야함
  const { selectedTrack, showMPlayer, isOpenPlaylist, togglePlaylist } = useStore();
  const [results, setResults] = useState([]);

  const { setSelectedTrack, setCurrentPlayUrl } = useStore();
  const { addPlaylistTrack, setAddPlaylistTrack } = useStore();
  const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);

  const handleListItemClick = async (track) => {
    setSelectedTrack(track);
    try {
      const response = await axios.post('http://studyswh.synology.me:32599/get-audio-url', { videoUrl: track.videoUrl });
      setCurrentPlayUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Error fetching track info", error);
    }
  };

  const handleAddPlaylistClick = (track) => {
    setAddPlaylistTrack(track);
    setIsAddPlaylistOpen(true); // 다이얼로그 열기
  };

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
            <TbChevronDown className='playlistBtn' onClick={togglePlaylist} size={40} />


            <div className="ListContainer">
              {results.map((item, index) => (
                <ListItem
                  key={index}
                  item={item}
                  onClick={() => handleListItemClick(item)}
                  onAddPlaylistClick={() => handleAddPlaylistClick(item)}
                />
              ))}
            </div>

          </div>




        </div>
      </div>
    </div>
  );
}

function ListItem({ item, onClick, onAddPlaylistClick }) {
  return (
    <div className="ListItem" >
      <div className="thumbnailbox">
        <img src={item.thumbUrl} alt="thumbnail" />
      </div>
      <div className="infobox">
        <div className="MusicTitle">
          {item.title}
        </div>
        <div className="MusicArtist">
          {item.author}
        </div>
      </div>
      <div className="listbtn">
        <MdOutlinePlaylistAdd size={30} className="btns" onClick={onAddPlaylistClick} />
        <IoPlay size={30} className="btns" onClick={onClick} />
      </div>
    </div>
  );
}

export default MusicPlayer;
