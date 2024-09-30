// import "../../assets/cocktails.json";
import cocktails from "../../src/data/cocktails";

interface Cocktail {
  name: string;
  spirit: string;
  ingredients: string[];
  method: string;
  glassware: string;
  garnish: string;
}

export default function getCocktails(): Promise<Cocktail[]> {
  return new Promise<Cocktail[]>((resolve) => {
    setTimeout(() => {
      resolve(cocktails as Cocktail[]);
    }, 100); // Simulate network delay
  });
}
