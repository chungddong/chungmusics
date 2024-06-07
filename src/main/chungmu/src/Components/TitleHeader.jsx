import React from "react";
import "../css/TitleHeader.css"

function TitleHeader(props)
{
    return(
        <div className="TitleHeader">
           {props.title}
        </div>
    );
}

export default TitleHeader