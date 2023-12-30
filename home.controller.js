const { products, banners, categories } = require('./data');


exports.getProducts = (req, res) => {
  const { tag, categoryId } = req.query;
  let saleProducts = [];
  let popularProducts = [];
  let productByCategory = [];

  if (tag) {
    products.forEach(item => {
      let tags = item.tags;
      if (tags?.length > 0) {
        tags.forEach(element => {
          if (tag === 'sale' && element === tag) {
            saleProducts.push(item);
          } else if (element === 'popular' && element === tag) {
            popularProducts.push(item);
          }
        });
      }
    });
  }

  if (categoryId) {
    productByCategory = products.filter(item => item.categoryId === Number(categoryId));
  }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        products: tag === 'sale' ? saleProducts : tag === 'popular' ? popularProducts : categoryId ? productByCategory : products,
        productByCategory
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
