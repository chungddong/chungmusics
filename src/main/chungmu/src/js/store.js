import create from 'zustand';

const useStore = create((set) => ({
  M_PlayerBox: { display: 'none' },
  showMPlayer: (display) => set({ M_PlayerBox: { display } }),
  selectedTrack: null,
  setSelectedTrack: (track) => set({ selectedTrack: track }),
  currentPlayUrl: null,
  setCurrentPlayUrl: (url) => set({ currentPlayUrl: url }),
  addPlaylistTrack: null,
  setAddPlaylistTrack: (track) => set({ addPlaylistTrack: track }),

  isOpenPlaylist: false,
  togglePlaylist: () => set(state => ({ isOpenPlaylist: !state.isOpenPlaylist })),
}));

export default useStore;
