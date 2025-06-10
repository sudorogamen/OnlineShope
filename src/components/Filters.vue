<template>
<div>
     <div class="filters_row">
      <button @click="openSlideBar($event)" class="Filters_button">
        Filters
      </button>
      <div class="filters_slideBar">
        
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
        <div class="te">sdasdasdsdasdas</div>
      </div>
      <div class="filters_slideBar_overlay" @click="closeSlideBar($event)"></div>
    </div>
</div>
</template>
<script>
export default {
components: {
 },
data() {
 return {};
 },
 props: {},
methods: {
  openSlideBar(e) {
    document.querySelector('body').style.overflow = 'hidden'
    e.target
      .closest(".filters_row")
      .classList.add("open");
   e.target
      .closest(".filters_row")
      .querySelector(".filters_slideBar_overlay")
      .classList.add("open");
    
  },
  closeSlideBar(e) {
        document.querySelector('body').style.overflow = 'visible'
    e.target
      .closest(".filters_row")
      .classList.remove("open");
   e.target
      .closest(".filters_row")
      .querySelector(".filters_slideBar_overlay")
      .classList.remove("open");
  },
},
};
</script>
<style scoped>
.filters_row {
}
.Filters_button {
}
.filters_slideBar {
  overflow-y: auto;
  height: 100%;
  background: #000;
width: 0;
opacity: 0;
z-index: -2;
position: fixed;
top: 0;
left: 0;
  transition: ease-in-out 0.3s;
}
.filters_row.open .filters_slideBar {
  opacity: 1;
  z-index: 2;
  width: 400px;
  
}

.filters_slideBar_overlay {
  position: fixed;
    opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.filters_row.open  .filters_slideBar_overlay {
    z-index: 1;
      opacity: 1;
}


</style>