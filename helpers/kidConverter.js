var kidConverter = function(kidData, options) {
  if (kidData === 0) {
    kidData = "No Kids";
  } else if (kidData === 1) {
    kidData = "1 Kid";
  } else {
    kidData = kidData + " Kids";
  }
  return kidData;
};

module.exports = kidConverter;
