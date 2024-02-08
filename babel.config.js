function isWebpack(caller) {
  // https://github.com/babel/babel-loader
  return !!(caller && caller.name === "babel-loader");
}

module.exports = function (api) {
  api.assertVersion(7);

  return {
    presets: [
      [
        "@adeira/babel-preset-adeira",
        {
          target: api.caller(isWebpack) ? "js-esm" : "js",
        },
      ],
    ],
    babelrcRoots: [
      ".", // keep the root as a root
      "./src/*", // also consider all packages and load their .babelrc files.
    ],
  };
};
