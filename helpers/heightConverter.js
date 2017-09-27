var heightConverter = function(heightData, options) {
  heightData = Math.floor(heightData / 12) + `'` + heightData % 12 + `"`;
  return heightData;
};

module.exports = heightConverter;
