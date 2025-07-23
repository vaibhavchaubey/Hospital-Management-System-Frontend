const arrayToCSV = (arr: string[]) => {
  if (!arr || arr.length === 0) return null;
  return arr.join(', ');
};

const csvToArray = (csv: string) => {
  if (!csv) return [];

  return csv.split(',');
};

export { arrayToCSV, csvToArray };
