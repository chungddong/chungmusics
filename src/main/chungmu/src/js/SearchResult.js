class SearchResult {
    constructor(title, creator, imageLink, videoLink) {
        this.title = title;
        this.creator = creator;
        this.imageLink = imageLink;
        this.videoLink = videoLink;
    }

    // Getter와 Setter 메서드
    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getCreator() {
        return this.creator;
    }

    setCreator(creator) {
        this.creator = creator;
    }

    getImageLink() {
        return this.imageLink;
    }

    setImageLink(imageLink) {
        this.imageLink = imageLink;
    }

    getVideoLink() {
        return this.videoLink;
    }

    setVideoLink(videoLink) {
        this.videoLink = videoLink;
    }

    // toString 메서드 (선택사항)
    toString() {
        return `Track { title: '${this.title}', creator: '${this.creator}', imageLink: '${this.imageLink}', videoLink: '${this.videoLink}' }`;
    }
}
