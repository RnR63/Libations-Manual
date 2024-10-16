import cocktails from "../../src/data/cocktails";
import { Cocktail } from "../types";

export default function getCocktails(): Promise<Cocktail[]> {
  return new Promise<Cocktail[]>((resolve) => {
    setTimeout(() => {
      resolve(cocktails as Cocktail[]);
    }, 100); // Simulate network delay
  });
}
