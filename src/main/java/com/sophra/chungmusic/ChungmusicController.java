package com.sophra.chungmusic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.felipeucelli.javatube.Youtube;

import io.sfrei.tracksearch.clients.youtube.YouTubeAPI;
import io.sfrei.tracksearch.clients.youtube.YouTubeClient;
import io.sfrei.tracksearch.tracks.TrackList;
import io.sfrei.tracksearch.tracks.YouTubeTrack;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestParam;

import io.sfrei.tracksearch.exceptions.TrackSearchException;

@RestController
public class ChungmusicController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private TrackRepository trackRepository;

    YouTubeClient explicitClient = new YouTubeClient();

    public YouTubeAPI api;
    public static final String URL = "https://www.youtube.com";

    String tracksJSON;

    @GetMapping("/api/test")
    public String hello() throws TrackSearchException {
        //String url = PlayurlResult("https://www.youtube.com/watch?v=TqFLIZG_aXA");
        //System.err.println(url);
        //return url;

        var yTrack = explicitClient.getTrack("https://www.youtube.com/watch?v=TqFLIZG_aXA");

        System.out.println(yTrack.getStream().url());

        return "yTrack.getStream().url()";
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

    // 로그인 요청
    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody Users loginUser, HttpSession session) {

        if (usersService.confirmUser(loginUser)) {
            session.setAttribute("user", loginUser);
            return ResponseEntity.ok("Confirm");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

    }

    // 로그아웃 요청
    @GetMapping("/api/logout")
    public ResponseEntity<?> logoutUser(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    // 로그인 세션 체크
    @GetMapping("/api/checkSession")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Object user = session.getAttribute("user");
        System.out.println("session 유저 : " + user.toString());
        if (user != null) {
            return ResponseEntity.ok("Session is active");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
        }
    }

    // 새로운 재생목록 추가
    @PostMapping("/api/createPlaylist")
    public ResponseEntity<?> addPlaylist(@RequestBody Map<String, String> payload, HttpSession session) {

        String query = payload.get("title");

        Users loginuser = (Users) session.getAttribute("user");
        Optional<Users> user = usersService.findbyEmail(loginuser.getEmail());

        Playlist playlist = new Playlist();
        playlist.setThumbnailUrl("");
        playlist.setTitle(query);
        playlist.setUser(user.get());
        playlistRepository.save(playlist);

        return ResponseEntity.ok("Playlist added successfully");
    }

    // 플레이리스트 반환 메서드
    @GetMapping("/api/getPlaylists")
    public ResponseEntity<List<PlaylistDTO>> getPlaylistsByUserId(HttpSession session) {

        Users loginuser = (Users) session.getAttribute("user");
        Optional<Users> user = usersService.findbyEmail(loginuser.getEmail());

        List<Playlist> playlists = playlistRepository.findByUser(user.get());

        List<PlaylistDTO> playlistDTOs = playlists.stream()
                .map(playlist -> new PlaylistDTO(
                        playlist.getId(),
                        playlist.getTitle(),
                        playlist.getThumbnailUrl()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(playlistDTOs);

    }

    // 노래 추가 메서드-여기도 원칙적으로는 세션체크해야할듯
    @PostMapping("/api/addTracksToPlaylists")
    public ResponseEntity<?> addTracksToPlaylists(@RequestBody Map<String, String> payload, HttpSession session) {

        Users loginuser = (Users) session.getAttribute("user");
        Optional<Users> user = usersService.findbyEmail(loginuser.getEmail());

        // TODO : 재생목록에 첫 음악 추가일시 썸네일 설정 코드 넣어야함

        List<Long> playlistIds = Arrays.stream(payload.get("playlistIds").split(","))
                .map(Long::parseLong)
                .collect(Collectors.toList());

        for (Long playlistId : playlistIds) {
            System.out.println(playlistId);
            Playlist list = playlistRepository.findByid(playlistId);
            Track track = new Track();
            track.setTitle(payload.get("trackTitle"));
            track.setAuthor(payload.get("trackAuthor"));
            track.setPlaytime(payload.get("trackPlaytime"));
            track.setVideoUrl(payload.get("trackVideoUrl"));
            track.setThumbUrl(payload.get("trackThumbUrl"));
            track.setPlaylist(list);
            track.setUser(user.get());

            trackRepository.save(track);
        }

        return ResponseEntity.ok("Tracks added to playlists successfully");
    }

    // 모든 음악 트랙 반환 메서드
    @GetMapping("/api/getAllTracks")
    public List<SendTrackData> AllTracks(HttpSession session) {

        Users loginuser = (Users) session.getAttribute("user");
        Optional<Users> user = usersService.findbyEmail(loginuser.getEmail());

        // 해당 유저의 모든 트랙 리스트 가져오기
        List<Track> tracks = trackRepository.findByUser(user.get());

        // 전송할 형태의 리스트
        List<SendTrackData> stdlist = new ArrayList<SendTrackData>();

        // HashSet을 사용하여 중복된 videoUrl 제거
        Set<String> uniqueVideoUrls = new HashSet<>();

        for (Track track : tracks) {
            String videoUrl = track.getVideoUrl();

            // 중복된 videoUrl이 이미 추가되었는지 HashSet을 사용하여 확인
            if (!uniqueVideoUrls.contains(videoUrl)) {
                String title = track.getTitle();
                String author = track.getAuthor();
                String playtime = track.getPlaytime();
                String thumbUrl = track.getThumbUrl();

                SendTrackData tempSTD = new SendTrackData(title, author, playtime, videoUrl, thumbUrl);
                stdlist.add(tempSTD);

                // HashSet에 추가하여 중복 체크용 데이터 갱신
                uniqueVideoUrls.add(videoUrl);
            }
        }

        return stdlist;
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

            // System.out.println(trackslist.get(3));

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

            /*
             * YouTubeTrack yTrack = explicitClient.getTrack(videoUrl);
             * 
             * String url = "";
             * 
             * url = yTrack.getStream().url();
             * 
             * 
             * return url;
             */

            // Youtube yt = new Youtube(videoUrl);
            // System.out.println(yt.streams().getOnlyAudio().getUrl());

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