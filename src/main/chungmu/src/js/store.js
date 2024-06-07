import create from 'zustand';

const useStore = create((set) => ({
  M_PlayerBox: { display: 'none' },
  showMPlayer: (display) => set({ M_PlayerBox: { display } }),
}));

export default useStore;
