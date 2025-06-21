<template>
  <div ref="prodct_container" class="prodct_container">
    <RouterLink to="/" class="back_link"></RouterLink>
    <div class="slider_container">
      <swiper class="slider_comp" @openFull="open" :slides="this.product.src"></swiper>
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
     <div class="prodct_desc">{{ this.product.desc }}
        <div class="prodct_desc">{{ this.product.category }}</div>
     <div class="prodct_desc">{{ this.product.brand }}</div>
     </div>
     <div class="total_price">
      <p>Total price: {{ this.productCount *  this.product.price }}</p>
         <div class="prodct_count_box">
         <button class="couny_minus_btn" @click="()=>{if(productCount>1)this.productCount--}">-</button>
         <div class="prodct_count">{{ this.productCount }}</div>
         <button class="couny_plus_btn" @click="this.productCount++">+</button>
       </div>
     </div>
     <button @click="addBuyProduct($event)" class="buy_button" ref="add_to_cart_btn">Add to cart</button>
    </div>
  </div>
</template>
<script>
import swiper from "@/components/swiper.vue";

export default {
  components: { swiper },
  data() {
    return {
      productCount:1,
      product:{}

    };
  },
  props: {
   
  },
  mounted() {
    // Доступно как props
  },
  methods: {
    addBuyProduct(e){  
      this.$store.commit('addBuyProduct', {...this.product, count:this.productCount})
      



e.target.setAttribute('disabled', '');
let thumb = document.createElement("div");
thumb.innerHTML = `📦`
thumb.classList.add("product-thumb")
this.$refs.prodct_container.append(thumb)
const cartIconRect = document.querySelector('.header_cart_button').getBoundingClientRect();
const buttonRect = e.target.getBoundingClientRect();
console.log(buttonRect);
console.log(cartIconRect);
thumb.style.position = 'fixed'
thumb.style.left = (buttonRect.left ) + 'px';
thumb.style.top = (buttonRect.top ) + 'px';
thumb.style.transition ='all 0.8s'
thumb.style.left = (cartIconRect.left ) + 'px';
thumb.style.top = (cartIconRect.top ) + 'px';

setTimeout(() => {
    e.target.removeAttribute('disabled');
   thumb.remove()
  }, 800);








    },
open(){
  document.querySelector('.slider_container').classList.add('open')
  document.querySelector('.product_overlay').classList.add('open')
  
   
},
close(e){
    document.querySelector('.slider_container').classList.remove('open')
    e.target.closest(".product_overlay").classList.remove("open");
}

    
  },
  mounted(){
    this.product = this.$store.state.productsList.find(item => item.id == this.$route.params.id)
    this.$store.getters.filtersCreate;
  }
};
</script>
<style scoped>



.product_overlay{
   display: none;
  }



.product_overlay.open {
    background:var(--main-bg-color);
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
.prodct_title {
}
.prodct_price {
}



.prodct_desc {
  flex: 0 1 40%;
}


.total_price{
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
  border: 1px solid  var(--border-color);
}
.couny_minus_btn,
.couny_plus_btn {

}
.prodct_count {
}

.buy_button {
  width: 100%;
  color: white;
  background:var(--accent-color);
  height: 40px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

}

.product-thumb{
  position: fixed;
  top: 0;
  left: 0;
  font-size: 20px;
  transition: 0.8s ;
}







@media (max-width: 1440px) {
  
  .slider_container.open{

  .slider_comp{

  width: 650px;
  height: 720px;
  
  }
  }
}


@media (max-width: 1024px) {

    .slider_container.open{

  .slider_comp{

   width: 450px;
   height: 600px;
 
}
}

}


@media (max-width: 900px) {
  
  
  .prodct_container {
    font-size: 24px;
    gap: 10px;
    justify-content: space-between;
  }
.slider_container  {
  width: 400px;
  height: 500px;
}
}



@media (max-width: 700px) {
    .slider_container.open{

  .slider_comp{

   width: 450px;
   height: 550px;
 
}
}
.prodct_text_content{
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




@media (max-width:440px) {

  .slider_container.open{
    
  .slider_comp{
  position: relative;
 margin-inline: 10px;
   width: 100%;
   height: 400px;
}
}

.slider_container {
  width: 100%;
}
.prodct_text_content {
  width: 100%;
}

/* */


.back_link {
}

.slider_comp {
}
.product_overlay {
}
.close_btn {
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
.buy_button {
}



}


</style>
