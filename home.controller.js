const { products, banners, categories } = require('./data');


exports.getProducts = (req, res) => {
  const { tag, categoryId } = req.query;
  let filterProducts = []

  if (tag) {
    filterProducts = products.filter(item => {
      return item?.tags?.includes(tag);
    })
  }

  else if (categoryId) {
    filterProducts = products.filter(item => item.categoryId === Number(categoryId));
  }

  else if (!tag && !categoryId) {
    filterProducts = products
  }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        products: filterProducts,
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
