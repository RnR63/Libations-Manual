export interface Cocktail {
  name: string;
  spirit: string;
  ingredients: string[];
  method: string;
  glassware: string;
  garnish: string;
}
export interface Store {
  cocktails: Map<string, Cocktail> | null;
  updateCocktails: (newCocktails: Map<string, Cocktail>) => void;
}
