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
          v-model="this.$store.state.sortValue"
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

        <div class="filters_content">
          <div class="filters_title">Filters</div>
          <div class="category_filters">
            <p>By Category:</p>
            <ul class="category_filters_list">
              <checkboxList
                :checkboxList="this.$store.state.filters.category"
                :selectedItems="this.$store.state.activeFilters.category"
                @selectedItems="setActiveCategories"
              ></checkboxList>
            </ul>
          </div>
          <div class="brand_filters">
            <p>By Brand:</p>
            <ul class="brand_filters_list">
              <checkboxList
                :checkboxList="this.$store.state.filters.brands"
                :selectedItems="this.$store.state.activeFilters.brands"
                @selectedItems="setActiveBrands"
              ></checkboxList>
            </ul>
          </div>
        </div>
        <div ref="apply_btn" class="filters_slideBar_buttons">
          <button class="apply_btn" @click="addFilters($event)">Apply</button>
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
import checkboxList from "./checkboxList.vue";
export default {
  components: { checkboxList },
  data() {
    return {
      activeCategories: [],
      activeBrands: [],
    };
  },
  props: {},
  methods: {

    setActiveCategories(items) {
      this.activeCategories = items;
      this.$refs.apply_btn.classList.add("active") 
    },
    setActiveBrands(items) {
      this.activeBrands = items;
      this.$refs.apply_btn.classList.add("active") 
    },

    addFilters(e) {
      this.$store.state.activeFilters.category = this.activeCategories;
      this.$store.state.activeFilters.brands = this.activeBrands;
      this.$store.getters.updateProducts;
      this.closeSlideBar(e);
      this.$refs.apply_btn.classList.remove("active");
    },
    sortProduct(e) {
      this.$store.getters.sortProduct;
    },
    openSlideBar(e) {
      (this.activeCategories = this.$store.state.activeFilters.category),
        (this.activeBrands = this.$store.state.activeFilters.brands),
        (document.querySelector("body").style.overflow = "hidden");
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
  max-height: 100%;
  height: 100%;
  background: var(--main-bg-color);
  width: 0;
  opacity: 0;
  z-index: -2;
  position: fixed;
  top: 0;
  left: 0;
  transition: ease-in-out 0.3s;
  display: flex;
  flex-direction: column;
}
.filters_row.open .filters_slideBar {
  opacity: 1;
  z-index: 2;
  width: 35%;
}

.filters_content {
  padding-bottom: 60px;
  padding-top: 10px;
  overflow-y: auto;
  flex: 1 1 100%;
  padding-left: 10px;
}
.filters_content div + div {
  padding-block: 10px;
  border-top: 1px solid var(--accent-color);
  margin-top: 10px;
}
.filters_content li > :not(:first-child) {
  padding-left: 10px;
}

.filters_content ul li div:after {
  content: "x";
  position: absolute;
  left: 4px;
  top: 2px;
}

.filters_slideBar_buttons {
  position: absolute;
  visibility: hidden;
  bottom: 0;
  left: 0;
  height: 0px;
  opacity: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  transition: 0.6s;
  background: none;
}
.apply_btn {
  transition: 0.6s;
  opacity: 0;
  margin: 0 20px;
  background: var(--accent-color);
  padding-block: 8px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}
.filters_slideBar_buttons.active {
  height: 60px;
  visibility: visible;
  opacity: 1;
}
.filters_slideBar_buttons.active .apply_btn {
  opacity: 1;
}

.close_btn {
  position: absolute;
  right: 15px;
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
    width: 80%;
  }
}
</style>
