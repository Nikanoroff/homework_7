
//добавление  товара в список basket-goods.json
const fs = require('fs');
const { goods_path, basket_goods_path } = require('./constants');



const readElement = function (path) {

  return new Promise((resolve, reject) => {

    fs.readFile(path, 'utf8', (err, data) => {

      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));

    })

  })
}


const writeElement = function (path, items) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(items), (err) => {
      if (err) {
        reject(err);
      }
      resolve(items);
    })
  })
}





const addElement = (path, item) => {

  return new Promise((resolve, reject) => {

    readElement(path).then((items) => {

      const resultEl = [...items];
      resultEl.push(item);
      writeElement(path, resultEl).then((_resultItems) => {

        resolve(_resultItems)
      }).catch((err) => {
        reject(err);
      })

    })

  });
}
module.exports = {
  addElement
}
