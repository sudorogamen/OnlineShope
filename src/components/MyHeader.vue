<template>
  <div class="header">
    <div class="header_logo">
      <button @click="home">LOGO</button>
    </div>
    <form 
      @submit="search($event)"
      >
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
        <span class="cart_count">{{ this.buyItemsCount }}</span>
      </button>
      <div class="cart_modal">
        <div v-for="product in buyList">
          <div>{{ product.id }}: {{ product.count }}</div>
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
  props: {
    buyList: {
      type: Array,
    },
    buyItemsCount: {},
  },
  methods: {
   home(){
    this.searchValue = ''
      this.$emit('searchProducts', this.searchValue)
this.$router.push('/')
   },
    blur(e) {
      e.target.closest("form").querySelector('input').blur();

    },
    search(e) {
    
        this.$emit('searchProducts', this.searchValue)
      this.$router.push("/");
      this.blur(e);
      
      
    },
    openModal(e) {
      e.target
        .closest(".header_cart_row")
        .querySelector(".cart_modal")
        .classList.add("open");
      e.target
        .closest("body")
        .querySelector(".modal_overlay")
        .classList.add("open");
    },
    close_modal(e) {
      e.target
        .closest("body")
        .querySelector(".cart_modal")
        .classList.remove("open");
      e.target.classList.remove("open");
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
  border: 1px solid rgba(255, 89, 0, 1);
}

.search_input {
  border: 1px solid rgba(141, 140, 139, 1);
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
  border-color: rgba(255, 89, 0, 1);
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
  border: 1px solid rgba(141, 140, 139, 1);
}
.cart_img {
  width: 30px;
  height: 30px;
}
.cart_text {
  font-size: 20px;
}
.cart_count {
  font-size: 18px;
  font-weight: 600;
  border-radius: 50%;
  background: rgba(255, 89, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.cart_modal {
  z-index: -1;
  position: absolute;
  top: 70px;
  right: -1px;
  width: 400px;
  height: 0px;
  background: #000;
  opacity: 0;
  transition: ease-in-out 0.3s;
}
.cart_modal.open {
  z-index: 4;
  opacity: 1;
  height: 400px;
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

@media (max-width: 450px) {
  .header {
    height: 40px;
  }
  .header_logo {
    font-size: 24px;
  }
  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: none;
  }
  /* form.focus .search_btn {
    width: 40px;
    border-left: 0;
  }
  form.focus .search_input {
    border-right: 0;
  } */
  .search_input {
    font-size: 14px;
  }
  .cart_text,
  .cart_count {
    display: none;
  }
}
</style>
