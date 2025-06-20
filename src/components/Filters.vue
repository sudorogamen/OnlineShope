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

        <div class="filters_content">
          <div class="filters_title">Filters</div>

          <div class="category_filters">
            <p>--------------------------</p>
            <ul class="category_filters_list">
              <checkboxList
              :checkboxList="this.$store.state.filters.category"
              :selectedItems="this.$store.state.activeFilters.category"
              @selectedItems="setActiveCategories"
              ></checkboxList>
            </ul>
          </div>
          <div class="brand_filters">
            <p>--------------------------</p>
            <ul class="brand_filters_list">
              <checkboxList
                :checkboxList="this.$store.state.filters.brands"
                :selectedItems="this.$store.state.activeFilters.brands"
                @selectedItems="setActiveBrands"
              ></checkboxList>
            </ul>
          </div>
        </div>
        <div class="filters_slideBar_buttons">
          <button ref="apply_btn" class="apply_btn" @click="addFilters($event)">Apply</button
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
import checkboxList from "./checkboxList.vue";
export default {
  components: { checkboxList },
  data() {
    return {
      sortValue:'',
      activeCategories:[],
      activeBrands:[],
    };
  },
  props: {},
  methods: {
  
     setActiveCategories(items){
      this.activeCategories = items
      if ([...this.activeCategories.filter((item) => item != 'all')].length == [...this.$store.state.activeFilters.category].length) {
        this.$refs.apply_btn.classList.remove('active')
      }else{
        this.$refs.apply_btn.classList.add('active')
      }
    },
    setActiveBrands(items){
      this.activeBrands = items
     if ([...this.activeBrands.filter((item) => item != 'all')].length == [...this.$store.state.activeFilters.brands].length) {
        this.$refs.apply_btn.classList.remove('active')
      }else{
        this.$refs.apply_btn.classList.add('active')
      }
    },
    addFilters(e){
      this.$store.state.activeFilters.category = this.activeCategories
      this.$store.state.activeFilters.brands = this.activeBrands
      this.$store.getters.updateProducts
      this.closeSlideBar(e)
      this.$refs.apply_btn.classList.remove('active')
     },
    sortProduct(e) {
      this.$store.commit("setSortValue", this.sortValue);
      this.$store.getters.sortProduct;
    },
    openSlideBar(e) {
      this.activeCategories = this.$store.state.activeFilters.category ,
  this.activeBrands = this.$store.state.activeFilters.brands,
         this.$store.getters.filtersCreate;
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
  overflow-y: auto;
  flex: 1 1 100%;
}

.filters_slideBar_buttons {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.apply_btn.active {
background: red;
}
.reset_btn {
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
