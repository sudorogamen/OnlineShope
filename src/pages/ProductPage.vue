<template>
  <div ref="prodct_container" class="prodct_container" v-if="this.product">
    <RouterLink to="/" class="back_link"></RouterLink>
    <div class="slider_container">
      <swiper
        class="slider_comp"
        @openFull="open"
        :slides="this.product.src"                                  
      ></swiper>
      <div class="product_overlay" @click="close($event)">
        <button class="close_btn"></button>
      </div>
    </div>
    <div class="prodct_text_content">
      <div class="prodct_title">{{ this.product.name }}</div>
      <div class="product_price">
        <span class="price">{{ this.product.price }}</span
        ><span> ₽</span>
      </div>
      <div class="prodct_desc">
        {{ this.product.desc }}
        <div class="prodct_desc">{{ this.product.category }}</div>
        <div class="prodct_desc">{{ this.product.brand }}</div>
      </div>
      <div class="total_price">
        <p>Итоговая цена: {{ this.productCount * this.product.price }} ₽</p>
        <div class="prodct_count_box">
          <button
            class="couny_minus_btn"
            @click="
              () => {
                if (productCount > 1) this.productCount--;
              }
            "
          >
            -
          </button>
          <div class="prodct_count">{{ this.productCount }}</div>
          <button class="couny_plus_btn" @click="this.productCount++">+</button>
        </div>
      </div>
      <button
        @click="addBuyProduct($event)"
        class="buy_button"
        ref="add_to_cart_btn"
      >
        Добавить в корзину
      </button>
    </div>
    <div class="notification">Товар добавлен!</div>
  </div>
  <div class="product_err" v-else>Данный товар не существует</div>
</template>
<script>
import swiper from "@/components/swiper.vue";

export default {
  components: { swiper },
  data() {
    return {
      productCount: 1,
      product: {},
    };
  },
  props: {},
  methods: {
    addBuyProduct(e) {
      this.$store.commit("addBuyProduct", {
        ...this.product,
        count: this.productCount,
      });
      e.target.setAttribute("disabled", "");
      document.querySelector(".notification").classList.add("show");
      document.querySelector(".header_cart_button").classList.add("show");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        document.querySelector(".header_cart_button").classList.remove("show");
         document.querySelector(".notification").classList.remove("show");
        e.target.removeAttribute("disabled");
      }, 1500);
    },
    open() {
      document.querySelector(".slider_container").classList.add("open");
      document.querySelector(".product_overlay").classList.add("open");
    },
    close(e) {
      document.querySelector(".slider_container").classList.remove("open");
      e.target.closest(".product_overlay").classList.remove("open");
    },
  },
  mounted() {
    this.product = this.$store.state.productsList.find(
      (item) => item.id == this.$route.params.id
    );

    this.$store.getters.filtersCreate;
  },
};
</script>
<style scoped>
.product_overlay {
  display: none;
}

.product_overlay.open {
  background: var(--main-bg-color);
  position: fixed;
  top: 0;

  left: 0;
  width: 100%;
  display: block;
  height: 100%;
}
.close_btn {
  display: none;
}

.product_overlay.open .close_btn {
  display: block;
  position: fixed;
  right: 10px;
  top: 10px;
  width: 45px;
  height: 45px;
  object-fit: cover;
  background-image: url(https://i.postimg.cc/xCGGykVz/cross-mark.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  z-index: 5;
}

.prodct_container {
  padding-top: 50px;
  margin-top: 20px;
  position: relative;
  color: white;
  font-size: 30px;
  width: 100%;
  display: flex;
  gap: 100px;
  z-index: 0;
}
.notification {
  position: fixed;
  bottom: 20px;
  right: -100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  background: var(--accent-color);
  color: white;
  border-radius: 4px;
  transition: right 0.5s ease-in-out;
  opacity: 0;
}
.notification.show {
  right: 20px;
  opacity: 1;
}
.back_link {
  position: absolute;
  left: -5px;
  top: 0;
  width: 45px;
  height: 45px;
  object-fit: cover;
  background-image: url(https://i.postimg.cc/SNhcFFwS/circle-arrow-left.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.slider_container {
  position: relative;
  width: 500px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider_container.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .slider_comp {
    position: relative;
    width: 600px;
    height: 750px;
  }
}

.prodct_text_content {
  width: 350px;
  min-height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
}


.prodct_desc {
  flex: 0 1 40%;
}

.total_price {
  display: flex;
  width: 100%;
  justify-content: space-between;
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


.buy_button {
  width: 100%;
  color: white;
  background: var(--accent-color);
  height: 40px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-thumb {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 20px;
  transition: 0.8s;
}

.product_err {
  z-index: -2;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 1440px) {
  .slider_container.open {
    .slider_comp {
      width: 650px;
      height: auto;
    }
  }
}

@media (max-width: 1024px) {
  .slider_container.open {
    .slider_comp {
      width: 450px;
      height: auto;
    }
  }
}

@media (max-width: 900px) {
  .prodct_container {
    font-size: 24px;
    gap: 10px;
    justify-content: space-between;
  }
  .slider_container {
    width: 400px;
    height: 500px;
  }
}

@media (max-width: 700px) {
  .slider_container.open {
    .slider_comp {
      width: 400px;
      height: auto;
    }
  }
  .prodct_text_content {
    width: 450px;
    align-self: center;
  }
  .prodct_container {
    gap: 10px;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .slider_container {
    align-self: center;
    width: 450px;
    height: auto;
  }
}

@media (max-width: 440px) {
  .slider_container.open {
    .slider_comp {
      position: relative;
      margin-inline: 10px;
      width: 100%;
      height: auto;
    }
  }

  .slider_container {
    width: 100%;
  }
  .prodct_text_content {
    width: 100%;
    font-size: 20px;
  }
}
</style>
