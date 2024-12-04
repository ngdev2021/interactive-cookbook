export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const calculatePrepTime = (ingredients) => {
  return ingredients.length * 2; // Assume 2 minutes per ingredient
};
