import React from "react";

import UserBar from "../Components/UserBar";
import TitleHeader from "../Components/TitleHeader";

function Home()
{
    return(
        <div className="Home">
           
           <UserBar />

            <TitleHeader title={'My Music'} />
           
        </div>
    );
}

export default Home