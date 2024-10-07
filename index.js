const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

const productController = require('./product.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const homeController = require('./home.controller');
const categoriesController = require('./categories.controller');
const authenticateJWT = require('./middlewares/authenticateJWT');

const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LetDiv');
});

app.post('/auth/forget-password')
app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);



app.use(authenticateJWT);

app.get('/home/banners', homeController.getBanners);
app.get('/home/categories', homeController.getCategories);
app.get('/categoris/getCategoriesList', categoriesController.getCategories);
app
  .route('/home/products')
  .get(homeController.getProducts)

app.get('/users/me', userController.getMe);

app.post('/products/updateLoveProductList', productController.updateLoveProductList);
app.post('/cart/addCart', productController.addCart);
app.post('/cart/removeCart', productController.removeCart);
app
  .route('/products')
  .get(productController.getProducts)
  .post(productController.addProduct);

app
  .route('/products/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct);

app.listen(port, () => {
  console.log(`LetDiv app listening on port ${port}`)
});