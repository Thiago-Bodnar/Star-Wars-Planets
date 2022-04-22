const minusOne = -1;
const one = 1;
const zero = 0;

export const nameSorter = (a, b) => {
  if (a.name > b.name) {
    return one;
  }
  if (a.name < b.name) {
    return minusOne;
  }
  return zero;
};

export const ascSorter = (a, b) => {
  if (+a.value > +b.value) {
    return one;
  }
  if (+a.value < +b.value) {
    return minusOne;
  }
  return zero;
};

export const descSorter = (a, b) => {
  if (+a.value < +b.value) {
    return one;
  }
  if (+a.value > +b.value) {
    return minusOne;
  }
  return zero;
};
