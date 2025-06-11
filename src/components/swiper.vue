<template>
  <div class="wripper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(slide, index) in this.slides"
          :key="index"
        >
          <img @click="$emit('openFull')" :src="slide" :alt="index" />
        </div>
      </div>

      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  name: "MySwiper",
  data() {
    return {
      swiper: null,
    };
  },
  props: {
    slides: {
      type: Array,
    },
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      modules: [Navigation, Pagination],

      loop: true,
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  
    });
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  },
};
</script>

<style>
img {
  cursor: pointer;
}
.swiper-pagination-bullet {
  background: rgb(116, 115, 115);
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background:var(--accent-color);
}
.wripper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper-button-next {
  right: 0;
}
.swiper-button-prev {
  left: 0;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  color:var(--accent-color);
}
</style>

