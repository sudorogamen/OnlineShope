<template>
  <div>
    
    <p>{{ this.product.name }}</p>
    <p>{{ this.product.price }}</p>
    <div class="slider_container"><swiper :slides="this.product.src" ></swiper></div>
    <RouterLink to="/">BACK</RouterLink>
    <div>   </div>
 
    
  </div>
</template>
<script>
import swiper from '@/components/swiper.vue';



export default {
  components: {swiper},
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
  methods: {},
};
</script>
<style scoped>
* {
  color: white;
  font-size: 30px;
}

.slider_container{
width: 500px;
height: 600px;
}


</style>
