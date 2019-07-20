module.exports.error = (...args) => {
  if (process.env.ENV == 'development') {
    console.error(args);
  }
};

module.exports.log = (...args) => {
  if (process.env.ENV == 'development') {
    console.log(args);
  }
};
