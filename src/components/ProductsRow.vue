<template>
  <div class="products-container">
    <ul class="js-products-list">
      <li
        @click="saveToStorage(product)"
        class="js-product-item"
        :id="product.id"
        v-for="product in   this.$store.state.productsList"
      >
        <img :src="product.src[0]" class="image-card" />
        <div class="product-description">
          <h3 class="product-title">{{ product.name }}</h3>
        </div>
        <div class="product-price">
          <span class="price">{{ product.price }}</span
          ><span> ₽</span>
        </div>
        <button @click="saveToStorage(product)" class="buy-button">
          Buy now
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
  },
  methods: {
    saveToStorage(product) {
      this.$router.push({
        name: "ProductPage",
        params: {
          id: product.id,
        },
      });
    },
  },
};
</script>
<style scoped>

.buy-button {
  color: white;
  background:var(--accent-color);
  width: 100%;
  border-radius: 5px;
  height: 30px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-container {
  background: var(--main-bg-color);
  display: flex;
  justify-self: center;
  flex-direction: column;
  width: 100%;
}

.js-products-list {
  display: grid;
  gap: 20px;
  padding: 15px 0;
  justify-content: center;
}

.js-product-item {
  color: rgba(205, 207, 208, 1);
  background: var(--main-bg-color);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease;
}

.image-card {
  width: 100%;
  height: 80%;
  border-radius: 5px;
}

.product-title {
}

.product-description,
.product-price {
  align-self: flex-start;
  font-size: 20px;
}
.price {
}

@media (max-width: 399px) {
  .js-products-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .js-product-item {
    padding: 5px;
  }
}
@media (max-width: 599px) and (min-width: 400px) {
  .js-products-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .js-product-item {
    padding: 5px;
  }
}

@media (max-width: 899px) {
     .js-products-list{gap: 5px;}
}
@media (min-width: 600px) and (max-width: 899px) {
  .js-products-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 900px) {
  .js-products-list {
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
  }
  .js-product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

@media (min-width: 1200px) {
  .js-products-list {
    grid-template-columns: repeat(5, 1fr);
    margin: 0 auto;
  }
}
</style>
