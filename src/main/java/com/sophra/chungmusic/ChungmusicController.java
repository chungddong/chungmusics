package com.sophra.chungmusic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.felipeucelli.javatube.Search;
import com.github.felipeucelli.javatube.Youtube;

import io.sfrei.tracksearch.clients.youtube.YouTubeAPI;
import io.sfrei.tracksearch.clients.youtube.YouTubeClient;
import io.sfrei.tracksearch.tracks.TrackList;
import io.sfrei.tracksearch.tracks.YouTubeTrack;

@RestController
public class ChungmusicController {

    YouTubeClient explicitClient = new YouTubeClient();

    public YouTubeAPI api;
    public static final String URL = "https://www.youtube.com";

    String tracksJSON;
    

    @GetMapping("/api/test")
    public String hello() {
        try {

            /*long beforeTime = System.currentTimeMillis(); // 코드 실행 전 시간

            long afterTime = System.currentTimeMillis(); // 코드 실행 후 시간
            long secDiffTime = (afterTime - beforeTime) / 1000; // 코드 실행 전후 시간 차이 계산(초 단위)
            System.out.println("시간차이(s) : " + secDiffTime);

            YouTubeTrack yTrack = explicitClient.getTrack("https://www.youtube.com/watch?v=9k_csTdypRQ");

            // YouTubeTrack testTr = explicitClient.getTracksForSearch("search").get(1);

            afterTime = System.currentTimeMillis(); // 코드 실행 후 시간
            secDiffTime = (afterTime - beforeTime) / 1000; // 코드 실행 전후 시간 차이 계산(초 단위)
            System.out.println("시간차이(s) : " + secDiffTime);

            // Stream URL with format
            final String streamUrl = yTrack.getStream().url();

            afterTime = System.currentTimeMillis(); // 코드 실행 후 시간
            secDiffTime = (afterTime - beforeTime) / 1000; // 코드 실행 전후 시간 차이 계산(초 단위)
            System.out.println("시간차이(s) : " + secDiffTime);

            System.out.println(streamUrl);
            

            // System.out.println(test());*/

            for (String yt : new Search("요루시카").getResults()) {
             if (yt.toLowerCase().contains("watch")) {
                System.out.println(yt);
                Youtube ytt = new Youtube(yt);

            }
            }

            return "streamUrl";

            /*
             * for (String yt : new Search("Java").getResults()) {
             * if (yt.toLowerCase().contains("watch")) {
             * System.out.println(yt);
             * }
             * }
             */

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "안녕하세요";
    }

    @PostMapping("/api/search") 
    public List<SendTrackData> SearchResult(@RequestBody Map<String, String> payload) {
        String query = payload.get("query");

        System.out.println(query);

        List<SendTrackData> stdlist = new ArrayList<SendTrackData>();


        try {

            
            TrackList<YouTubeTrack> trackslist = explicitClient.getTracksForSearch(query);
            for (int i = 0; i < trackslist.size(); i++) {
                String title = trackslist.get(i).getTitle();
                String author = trackslist.get(i).getTrackMetadata().channelName();
                String playtime = trackslist.get(i).getDuration().toString();
                String videoUrl = trackslist.get(i).getUrl();
                String thumbUrl = trackslist.get(i).getTrackMetadata().thumbNailUrl();

                SendTrackData tempSTD = new SendTrackData(title,author, playtime, videoUrl, thumbUrl);
                stdlist.add(tempSTD);
                //System.out.println(i + "번쨰" + ">>>" + title);

                // System.out.println("" + title);

            }

            //YouTubeTrack yTrack = explicitClient.getTrack("https://www.youtube.com/watch?v=cFgk2PMgPJ4");
            //System.out.println("Title : " + yTrack.getTitle());

            //String url = trackslist.get(1).getUrl();

            //String trackJSON = request(api.getForUrlWithParams(url, TRACK_PARAMS)).contentOrThrow();
            
            //System.out.println("" + trackJSON);

            /*
             * for(Youtube yt : new Search("Java").getVideosResults()){
             * System.out.println(yt.getUrl());
             * }
             */

            return stdlist;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return stdlist;
    }

    @Controller
    static class MyController {
        
        @GetMapping(path = "/index")
        public String index() {
            return "gamsa";
        }
    }



    public String test() throws Exception {

        long beforeTime = System.currentTimeMillis(); // 코드 실행 전 시간

        Youtube yt = new Youtube("https://www.youtube.com/watch?v=9k_csTdypRQ");
        

        
        long afterTime = System.currentTimeMillis(); // 코드 실행 후 시간
        long secDiffTime = (afterTime - beforeTime) / 1000; // 코드 실행 전후 시간 차이 계산(초 단위)
        System.out.println("시간차이(s) : " + secDiffTime);

        HashMap<String, String> filters = new HashMap<>();
        filters.put("onlyAudio", "true");

        String testText = yt.streams().filter(filters).getFirst().getUrl();
        // String testText = yt.streams().getOnlyAudio().getUrl();

        afterTime = System.currentTimeMillis(); // 코드 실행 후 시간
        secDiffTime = (afterTime - beforeTime) / 1000; // 코드 실행 전후 시간 차이 계산(초 단위)
        System.out.println("시간차이(s) : " + secDiffTime);

        return testText;
    }

}