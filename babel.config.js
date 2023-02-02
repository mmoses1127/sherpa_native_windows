module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["nativewind/babel"],
    presets: ['babel-preset-expo']
  };
};


// module.exports = {
//   plugins: ["nativewind/babel"],
//   presets: ['babel-preset-expo']};