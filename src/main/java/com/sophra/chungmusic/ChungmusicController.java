package com.sophra.chungmusic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.felipeucelli.javatube.Youtube;

import io.sfrei.tracksearch.clients.youtube.YouTubeAPI;
import io.sfrei.tracksearch.clients.youtube.YouTubeClient;
import io.sfrei.tracksearch.tracks.TrackList;
import io.sfrei.tracksearch.tracks.YouTubeTrack;

@RestController
public class ChungmusicController {

    @Autowired
    private UsersService usersService;

    YouTubeClient explicitClient = new YouTubeClient();

    public YouTubeAPI api;
    public static final String URL = "https://www.youtube.com";

    String tracksJSON;

    @GetMapping("/api/test")
    public String hello() {
        String url = PlayurlResult("https://www.youtube.com/watch?v=TqFLIZG_aXA");
        System.err.println(url);
        return "안녕하세요";
    }

    // 회원가입 요청 처리
    @PostMapping("/api/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody Users user, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        // 이메일로 기존 사용자 있는지 확인
        if (usersService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use");
        }

        user.setIsAllow(false);
        user.setLastplayMusic(null);

        // 회원가입 처리
        Users registeredUser = usersService.registerUser(user);
        return ResponseEntity.ok(registeredUser);

    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginUser) {

        if(usersService.confirmUser(loginUser))
        {
            return ResponseEntity.ok("Confirm");    
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        
        
        
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

                SendTrackData tempSTD = new SendTrackData(title, author, playtime, videoUrl, thumbUrl);
                stdlist.add(tempSTD);
                // System.out.println(i + "번쨰" + ">>>" + title);

                // System.out.println("" + title);

            }

            //System.out.println(trackslist.get(3));

            // YouTubeTrack yTrack =
            // explicitClient.getTrack("https://www.youtube.com/watch?v=cFgk2PMgPJ4");
            // System.out.println("Title : " + yTrack.getTitle());

            // String url = trackslist.get(1).getUrl();

            // String trackJSON = request(api.getForUrlWithParams(url,
            // TRACK_PARAMS)).contentOrThrow();

            // System.out.println("" + trackJSON);

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

    // 유튜브 url 던져주면 오디오 url 뱉어주는 함수
    public String PlayurlResult(String videoUrl) {
        try {

            YouTubeTrack yTrack = explicitClient.getTrack(videoUrl);

            System.out.println(yTrack.getStream().url());

            return yTrack.getStream().url();

            /*YouTubeTrack yTrack = explicitClient.getTrack(videoUrl);

            String url = "";

            url = yTrack.getStream().url();
            

            return url;*/

            //Youtube yt = new Youtube(videoUrl);
            //System.out.println(yt.streams().getOnlyAudio().getUrl());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    @PostMapping("/api/getPlayUrl")
    public Map<String, String> getPlayUrl(@RequestBody Map<String, String> request) {
        String videoUrl = request.get("videoUrl");

        System.out.println(videoUrl);
        Map<String, String> response = new HashMap<>();

        String url = PlayurlResult(videoUrl);
        System.err.println(url);
        response.put("videoUrl", url); // 실제 URL을 여기에 넣어야 합니다.

        return response;
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