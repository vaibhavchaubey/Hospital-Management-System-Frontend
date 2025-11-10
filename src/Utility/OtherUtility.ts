const arrayToCSV = (arr: string[]) => {
  console.log(arr);
  if (!arr || arr.length === 0) return null;
  return arr.join(', ');
};

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


export { arrayToCSV, capitalizeFirstLetter };
