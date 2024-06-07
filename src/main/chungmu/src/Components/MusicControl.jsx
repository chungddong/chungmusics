import React, { useState, useRef, useEffect } from "react";
import { IoPlaySkipForwardSharp } from "react-icons/io5";

import RangeBar from './RangeBar';

import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

import { TbArrowsShuffle } from "react-icons/tb";
import { TbHeart } from "react-icons/tb"
import { TbRepeat } from "react-icons/tb";

function MusicControl() {


    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const handleRangeBarChange = (event) => {
        const newTime = event.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };


    return (
        <div className="MusicControl">

            <div className="PlayBar">

                <audio ref={audioRef} className="audios" controls=""  autoPlay
                
                ></audio>
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

                    <TbPlayerTrackPrevFilled className="trackBtn" size={40}/>
                    <TbPlayerPlayFilled className="trackBtn" size={40}/>
                    <TbPlayerTrackNextFilled className="trackBtn" size={40}/>

                </div>

                <div className="bottom">

                <TbArrowsShuffle className="trackBtn" size={40}/>
                <TbHeart className="trackBtn" size={40}/>
                <TbRepeat className="trackBtn" size={40}/>

                </div>

            </div>

        </div>
    );
}

export default MusicControl