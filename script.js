const GET_GOODS_URL = "http://localhost:8000/goods.json";
const ADD_GOOD_URL = "http://localhost:8000/api";
const GET_BASKET_GOODS_URL = "http://localhost:8000/basket-goods.json ";



const transformGoods = function (goods) {
  return goods.map((_good) => {
    return {
      id: _good.id_product,
      title: _good.product_name,
      price: _good.price
    }
  })
}



const service = (method, path, body) => (
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    if (body) {
      xhr.setRequestHeader("Content-type", "application/json");
    }
    xhr.send(body);
    xhr.onload = (event) => {
      resolve(JSON.parse(event.target.response));
    }
  })
);

// ----------component-------------------
Vue.component('custom-button', {
  data: function () {
    return {
      style: {
        backgroundImage: 'linear-gradient(45deg, #6ab1d7 0%, #33d9de 50%, #002878 100%',
        border: '3px solid #002878',
        padding: '10px',
        borderRadius: '50px',
        cursor: 'pointer'
      }
    }
  },
  template: `
    <button :style="style" @click="$emit('click')">
      <slot></slot>
    </button>
  `
})

// ----------component-------------------

Vue.component('basket-goods-item', {
  props: ['item'],
  data: function () {
    return {
      style: {
        padding: '10px',
        display: 'grid',
        gridTemplateColumns: 'min-content 1fr min-content'
      }
    }
  },
  template: `
    <div class="basket-goods-item" :style="style">
      <div>{{ item.title }}</div>
      <div></div>
      <div>{{ item.price }}</div>
    </div>
  `
});

// ----------component-------------------

Vue.component('basket-card', {
  props: ['textHeader'],
  data: function () {
    return {
      styles: {
        root: {
          display: 'grid',
          gridTemplateRows: 'min-content 1fr min-content'
        },
        header: {
          padding: '20px',
          background: 'grey'
        }
      },
      basketGoods: []
    }
  },
  template: `
    <div class="basket-card" :style="styles.root">
      <div :style="styles.header">
         <slot name="header"></slot>
      </div>
      <div>
         <slot></slot>
      </div>
      <div :style="styles.header">
         <slot name="footer"></slot>
      </div>
    </div>
  `
});

// ----------component-------------------

Vue.component('goods-item', {
  props: ['item'],
  template: `
      <div class="goods-item">
         <div>{{ item.title }}</div>
         <div>
            {{ item.price }}
         </div>
         <div>
            <custom-button @click="$emit('click', item)">добавить</custom-button>
         </div>
      </div>
  `,
});


// ----------root-------------------
const app = new Vue({
  el: '#app',
  data: {
    styles: {
      border: "1px solid blue"
    },
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    basketCardVision: false,
    search: ''
  },

  mounted: function () {
    service('GET', GET_GOODS_URL).then((goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    })
    service('GET', GET_BASKET_GOODS_URL).then((basketGoods) => {
      this.basketGoods = basketGoods;
    })
  },


  methods: {
    filterGoods: function (event) {
      this.filteredGoods = this.goods.filter(({ title }) => {
        return new RegExp(this.search, 'i').test(title);
      })
    },
    openCard: function () {
      this.basketCardVision = true;
    },
    closeCard: function () {
      this.basketCardVision = false;
    },
    addGood: function ({ title, price, id }) {
      service('PATCH', ADD_GOOD_URL, JSON.stringify({
        id,
        title,
        price
      })).then((_basketGoods) => {
        this.basketGoods = _basketGoods;
      })
    }
  }



});


