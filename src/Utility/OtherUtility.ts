const arrayToCSV = (arr: string[]) => {
  console.log(arr);
  if (!arr || arr.length === 0) return null;
  return arr.join(', ');
};

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const addZeroMonths = (data: any[], monthKey: string, valueKey: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const result = months.map((month) => {
    const found = data.find((item) => item[monthKey] === month);
    return found
      ? found
      : {
          [monthKey]: month,
          [valueKey]: 0,
        };
  });

  return result;
};

const convertReasonChartData = (data: any[]) => {
  const colors = [
    'blue.6',
    'teal.6',
    'green.6',
    'cyan.6',
    'indigo.6',
    'violet.6',
    'grape.6',
    'pink.6',
    'orange.6',
    'lime.6',
  ];

  return data.map((item, index) => ({
    name: item.reason,
    value: item.count,
    color: colors[index % colors.length],
  }));
};

export {
  arrayToCSV,
  capitalizeFirstLetter,
  addZeroMonths,
  convertReasonChartData,
};
