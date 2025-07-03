<template>
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="scroll-to-top"
    title="Наверх"
  >
    ↑
  </button>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      showButton: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: var(--accent-color);
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 50%;
  font-size: 18px;
  width: 50px;
  height: 50px;
  opacity: 1;
  transition: all 0.3s ease;
}

.scroll-to-top:hover {
  opacity: 1;
}
</style>