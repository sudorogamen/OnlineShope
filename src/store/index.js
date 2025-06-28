import { createStore } from "vuex";
import MyLlist from "@/My-list";
export default createStore({
  state: {
    productsList: [],
    savedPosition: {},
    sortValue: "def",
    searchValue: "",
    buyList: [],
    buyItemsCount: 0,
    totalSum: 0,
    filters: {
      category: [],
      brands: [],
      prices: {
        min: 0,
        max: 0,
      },
    },
    activeFilters: {
      category: [],
      brands: [],
      prices: {
        min: 0,
        max: 0,
      },
    },
  },
  getters: {
    //создание фильтров
    filtersCreate: (state) => (inputArray) => {
      let uniqueCategories = [...new Set(inputArray.map((item) => item.category))];
      let uniqueBrands = [...new Set(inputArray.map((item) => item.brand))];
      let prices = [...new Set(inputArray.map((item) => item.price))];
      state.filters.category = uniqueCategories;
      state.filters.brands = uniqueBrands;
      state.filters.prices.max = Math.max(...prices);
      state.filters.prices.min = Math.min(...prices);
      return
    },
    










 
 filtersByCategory(state) {
      state.productsList = state.productsList.filter((item) =>
        state.activeFilters.category.includes(item.category) 
     );
    },
    filtersByBrand(state) {
      state.productsList = state.productsList.filter((item) => 
        state.activeFilters.brands.includes(item.brand)
     );
    },


    



    //поиск товаров

    
    searchProduct(state,getters) {
      getters.filtersCreate([...MyLlist]);
 
      state.productsList = [];
      MyLlist.forEach((el) => {
        if (
          el.name
          .replace(/\s/g, "")
          .toUpperCase()
          .trim()
          .includes(state.searchValue.replace(/\s/g, "").toUpperCase().trim())
        ) {
          state.productsList.push({ ...el });
        }
        
      });
 

    },





    //сортировка товаров
    sortProduct(state) {
      if (state.sortValue == "def") {
        state.productsList = state.productsList.toSorted((a, b) => {
          return a.id - b.id;
        });
      } else {
        state.productsList = state.productsList.toSorted((a, b) => {
          const priceA = parseInt(a.price.replace(/\s/g, ""));
          const priceB = parseInt(b.price.replace(/\s/g, ""));
          if (state.sortValue === "up") {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
        });
      }
    },
    
    //обновление списка товааров
    updateProducts(state, getters) {
     
      //проверка поиска
      // if (state.searchValue == '') {
      //   state.productsList = [...MyLlist]
      // } else {
      // }
      getters.searchProduct;

      getters.filtersCreate([...state.productsList]);





      if (state.activeFilters.category.length) {
        getters.filtersByCategory
      }
      if (state.activeFilters.brands.length) {
        getters.filtersByBrand
      }
      //проверка сортировки
      if (state.sortValue) {
        getters.sortProduct;
      }

     
      return state.productsList;
    },
    
  },
  mutations: {
     activeFiltersReset(state) {
  state.activeFilters = {...state.filters}
  this.getters.updateProducts
 
  
 },
    setSortValue(state, value) {
      state.sortValue = value;
    },
    setSearchValue(state, value) {
      state.searchValue = value;
    },
    setFilterValue(state, value) {
      state.sortValue = value;
    },
    addBuyProduct(state, product) {
      let newItem = true;
      state.buyList.forEach((element) => {
        if (element.id == product.id) {
          element.count += product.count;
          newItem = false;
        }
      });
      if (newItem) {
        state.buyList.push({ ...product, count: product.count });
      }
      state.buyItemsCount += product.count;
      this.commit("setTotalSum");
    },
    deliteBuyProduct(state, product) {
      state.buyList = state.buyList.filter((element) => {
        return element.id != product.id;
      });
      state.buyItemsCount -= product.count;
      this.commit("setTotalSum");
    },
    setBuyItemsCount(state, product) {
      state.buyList.forEach((element) => {
        if (element.id == product.id) {
          if (product.value == "plus") {
            element.count++;
            state.buyItemsCount++;
            this.commit("setTotalSum");
          } else {
            if (element.count > 1) {
              element.count--;
              state.buyItemsCount--;
              this.commit("setTotalSum");
            }
          }
        }
      });
    },
    setTotalSum(state) {
      state.totalSum = 0;
      state.buyList.forEach((el) => {
        state.totalSum += parseInt(el.price * el.count);
      });
    },
  },
});
