import React, { useState } from "react";
import axios from "axios";
import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";
import "../css/Search.css";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

function Search() {
  const [tracks, setTracks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.post("/api/search", { query });
      setTracks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="Search">
      <UserBar />
      <TitleHeader title={"Search Music"} />
      <SearchBar onSearch={handleSearch} />
      <br />
      <div>History</div>
      {tracks.map((track, index) => (
        <ListItem
          key={index}
          thumbnailUrl={track.thumbnailUrl}
          title={track.title}
          author={track.author}
        />
      ))}
    </div>
  );
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Music title"
          className="SearchBarInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

function ListItem({ thumbnailUrl, title, author }) {
  return (
    <div className="ListItem">
      <div className="thumbnailbox">
        <img src={thumbnailUrl} alt={title} />
      </div>
      <div className="infobox">
        <div className="MusicTitle">{title}</div>
        <div className="MusicArtist">{author}</div>
      </div>
      <div className="listbtn">
        <MdOutlinePlaylistAdd size={30} className="btns" />
        <IoPlay size={30} className="btns" />
      </div>
    </div>
  );
}

export default Search;
