export interface Cocktail {
  name: string;
  spirit: string;
  ingredients: string[];
  method: string;
  glassware: string;
  garnish: string;
}

export type CocktailsMapType = Map<string, any> | null;
