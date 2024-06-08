import React from "react";

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";
import "../css/Search.css"

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoPlay } from "react-icons/io5";


function Search() {

  
  

  return (
    <div className="Search">

      <UserBar />

      <TitleHeader title={'Search Music'} />

      <SearchBar />

      <br></br>
      <div>
        History
      </div>

      <ListItem />
      <ListItem />
      <ListItem />

    </div>
  );
}



function SearchBar() {

  return (
    <div className="SearchBar">

      <input type="text" placeholder="Enter Music title" className="SearchBarInput">

      </input>

    </div>
  );
}


function ListItem() {

  return (
    <div className="ListItem">

      <div className="thumbnailbox">

        <img src="https://i.namu.wiki/i/GPhK3nyWobYQ8j0g8L81ucc3Xvi70tmo7BSJNdG3zxc4QLHZ2p_JP5mCJ5DAmJaEZIayPQBvzRRpooQ4beKEVQ.webp"></img>

      </div>

      <div className="infobox">

        <div className="MusicTitle">
          대충 노래 제목 공간입니다
        </div>

        <div className="MusicArtist">
          대충 가수 이름
        </div>

      </div>

      <div className="listbtn">

        <MdOutlinePlaylistAdd size={30} className="btns" />
        <IoPlay size={30} className="btns" />

      </div>

    </div>
  );
}


export default Search
