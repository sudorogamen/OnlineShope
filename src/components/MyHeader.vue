<template>
  <div class="header">
    <div @click="home($event)" class="header_logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0,0,256,256"
      >
        <g
          fill="var(--accent-color)"
          fill-rule="nonzero"
          stroke="none"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <g transform="scale(10.66667,10.66667)">
            <path
              d="M12,2c-0.26712,0.00003 -0.52312,0.10694 -0.71094,0.29688l-10.08594,8.80078c-0.12774,0.09426 -0.20313,0.24359 -0.20312,0.40234c0,0.27614 0.22386,0.5 0.5,0.5h2.5v8c0,0.552 0.448,1 1,1h4c0.552,0 1,-0.448 1,-1v-6h4v6c0,0.552 0.448,1 1,1h4c0.552,0 1,-0.448 1,-1v-8h2.5c0.27614,0 0.5,-0.22386 0.5,-0.5c0.00001,-0.15876 -0.07538,-0.30808 -0.20312,-0.40234l-10.08008,-8.79492c-0.00194,-0.00196 -0.0039,-0.00391 -0.00586,-0.00586c-0.18782,-0.18994 -0.44382,-0.29684 -0.71094,-0.29687z"
            ></path>
          </g>
        </g>
      </svg>
      <button>LOGO</button>
    </div>
    <form @submit.prevent="search($event)">
      <input
        type="search"
        class="search_input"
        placeholder="Search"
        v-model="searchValue"
      />
      <button class="search_btn" type="submit" @focus="search($event)"></button>
    </form>
    <div class="header_cart_row">
      <button @click="openModal($event)" class="header_cart_button">
        <img
          src="https://i.postimg.cc/tC7qW03X/17701365.png"
          alt=""
          class="cart_img"
        />
        <span class="cart_text">Cart</span>
        <span class="cart_count">{{ this.$store.state.buyItemsCount }}</span>
      </button>
      <div class="cart_modal">
        <div class="cart_modal_title">Shopping Cart</div>
        <div v-show="this.$store.state.buyList.length < 1" class="empty_cart">
          Cart is empty
        </div>
        <button class="close_btn" @click="close_modal($event)"></button>
        <ul class="cart_list">
           <li class="cart_item_row" v-for="product in this.$store.state.buyList">
          <img :src="product.src[0]" class="image_card" />
          <div class="product_description">
            <h3 class="product_title">{{ product.name }}</h3>
            <span class="price">{{ product.price }} ₽</span>
          </div>
          <div class="product_total_price">
            <div>{{ product.price * product.count }} ₽</div>
            <div class="prodct_count_box">
              <button
                class="couny_minus_btn"
                @click="
                  this.$store.commit('setBuyItemsCount', {
                    id: product.id,
                    value: 'minus',
                  })
                "
              >
                -
              </button>
              <div class="prodct_count">{{ product.count }}</div>
              <button
                class="couny_plus_btn"
                @click="
                  this.$store.commit('setBuyItemsCount', {
                    id: product.id,
                    value: 'plus',
                  })
                "
              >
                +
              </button>
            </div>
          </div>
          <button @click="delite(product)" class="delite_btn"></button>
        </li>
        </ul>
        <div class="total_sum" v-show="this.$store.state.buyList.length > 0">
          <div>Total price: {{ this.$store.state.totalSum }}</div>
          <button  class="buy_button">Go to pay</button>
        </div>
      </div>
      <div class="modal_overlay" @click="close_modal($event)"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      count: 0,
      searchValue: "",
    };
  },
  props: {},
  methods: {
    delite(product) {
      this.$store.commit("deliteBuyProduct", product);
    },
    home(event) {
      if (event.target === event.currentTarget) return;
      this.searchValue = "";
      this.$store.commit("setSearchValue", this.searchValue);
      this.$store.getters.updateProducts;
      this.$router.push("/");
    },
    blur(e) {
      e.target.closest("form").querySelector("input").blur();
    },
    search(e) {
      this.$store.commit("setSearchValue", this.searchValue);
      this.$store.getters.updateProducts;
      this.$router.push("/");
      this.blur(e);
    },
    openModal(e) {
       document.querySelector("body").style.overflow = "hidden";
      e.target
        .closest(".header_cart_row")
        .querySelector(".cart_modal")
        .classList.add("open");
      e.target
        .closest(".header_cart_row")
        .querySelector(".modal_overlay")
        .classList.add("open");
    },
    close_modal(e) {
       document.querySelector("body").style.overflow = "visible";
      e.target
        .closest("body")
        .querySelector(".cart_modal")
        .classList.remove("open");
      e.target
        .closest(".header_cart_row")
        .querySelector(".modal_overlay")
        .classList.remove("open");
    },
  },
};
</script>
<style scoped>
.header {
  user-select: none;
  height: 50px;
  margin-top: 30px;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.header_logo {
  flex: 1 0 auto;
  font-size: 25px;

  display: flex;
  align-items: center;
  gap: 5px;
}

.header_logo > * {
  cursor: pointer;
}

form {
  height: 100%;
  width: 60%;
  display: flex;
  align-items: center;
}

form input:focus + button,
form input:focus ~ button {
  width: 55px;
  opacity: 1;
}
.search_btn {
  object-fit: cover;
  background: url(https://i.postimg.cc/Zq1bz54b/search.png) center center;
  background-position: center;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0 5px 5px 0;
  opacity: 0;
  width: 5px;
  height: 100%;
  cursor: pointer;
  border-left: 0;
  border: 1px solid var(--accent-color);
}

.search_input {
  border: 1px solid var(--border-color);
  height: 100%;
  border-radius: 5px;
  width: 100%;
  font-size: 20px;
  padding: 15px;
}
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  object-fit: cover;
  background-image: url(https://i.postimg.cc/xCGGykVz/cross-mark.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}
input:focus[type="search"] {
  border-radius: 5px 0 0 5px;
  border-color: var(--accent-color);
}
.header_cart_row {
  position: relative;
  height: 100%;
}
.header_cart_button {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid var(--border-color);
}
.empty_cart {
  font-size: 20px;
}
.cart_img {
  width: 30px;
  height: 30px;
}
/* .header_cart_button::before {
 content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  %3E%3Cpath fill='rgba(255, 89, 0, 1)' d='M12 2c-0.26712 0.00003-0.52312 0.10694-0.71094 0.29688l-10.08594 8.80078c-0.12774 0.09426-0.20313 0.24359-0.20312 0.40234 0 0.27614 0.22386 0.5 0.5 0.5h2.5v8c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-6h4v6c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-8h2.5c0.27614 0 0.5-0.22386 0.5-0.5 0.00001-0.15876-0.07538-0.30808-0.20312-0.40234l-10.08008-8.79492c-0.00194-0.00196-0.0039-0.00391-0.00586-0.00586-0.18782-0.18994-0.44382-0.29684-0.71094-0.29687z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
} */
.cart_text {
  font-size: 20px;
}
.cart_count {
  font-size: 18px;
  font-weight: 600;
  border-radius: 50%;
  background: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.cart_modal {
  border: 1px solid var(--accent-color);
  z-index: -1;
  position: absolute;
  top: 70px;
  right: -1px;
  width: 700px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--accent-color);
  height: 0px;
  background: var(--main-bg-color);
  opacity: 0;
  transition: ease-in-out 0.3s;
}
.cart_modal.open {
  z-index: 4;
  opacity: 1;
  height: auto;
}
.cart_list{
  height: auto;
  max-height: 350px;
  overflow: hidden;
  overflow-y: auto;
}
.cart_modal_title {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 5px;
  font-size: 26px;
  margin-bottom: 5px;
}
.modal_overlay {
  display: none;
}
.modal_overlay.open {
  z-index: 2;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cart_modal {
  display: flex;
  overflow: hidden;
  overflow-y: auto;
  flex-direction: column;
  padding: 20px;
}
.total_sum{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.buy_button{
  align-self: flex-end;
  width: 200px;
  color: white;
  background:var(--accent-color);
  height: 30px;
  border-radius: 6px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart_item_row {
  position: relative;
  display: flex;
  height: 170px;
  border-bottom: 1px solid var(--border-color);
  padding-block: 10px;
  align-items: center;
  gap: 10px;
}
.close_btn,
.delite_btn {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  object-fit: cover;
  background-image: url(https://i.postimg.cc/xCGGykVz/cross-mark.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}
.cart_item_row img {
  height: 100%;
  width: auto;
}

.image_card {
}
.product_description {
  flex: 1 1 100%;
}
.product_title {
}
.price {
}
.product_total_price {
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prodct_count_box {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgb(14, 20, 27);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
}
.couny_minus_btn {
}
.prodct_count {
}
.couny_plus_btn {
}

@media (max-width: 750px) {
  .cart_modal {
    width: 500px;
  }
  .cart_modal_title {
    font-size: 18px;
  }
  .empty_cart {
    font-size: 16px;
  }
}
@media (max-width: 550px) {
  .total_sum{
}
.buy_button{

  width: 120px;
  color: white;
  background:var(--accent-color);
  height: 30px;
  border-radius: 6px;
  font-weight: 900;
  font-size: 16px;
  
}
  .cart_modal {
    width: 350px;
  }
  .cart_item_row {
    padding-top: 15px;
    height: 100px;
  }
  .delite_btn {
    top: 2px;
    right: 2px;
    width: 15px;
    height: 15px;
  }
}

@media (max-width: 360px) {
  .cart_modal {
    width: 300px;
  }
}

@media (max-width: 500px) {
  .prodct_count_box {
    font-size: 12px;
  }
  form input:focus + button,
  form input:focus ~ button {
    width: 35px;
    opacity: 1;
  }
  .search_btn {
  }
  .header {
    height: 40px;
    gap: 2px;
  }
  .cart_img {
    width: 20px;
    height: 20px;
  }
  .header_logo {
    font-size: 15px;
  }
  input[type="search"] {
    padding: 5px;
  }
  input[type="search"]::-webkit-search-cancel-button {
    /* -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none; */
    width: 15px;
    height: 15px;
  }

  .search_input {
    font-size: 12px;
  }
  .cart_text,
  .cart_count {
    display: none;
  }
}
</style>
