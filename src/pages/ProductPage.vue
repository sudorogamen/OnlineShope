<template>
  <div class="prodct_container">
    <RouterLink to="/" class="back_link"></RouterLink>
    <div class="slider_container">
      <swiper class="slider_comp" @openFull="open" :slides="this.product.src"></swiper>
      <div class="product_overlay" @click="close($event)"></div>
    </div>
    <div class="prodct_text_content">
      <p class="prodct_title">{{ this.product.name }}</p>
      <p class="prodct_price">{{ this.product.price }}</p>
      <button @click="" class="buy-button">Add to cart</button>
    </div>
  </div>
</template>
<script>
import swiper from "@/components/swiper.vue";

export default {
  components: { swiper },
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
    },
  },
  mounted() {
    // Доступно как props
  },
  methods: {
open(){
  document.querySelector('.slider_container').classList.add('open')
  document.querySelector('.product_overlay').classList.add('open')
  
   
},
close(e){
    document.querySelector('.slider_container').classList.remove('open')

    e.target.classList.remove("open");
}

    
  },
};
</script>
<style scoped>



.product_overlay{
   display: none;
  }



.product_overlay.open {
    background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;    
  display: block;
  height: 100%;
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

.back_link {
  position: absolute;
  left:  -5px;
  top: 0;
  width: 40px;
  height: 40px;
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
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider_container.open{

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .slider_comp{
  position: relative;
    width: 700px;
  height: 750px;
}



}

.prodct_text_content {
  width: 400px;
  min-height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prodct_title {
}
.prodct_price {
}
.buy-button {
  color: white;
  background: rgba(255, 89, 0, 1);
  width: 300px;
  height: 40px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}



@media (max-width: 399px) {
  
.slider_comp{
  position: relative;
    width: 150px;
  height: 250px;
}
.slider_container {
  position: relative;
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider_container.open{

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .slider_comp{
  position: relative;
    width: 200px;
  height: 300px;
}
}

}










</style>
