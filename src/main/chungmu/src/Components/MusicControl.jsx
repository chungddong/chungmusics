import React, { useState, useEffect } from "react";
import {
  TbPlayerTrackPrevFilled, TbPlayerPlayFilled, TbPlayerPauseFilled,
  TbPlayerTrackNextFilled, TbHeart, TbRepeat, TbPlaylist
} from "react-icons/tb";
import RangeBar from './RangeBar';
import useStore from '../js/store';
import '../css/MusicControl.css';

function MusicControl() {
  const { currentPlayUrl, togglePlaylist, currentPlaylist, currentPlayTrackNum } = useStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = document.getElementById('globalAudio');

  

  const [isChangingSong, setIsChangingSong] = useState(false);

  useEffect(() => {
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleEnded = () => nextSong();

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);
    

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (currentPlayUrl) {
        try {
          // 기존 재생 중지 및 초기화
          await audioElement.pause();
          audioElement.currentTime = 0;
  
          // 새 소스 설정 및 로드
          audioElement.src = currentPlayUrl;
          await audioElement.load();
  
          // 재생 시도
          await audioElement.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error playing audio :", error);
          setIsPlaying(false);
        }
      }
    };

    playAudio();
  }, [currentPlayUrl]);

  // seek바 변동 이벤트
  const handleRangeBarChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioElement.currentTime = newTime;
  };

  // 음악 재생-플레이 기능
  const togglePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying); // 재생 상태 토글
  };

  const prevSong = () => {
    
  }
  

  const nextSong = () => {
    console.log("다음곡으로 넘어가야함");
    console.log("현재 트랙 NUM : " + currentPlayTrackNum);
    console.log("현재 재생목록 ID : " + currentPlaylist);

    
    
  }

  //테스트용
  const handleTestClick = () => {
    console.log("클릭");

  };



  return (
    <div className="MusicControl">
      <div className="PlayBar">
        <div className="RangeBarBox">
          <RangeBar
            max={duration}
            value={currentTime}
            onChange={handleRangeBarChange}
          />
        </div>
      </div>
      <div className="PlayControl">
        <div className="top">

          <div className="button">
            <TbPlayerTrackPrevFilled className="trackBtn" size={40} />
          </div>


          <div className="button">
            {isPlaying ? (
              <TbPlayerPauseFilled className="trackBtn" size={40} onClick={togglePlayPause} />
            ) : (
              <TbPlayerPlayFilled className="trackBtn" size={40} onClick={togglePlayPause} />
            )}
          </div>

          <div className="button">
            <TbPlayerTrackNextFilled className="trackBtn" size={40} />
          </div>

        </div >
        <div className="bottom">

          <div className="button">
            <TbPlaylist className="trackBtn" size={40} onClick={togglePlaylist} />
          </div>

          <div className="button">
            <TbHeart className="trackBtn" size={40} />
          </div>

          <div className="button">
            <TbRepeat className="trackBtn" size={40} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default MusicControl;
