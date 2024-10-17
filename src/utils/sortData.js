export const sortByAmount = (data, order = "asc") => {
  return data.slice().sort((a, b) => {
    if (order === "asc") {
      return a.amount - b.amount; // Low to High
    } else {
      return b.amount - a.amount; // High to Low
    }
  });
};
