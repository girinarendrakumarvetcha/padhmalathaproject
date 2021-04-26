export const formColumns = (input, options) => {
  return {
    ...input,
    options: {
      filter: false,
      sort: false,
      filterType: "textField",
      ...options
    }
  };
};
