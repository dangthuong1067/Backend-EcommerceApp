const { products, banners, categories } = require('./data');


exports.getProducts = (req, res) => {
  const { tag } = req.query;
  console.log("tag", tag);
  let saleProducts = [];
  let popularProducts = [];

  if (tag) {
    products.forEach(item => {
      let tags = item.tags
      if (tags?.length > 0) {
        tags.forEach(element => {
          if (tag === 'sale' && element === tag) {
            saleProducts.push(item)
          } else if (element === 'popular' && element === tag) {
            popularProducts.push(item)
          }
        });
      }
    });
  }

  console.log("saleProducts", saleProducts);
  res
    .status(200)
    .json({
      status: 'success',
      data: {
        products: tag === 'sale' ? saleProducts : tag === 'popular' ? popularProducts : products
      }
    });


  // const {
  //   name,
  // } = req.query;
  // let filterProducts = products;

  // if (name) {
  //   filterProducts = filterProducts.filter(
  //     item => item.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }

  // res
  // .status(200)
  // .json({
  //   status: 'success',
  //   data: {
  //     //products: filterProducts
  //     products
  //   }
  // });
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
