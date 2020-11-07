export default (x) => {
  const date = new Date(x);
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() < 10 ? 0 : ""
  }${date.getUTCMonth()}-${
    date.getUTCDate() < 10 ? 0 : ""
  }${date.getUTCDate()}`;
};
