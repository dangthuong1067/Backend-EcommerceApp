const { categories } = require('./data');

exports.getCategories = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        categories
      }
    });
};
