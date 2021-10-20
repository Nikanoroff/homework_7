const { addElement } = require('./comonFunctions');
const { basket_goods_path } = require('./constants');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./static'));


app.patch('/api', (res, req) => {
  console.log('body - ', res.body)
  addElement(basket_goods_path, res.body).then((items) => {
    req.setHeader('Content-type', 'application/json')
    req.send(items)
  })
});

app.listen('8000', () => {
  console.log('server is run!');
})