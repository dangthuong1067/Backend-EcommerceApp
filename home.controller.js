const { products, banners, categories } = require('./data');


exports.getProducts = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        products
      }
    });
};

exports.getBanners = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        banners
      }
    });
};

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
