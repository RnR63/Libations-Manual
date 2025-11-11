import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Cocktail, CocktailsMapType } from "../types";
import getCocktails from "../api/getCocktails";

const CocktailContext = createContext<{
  cocktails: CocktailsMapType;
  isLoading: boolean;
} | null>(null);

export function CocktailProvider({ children }: { children: ReactNode }) {
  const [cocktails, setCocktails] = useState<CocktailsMapType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function prepare() {
      try {
        const fetchedCocktails = await getCocktails();
        const cocktailsMap = new Map<string, Cocktail>(
          fetchedCocktails.map((cocktail) => [cocktail.name, cocktail]),
        );
        setCocktails(cocktailsMap);
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    }
    prepare();
  }, []);

  return (
    <CocktailContext.Provider value={{ cocktails, isLoading }}>
      {children}
    </CocktailContext.Provider>
  );
}

export function useCocktailContext() {
  const context = useContext(CocktailContext);
  if (!context) {
    throw new Error("CocktailContext must be used within CocktailProvider");
  }
  return context;
}
