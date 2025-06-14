<template>
  <div>
    <div class="filters_row">
      <button @click="openSlideBar($event)" class="filters_button">
        Filters
        <div class="filters_icon"><span></span><span></span><span></span></div>
      </button>
      <div class="sort_row">
        Sort by:
        <select
          v-model="sortValue"
          @change="sortProduct($event)"
          class="sort_button"
        >
          <option value="def">Default</option>
          <option value="up">Ascending</option>
          <option value="down">Descending</option>
        </select>
      </div>
      <div class="filters_slideBar">
        <button class="close_btn" @click="closeSlideBar($event)"></button>
        <div class="filters_slideBar_buttons">
          <button class="apply_btn">Apply</button
          ><button class="reset_btn">Reset</button>
        </div>
        
      </div>
      <div
        class="filters_slideBar_overlay"
        @click="closeSlideBar($event)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sortValue: "def",
      filterValues: [],
    };
  },
  props: {},
  methods: {
    sortProduct(e) {
      this.$store.commit("setSortValue", this.sortValue);
      this.$store.getters.sortProduct;
    },
    openSlideBar(e) {
      document.querySelector("body").style.overflow = "hidden";
      e.target.closest(".filters_row").classList.add("open");
      e.target
        .closest(".filters_row")
        .querySelector(".filters_slideBar_overlay")
        .classList.add("open");
    },
    closeSlideBar(e) {
      document.querySelector("body").style.overflow = "visible";
      e.target.closest(".filters_row").classList.remove("open");
      e.target
        .closest(".filters_row")
        .querySelector(".filters_slideBar_overlay")
        .classList.remove("open");
    },
  },
  mounted() {
    this.$store.state.sortValue
      ? (this.sortValue = this.$store.state.sortValue)
      : 0;
  },
};
</script>
<style scoped>
.filters_row {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.filters_button {
  display: flex;
  align-items: center;
  gap: 5px;
}
.filters_icon {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.filters_icon span {
  width: 20px;
  height: 4px;
  background: white;
  border-radius: 10px;
}
.filters_slideBar {
  overflow-y: auto;
  height: 100%;
  background: var(--main-bg-color);
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
  width: 35%;
}
.close_btn {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  object-fit: cover;
  background-image: url(https://i.postimg.cc/xCGGykVz/cross-mark.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
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
.filters_row.open .filters_slideBar_overlay {
  z-index: 1;
  opacity: 1;
}

.sort_row {
  align-self: flex-end;
  font-size: 14px;
}
select {
  background: var(--main-bg-color);
}

@media (max-width: 770px) {
  .filters_row.open .filters_slideBar {
    width: 45%;
  }
}
@media (max-width: 500px) {
  .filters_row.open .filters_slideBar {
    width: 100%;
  }
}
</style>
