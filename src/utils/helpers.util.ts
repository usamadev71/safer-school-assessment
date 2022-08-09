const _groupBy = (key: any, array: any) =>
  array.reduce(
    (objectsByKeyValue: any, obj: any) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj),
    }),
    {}
  );

const _generateRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export { _groupBy, _generateRandomColor };
