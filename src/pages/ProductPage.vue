<template>
  <div class="prodct_container">
    <RouterLink to="/" class="back_link"></RouterLink>
    <div class="slider_container">
      <swiper class="slider_comp" @openFull="open" :slides="this.product.src"></swiper>
      <div class="product_overlay" @click="close($event)">
       <button class="close_btn"></button>
      </div>
    </div>
    <div class="prodct_text_content">
     <div class="prodct_title">{{ this.product.name }}</div>
     <div class="prodct_price">{{ this.product.price }}</div>
     <div class="prodct_desc">{{ this.product.desc }}</div>
     <div class="prodct_count_box">
       <button class="couny_minus_btn">-</button>
       <div class="prodct_count">{{ this.productCount }}</div>
       <button class="couny_plus_btn">+</button>
     </div>
      <button @click="" class="buy-button">Add to cart</button>
    </div>
  </div>
</template>
<script>
import swiper from "@/components/swiper.vue";

export default {
  components: { swiper },
  data() {
    return {
      productCount:0


    };
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

    e.target.closest(".product_overlay").classList.remove("open");
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
.close_btn{
  display: none;
}

.product_overlay.open .close_btn{

    display: block;
  position: absolute;
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
  
  width: 320px;
  min-height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.prodct_title {
}
.prodct_price {
}
.buy-button {
  color: white;
  background: rgba(255, 89, 0, 1);
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.prodct_desc {
}
.prodct_count_box {
  display: flex;
  align-items: center;
  gap: 8px;
}
.couny_minus_btn {
}
.prodct_count {
}
.couny_plus_btn {
}








@media (max-width: 450px) {
/*   
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
*/
.slider_container.open{

  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  .slider_comp{
  position: relative;
   width: 100%;
}
}






/* */

.prodct_container {
  gap: 10px;
  flex-direction: column;
  padding-bottom: 20px;
}
.back_link {
}
.slider_container {
  width: 100%;
  height: auto;
}
.slider_comp {
}
.product_overlay {
}
.close_btn {
}
.prodct_text_content {
  width: 100%;
}
.prodct_title {
}
.prodct_price {
}
.prodct_desc {
}
.prodct_count_box {
}
.couny_minus_btn {
}
.prodct_count {
}
.couny_plus_btn {
}
.buy-button {
}



}










</style>
