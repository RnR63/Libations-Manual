import { create } from "zustand";
import { Store } from "../../types";

const useStore = create<Store>((set) => ({
  cocktails: null,
  updateCocktails: (newCocktails) => set({ cocktails: newCocktails }),
}));

export default useStore;
