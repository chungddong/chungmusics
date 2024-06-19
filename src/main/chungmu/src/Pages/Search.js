import React, { useState } from "react";
import axios from "axios";
import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";
import "../css/Search.css";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoPlay } from "react-icons/io5";
import useStore from '../js/store';
import AddPlaylist from "../Components/AddPlaylist"; // AddPlaylist 컴포넌트 import

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const { setSelectedTrack, setCurrentPlayUrl } = useStore();
  const { addPlaylistTrack, setAddPlaylistTrack } = useStore();
  const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false); // 다이얼로그 상태 state

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.post('/api/search', { query: searchQuery });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }
  };

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

  const handleCloseAddPlaylist = () => {
    setIsAddPlaylistOpen(false); // 다이얼로그 닫기
  };

  return (
    <div className="Search">
      <UserBar />
      <TitleHeader title={'Search Music'} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <br />
      <div>
        History
      </div>
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

      {/* AddPlaylist 다이얼로그 */}
      <AddPlaylist isOpen={isAddPlaylistOpen} onClose={handleCloseAddPlaylist} />
    </div>
  );
}

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Enter Music title"
        className="SearchBarInput"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
      />
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

export default Search;
