import cocktails from "./cocktails"; 

const getCocktails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cocktails);
    }, 100); // Simulate network delay
  });
};

export default getCocktails;
