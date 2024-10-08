// import { Cocktail } from "../types";

// class OptimizedCocktailManager {
//   private cocktailMap: Map<string, Cocktail>;
//   private nameSearchIndex: Map<string, Set<string>>;
//   private spiritIndex: Map<string, Set<string>>;

//   constructor(cocktails: Cocktail[]) {
//     this.cocktailMap = new Map();
//     this.nameSearchIndex = new Map();
//     this.spiritIndex = new Map();
//     this.initializeDataStructures(cocktails);
//   }

//   private initializeDataStructures(cocktails: Cocktail[]) {
//     cocktails.forEach((cocktail) => {
//       const lowerCaseName = cocktail.name.toLowerCase();

//       // Main cocktail storage
//       this.cocktailMap.set(lowerCaseName, cocktail);

//       // Name search index
//       lowerCaseName.split(" ").forEach((word) => {
//         if (!this.nameSearchIndex.has(word)) {
//           this.nameSearchIndex.set(word, new Set());
//         }
//         this.nameSearchIndex.get(word)!.add(lowerCaseName);
//       });

//       // Spirit index
//       if (!this.spiritIndex.has(cocktail.spirit)) {
//         this.spiritIndex.set(cocktail.spirit, new Set());
//       }
//       this.spiritIndex.get(cocktail.spirit)!.add(lowerCaseName);
//     });
//   }

//   // 1. Search cocktails by name
//   searchCocktails(query: string): Cocktail[] {
//     const words: string[] = query.toLowerCase().split(" ");
//     let resultSet: Set<string> | null = null;

//     words.forEach((word) => {
//       const wordResults = this.nameSearchIndex.get(word) || new Set();
//       if (resultSet === null) {
//         resultSet = new Set<string>(wordResults);
//       } else {
//         resultSet = new Set<string>(
//           [...resultSet].filter((x) => wordResults.has(x)),
//         );
//       }
//     });

//     if (!resultSet || resultSet.size === 0) {
//       console.log("No matching cocktails found.");
//       return [];
//     }

//     return resultSet
//       ? Array.from(resultSet).map((name) => this.cocktailMap.get(name)!)
//       : [];
//   }

//   // 2. Filter cocktails by spirit
//   getCocktailsBySpirit(spirit: string): Cocktail[] {
//     const cocktailNames = this.spiritIndex.get(spirit) || new Set<string>();
//     return Array.from(cocktailNames).map((name) => this.cocktailMap.get(name)!);
//   }

//   // 3. Get full recipe by cocktail name
//   getFullRecipe(cocktailName: string): Cocktail | undefined {
//     return this.cocktailMap.get(cocktailName.toLowerCase());
//   }

//   // Utility function to get all spirits
//   getAllSpirits(): string[] {
//     return Array.from(this.spiritIndex.keys());
//   }
// }

// // Example usage
// const cocktails: Cocktail[] = [
//   // ... your cocktail data here
// ];

// const manager = new OptimizedCocktailManager(cocktails);

// console.log(manager.searchCocktails("Negroni")); // Search by name
// console.log(manager.getCocktailsBySpirit("Gin")); // Filter by spirit
// console.log(manager.getFullRecipe("Negroni")); // Get full recipe

// /**
//  * Possible store
//  *
//  * Overall Cocktail Map
//  * Name Search Map
//  * search function
//  *
//  * Spirit Search Map
//  * spirit filter function
//  *
//  * addCocktail
//  * removeCocktail
//  * editCocktail
//  *
//  */
