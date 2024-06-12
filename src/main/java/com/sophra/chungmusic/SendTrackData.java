package com.sophra.chungmusic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendTrackData {

    private String title;
    private String author;
    private String playtime;
    private String videoUrl;
    private String thumbUrl;

    
}
