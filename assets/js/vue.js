// data
const products = [
  { id: 1, description: "air-max-bleu", price: '60', img: 'assets/img/jorde1.png', alt: 'image_1' },
  { id: 2, description: 'air-nike-blanc', price: '50', img: 'assets/img/jorde2.png', alt: 'image_2' },
  { id: 3, description: 'air-nike-blanc', price: '40', img: 'assets/img/jorde3.png', alt: 'image_3' },
  { id: 4, description: 'air-jorde-14-blanc', price: '90', img: 'assets/img/jorde4.png', alt: 'image_4' },
  { id: 5, description: 'air-jorde-14-pink', price: '100', img: 'assets/img/jorde5.png', alt: 'image_5' },
  { id: 6, description: 'air-jorde-14-black', price: '100', img: 'assets/img/jorde6.png', alt: 'image_6' },
  { id: 7, description: 'air-jorde-14-blanc-noir', price: '100', img: 'assets/img/jorde7.png', alt: 'image_7' },
  { id: 8, description: 'air-jorde-noir', price: '100', img: 'assets/img/jorde8.png', alt: 'image_8' },
  { id: 9, description: 'air-max-blanc-rouge', price: '80', img: 'assets/img/jorde9.png', alt: 'image_1' },
  { id: 10, description: 'air-max-blanc-rouge-couvre-cheville', price: '70', img: 'assets/img/jorde10.png', alt: 'image_9' },
  { id: 11, description: 'air-max-blanc-noir-vert', price: '75', img: 'assets/img/jorde11.png', alt: 'image_10' },
  { id: 12, description: 'air-max-blanc-pink', price: '80 euros', img: 'assets/img/jorde12.png', alt: 'image_11' },
  { id: 13, description: 'air-max-black', price: '80', img: 'assets/img/jorde13.png', alt: 'image_12' },
  { id: 14, description: 'air-max-baise', price: '90', img: 'assets/img/jorde14.png', alt: 'image_13' },
  { id: 15, description: 'air-max-blanc-bleu', price: '90', img: 'assets/img/jorde15.png', alt: 'image_14' },
  { id: 16, description: 'air-max-rouge-noir-blanc', price: '120', img: 'assets/img/jorde16.png', alt: 'image_16' },
  { id: 17, description: 'air-max-rouge-baise-blanc', price: '120', img: 'assets/img/jorde17.png', alt: 'image_17' },
  { id: 18, description: 'air-blanc-jaune-stylé', price: '100', img: 'assets/img/jorde18.png', alt: 'image_18' },
  { id: 19, description: 'air-noir-jaune-stylé', price: '100', img: 'assets/img/jorde19.png', alt: 'image_19' },
  { id: 20, description: 'air-max-tout-blanc', price: '100', img: 'assets/img/jorde20.png', alt: 'image_20' },
];

const Home = {
  template: "#home",
  name: 'Home',
  data: () => {
    return {
      products: products,
      searchKey: "",
      liked: [],
      cart: []
    }
  },
  mounted: () => {
    this.getlikedCookie;
  },
  computed: {
    filteredList() {
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      });
    },
    getlikedCookie() {
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue;
    },
    totalPrice() {
      let totalPrice = 0;
      for (let item in this.cart) {
        totalPrice = totalPrice + (this.cart[item].quantity * this.cart[item].price);
      }
      return totalPrice;
    },
    totalQuantity() {
      let totalQuantity = 0;
      for (let item in this.cart) {
        totalQuantity = totalQuantity + (this.cart[item].quantity);
      }
      return totalQuantity;
    }
  },
  methods: {
    setLikedCookie() {
      setTimeout(() => {
        document.addEventListener('input', () => {
          $cookies.set('like', JSON.stringify(this.liked));
        });
      }, 400);
    },
    addToCart(product) {
      //check if already in array 
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++;
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      });
    },
    cartPlusOne(product) {
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product, id) {
      if (product.quantity == 1) {
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity - 1;
      }

    },
    cartRemoveItem(id) {
      this.$delete(this.cart, id);
    },
  },
}

const UserSettings = {
  template: "<h1>UserSettings</h1>",
  name: 'UserSettings'
}

const WishList = {
  template: "<h1>WishList</h1>",
  name: "WishList"
}

const ShoppingCard = {
  template: "<h1>ShoppingCard</h1>",
  name: "ShoppingCard"
}

const router = new VueRouter({
  routes: [
    { path: "/", component: Home, name: 'Home' },
    { path: "/user-setting", component: UserSettings, name: 'UserSettings' },
    { path: "/wish-list", component: WishList, name: 'WishList' },
    { path: "/shopping-card", component: ShoppingCard, name: 'ShoppingCard' }
  ]
})

const vue = new Vue({
  router
}).$mount('#app');
