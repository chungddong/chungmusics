import React from "react";

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";

import "../css/Playlist.css"

function Playlist() {
    return (
        <div className="Playlist">


            <UserBar />

            <TitleHeader title={'My PlayList'} />

            <div className="DefaultPlaylist">

                <br></br>
                <div className="listTitle">

                    Default playlist

                </div>

                <div className="listView">

                    <ListView />

                    <ListView />


                </div>

            </div>

            <div className="UserPlaylist">

                <br></br>
                <div className="listTitle">

                    User playlist

                </div>

                <div className="listView">

                    <ListView />

                    <ListView />
                    

                    <ListView />


                </div>

            </div>

        </div>
    );
}

function ListView() {
    return (

        <div className="ListView">

            <div className="ListThumbnail">



            </div>

            <div className="ListText">
                Most played songs
            </div>

        </div>

    );
}

export default Playlist