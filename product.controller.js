const { products, cartList, users } = require('./data');
const nextId = require('./helpers/nextId');

exports.getProducts = (req, res) => {
  // const {
  //   name,
  // } = req.query;
  // let filterProducts = products;

  // if (name) {
  //   filterProducts = filterProducts.filter(
  //     item => item.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        //products: filterProducts
        products
      }
    });
};

exports.addProduct = (req, res) => {
  const {
    name,
    price,
    image,
  } = req.body;

  const product = {
    id: nextId(products),
    name,
    price,
    image,
  }
  products.push(product);

  res
    .status(201)
    .json({
      status: 'success',
      data: {
        product
      }
    });
};

exports.getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find(item => item.id === Number(id));

  if (product) {
    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          product
        }
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    image,
  } = req.body;

  const product = products.find(item => item.id === Number(id));
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;

    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          product
        },
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}

exports.updateLoveProductList = (req, res) => {
  const { userId } = req;
  const {
    productId
  } = req.body;

  const product = products.find(item => item.id === Number(productId));

  if (product) {
    if (product.lovedByUserId.includes(Number(userId))) {
      let index = product.lovedByUserId.indexOf(userId);
      product.lovedByUserId.splice(index, 1);
    } else {
      product.lovedByUserId.push(Number(userId));
    }

    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          product
        },
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}

exports.addCart = (req, res) => {
  const { userId } = req;
  const {
    productId,
    quantity,
    image,
    capacity,
    color,
    price
  } = req.body;

  const cartListInUsers = users.find(item => item.id === userId).cartList
  const target = cartListInUsers.find(item => item.id === productId)

  let product
  if (target) {
    target.quantity = quantity
    product = target
  } else {
    const productFound = products.find(item => item.id === Number(productId));
    let cartItem = {
      id: productFound.id,
      name: productFound.name,
      quantity,
      image,
      capacity,
      color,
      price
    }
    cartListInUsers.push(cartItem)
    product = cartItem
  }

  return res
    .status(200)
    .json({
      status: 'success',
      product
    });
}

exports.removeCart = (req, res) => {
  const { userId } = req;
  const {
    productId,
  } = req.body;
  const cartListInUsers = users.find(item => item.id === userId).cartList

  cartListInUsers.forEach((item, index) => {
    if (item.id === Number(productId)) cartListInUsers.splice(index, 1);
  });


  return res
    .status(200)
    .json({
      status: 'success',
    });
}