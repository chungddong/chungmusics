import React, { useState, useEffect } from "react";
import {
  TbPlayerTrackPrevFilled, TbPlayerPlayFilled, TbPlayerPauseFilled,
  TbPlayerTrackNextFilled, TbHeart, TbRepeat, TbPlaylist
} from "react-icons/tb";
import RangeBar from './RangeBar';
import useStore from '../js/store';
import '../css/MusicControl.css';

function MusicControl() {
  const { currentPlayUrl, togglePlaylist } = useStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = document.getElementById('globalAudio');

  useEffect(() => {
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (currentPlayUrl) {
        audioElement.pause(); // 기존 오디오 일시 정지
        audioElement.currentTime = 0; // 오디오 재생 시간 초기화
        audioElement.src = currentPlayUrl; // 새로운 오디오 소스 설정
        audioElement.load(); // 오디오 로드
        setIsPlaying(true);
        try {
          await audioElement.play(); // 새로운 오디오 재생
          setIsPlaying(true); // 재생 상태로 설정
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    };

    playAudio();
  }, [currentPlayUrl]);

  const handleRangeBarChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioElement.currentTime = newTime;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying); // 재생 상태 토글
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
              <TbPlayerPauseFilled className="trackBtn" size={40} onClick={togglePlayPause}/>
            ) : (
              <TbPlayerPlayFilled className="trackBtn" size={40} onClick={togglePlayPause}/>
            )}
          </div>

          <div className="button">
            <TbPlayerTrackNextFilled className="trackBtn" size={40} />
          </div>

        </div >
        <div className="bottom">

          <div className="button">
            <TbPlaylist className="trackBtn" size={40} onClick={togglePlaylist}/>
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
