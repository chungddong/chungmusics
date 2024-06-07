import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./css/Header.css"
import "./css/MusicControl.css"

import Box from "./Components/Box";
import MusicControl from "./Components/MusicControl";

function MusicView() {
  

  return (
    <div className="App">

      <Header/>

      <div className="Main">

        <div className="MusicThumbnail">
          <img className='thumimg' src="https://i.ytimg.com/vi/HWBZXu9phWI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB47ldwM-yUhgWx7DwEQ9nIOF2A9Q"
          
          />
        </div>

        <div className="MusicInfo">

          <div className="SongName">
            대충 노래 제목 공간
          </div>

          <div className="SongArtist">
            대충 아티스트 이름
          </div>
          
        </div>

      </div>

      <MusicControl/>
      

    </div>
  )
}



export default MusicView
