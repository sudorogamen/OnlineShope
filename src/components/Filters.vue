<template>
  <div>
    <div class="filters_row">
      <button @click="openSlideBar($event)" class="filters_button">
        Фильтры
        <div class="filters_icon"><span></span><span></span><span></span></div>
      </button>
      <div class="sort_row">
        <select
          v-model="this.$store.state.sortValue"
          @change="sortProduct($event)"
          class="sort_button"
        >
          <option value="def">По умолчанию</option>
          <option value="up">По возрастанию</option>
          <option value="down">По убыванию</option>
        </select>
      </div>
      <div class="filters_slideBar">
        <button class="close_btn" @click="closeSlideBar($event)"></button>
        <div class="filters_content">
          <div class="filters_title">Фильтрация</div>
          <div class="category_filters">
            <p>По категориям:</p>
            <ul class="category_filters_list">
              <checkboxList
                :checkboxList="this.$store.state.filters.category"
                :selectedItems="this.$store.state.activeFilters.category"
                @selectedItems="setActiveCategories"
              ></checkboxList>
            </ul>
          </div>
          <div class="brand_filters">
            <p>По брендам:</p>
            <ul class="brand_filters_list">
              <checkboxList
                :checkboxList="this.$store.state.filters.brands"
                :selectedItems="this.$store.state.activeFilters.brands"
                @selectedItems="setActiveBrands"
              ></checkboxList>
            </ul>
          </div>
          <div class="price_range">
            <p>По цене:</p>
            <div class="price_range_inputs">
              <label>
                от
                <input
                  type="number"
                  v-model="this.$store.state.activeFilters.prices.min"
                  @input="changePrice($event)"
                  />
                  <span></span>
              </label>
              <label>
                до
                <input
                  type="number"
                  v-model="this.$store.state.activeFilters.prices.max"
                  @input="changePrice($event)"
                  />
                  <span></span>
              </label>
            </div>
          </div>
          <div>
            <button class="reset_def_btn" @click="resDef($event)">Сбросить по умолчанию</button>
          </div>
        </div>
        <div ref="filters_slideBar_buttons" class="filters_slideBar_buttons">
          <button class="reset_btn" @click="res($event)">Отмена</button>
          <button class="apply_btn" @click="addFilters($event)">Применить</button>
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
      saveFilters:{}
    };
  },
  props: {},
  methods: {
    resDef(e) {
      this.$store.commit('activeFiltersReset')
      this.closeSlideBar(e);
      this.$refs.filters_slideBar_buttons.classList.remove("active");
    },
    res(e) {
      this.$store.state.activeFilters = JSON.parse(JSON.stringify(this.saveFilters)),
      this.closeSlideBar(e);
      this.$refs.filters_slideBar_buttons.classList.remove("active");
    },
    changePrice(e) {
      e.target.closest(".price_range_inputs").classList.remove("err");
      this.$refs.filters_slideBar_buttons.classList.add("active");
      if (
      (  this.$store.state.activeFilters.prices.min >
        this.$store.state.activeFilters.prices.max)
        && 
        (this.$store.state.activeFilters.prices.min)
        && 
        (this.$store.state.activeFilters.prices.max)
      ) {
        e.target.closest(".price_range_inputs").classList.add("err");
        this.$refs.filters_slideBar_buttons.querySelector('.apply_btn').style.opacity = 0.3
        this.$refs.filters_slideBar_buttons.querySelector('.apply_btn').setAttribute("disabled", "")
        this.$refs.filters_slideBar_buttons.querySelector('.apply_btn').setAttribute("disabled", "")
        return false;
      }else{
        this.$refs.filters_slideBar_buttons.querySelector('.apply_btn').style.opacity = 1
        this.$refs.filters_slideBar_buttons.querySelector('.apply_btn').removeAttribute("disabled")
      }
    },
    setActiveCategories(items) {
      this.activeCategories = items;
      this.$refs.filters_slideBar_buttons.classList.add("active");
    },
    setActiveBrands(items) {
      this.activeBrands = items;
      this.$refs.filters_slideBar_buttons.classList.add("active");
    },

    addFilters(e) {
      this.$store.state.activeFilters.category = this.activeCategories;
      this.$store.state.activeFilters.brands = this.activeBrands;
      this.$store.getters.updateProducts;
      this.closeSlideBar(e);
      this.$refs.filters_slideBar_buttons.classList.remove("active");
    },
    sortProduct(e) {
      this.$store.getters.sortProduct;
    },
    openSlideBar(e) {
      this.saveFilters = JSON.parse(JSON.stringify(this.$store.state.activeFilters)),
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
  mounted() {},
};
</script>
<style scoped>
.sort_row select{
  cursor: pointer;
}
.sort_row {
  align-self: flex-end;
  font-size: 18px;
  
}
.filters_row {
  border-bottom: var(--border-color) 1px solid;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
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
  padding: 10px;
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

.reset_btn {
  background: rgb(71, 71, 71);
}
.apply_btn {
  background: var(--accent-color);
}
.reset_btn,
.apply_btn {
  transition: 0.6s;
  opacity: 0;
  padding-block: 8px;
  border-radius: 10px;
  width: 100%;
}
.price_range {
  padding-right: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.price_range_inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price_range_inputs label {
  display: flex;
  align-items: center;
  gap: 5px;
}
.price_range_inputs input {
  max-width: 150px;
  width: 80%;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  text-align: center;
}
.price_range_inputs.err input,
.price_range_inputs.err input:focus {
  border: 1px solid red;
}
.price_range_inputs input:focus {
  border: 1px solid var(--border-color);
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


input[type="number"] {
    -moz-appearance: textfield;
}
.filters_slideBar_buttons.active {
  height: 60px;
  visibility: visible;
  opacity: 1;
}
.filters_slideBar_buttons.active button {
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
  .filters_icon span {
  width: 15px;
  height: 3px;

}
  .sort_row, .filters_button{
    font-size: 15px;
  }
}
</style>
