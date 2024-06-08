package com.sophra.chungmusic;

public class SearchResult {
    private String title;
    private String creator;
    private String imageLink;
    private String videoLink;

    // 기본 생성자
    public SearchResult() {
    }

    public SearchResult(String title, String creator, String imageLink, String videoLink) {
        this.title = title;
        this.creator = creator;
        this.imageLink = imageLink;
        this.videoLink = videoLink;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    // 오버라이딩된 toString() 메서드 (선택사항)
    @Override
    public String toString() {
        return "Track{" +
                "title='" + title + '\'' +
                ", creator='" + creator + '\'' +
                ", imageLink='" + imageLink + '\'' +
                ", videoLink='" + videoLink + '\'' +
                '}';
    }
}
