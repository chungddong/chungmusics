import create from 'zustand';

const useStore = create((set) => ({
  M_PlayerBox: { display: 'none' },
  showMPlayer: (display) => set({ M_PlayerBox: { display } }),
  selectedTrack: null,
  setSelectedTrack: (track) => set({ selectedTrack: track }),

  //현재 플레이하는 음악의 링크
  currentPlayUrl: null,
  setCurrentPlayUrl: (url) => set({ currentPlayUrl: url }),

  addPlaylistTrack: null,
  setAddPlaylistTrack: (track) => set({ addPlaylistTrack: track }),

  //플레이리스트를 열었는지 확인하는 변수
  isOpenPlaylist: false,
  togglePlaylist: () => set(state => ({ isOpenPlaylist: !state.isOpenPlaylist })),

  //현재 재생중인 재생목록
  currentPlaylist : null,
  setCurrentPlaylist : (num) => set({ currentPlaylist : num }),

  //현재 재생중인 트랙의 재생목록 순번
  currentPlayTrackNum : null,
  setCurrentPlayTrackNum : (num) => set({ currentPlayTrackNum : num })
}));

export default useStore;
