// import cocktails from "./cocktails"; 
import cocktailsTest from "./cocktailsTest";

const getCocktails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cocktailsTest);
    }, 100); // Simulate network delay
  });
};

export default getCocktails;
