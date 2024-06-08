package com.sophra.chungmusic;

import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.felipeucelli.javatube.Search;
import com.github.felipeucelli.javatube.Youtube;

import io.sfrei.tracksearch.clients.youtube.YouTubeClient;
import io.sfrei.tracksearch.tracks.YouTubeTrack;

@RestController
public class ChungmusicController {

    @GetMapping("/api/test")
    public String hello() {
        try {

            long beforeTime = System.currentTimeMillis(); // 코드 실행 전 시간

            YouTubeClient explicitClient = new YouTubeClient();

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

            // System.out.println(test());
            return streamUrl;

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

    @GetMapping("/api/Search")
    public String SearchResult() {

        try {
            

            /*YouTubeClient explicitClient = new YouTubeClient();

            TrackList<YouTubeTrack> tracksForSearch = explicitClient.getTracksForSearch("요루시카-개다");

            List<SearchResult> searchResults = new ArrayList<>();

            for (int i = 0; i < tracksForSearch.size(); i++) {
                //System.out.println(tracksForSearch.get(i).getUrl());
                //System.out.println(tracksForSearch.get(i).getCleanTitle());

                
            }

            Youtube yt = new Youtube(tracksForSearch.get(1).getUrl());

            System.out.println(yt.getTitle());*/

            for(Youtube yt : new Search("Java").getVideosResults()){
                System.out.println(yt.getUrl());
            }
            

            return "yt.getTitle()";

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "검색값 없음";
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