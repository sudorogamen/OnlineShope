import { createStore } from "vuex";
import MyLlist from "@/My-list";
export default createStore({
  state: {
    productsList: [],
    sortValue: "",
    searchValue: "",
    buyList: [],
    buyItemsCount: 0,
    totalSum: 0,
  },
  getters: {
    //поиск товаров
    searchProduct(state) {
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
      if (state.searchValue == "") {
        state.productsList = MyLlist;
      } else {
        getters.searchProduct;
      }

      //проверка сортировки
      if (state.sortValue) {
        getters.sortProduct;
      }

      return state.productsList;
    },
  },
  mutations: {
    setProductsList(state, value) {
      state.productsList = $store.getters.get;
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
    addBuyProduct(state, product,) {
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
      this.commit('setTotalSum')
    },
    deliteBuyProduct(state, product,) {
      state.buyList = state.buyList.filter((element) => {
        return element.id != product.id;
      });
      state.buyItemsCount -= product.count;
      this.commit('setTotalSum')
    },
    setBuyItemsCount(state, product) {
      state.buyList.forEach((element) => {
        if (element.id == product.id) {
          if (product.value == "plus") {
            element.count++;
            state.buyItemsCount++;
               this.commit('setTotalSum')
          } else {
            if (element.count > 1) {
              element.count--;
              state.buyItemsCount--;
                 this.commit('setTotalSum')
            }
          }
        }
      });
    },
    setTotalSum(state){
      state.totalSum = 0
      state.buyList.forEach(el => {
        state.totalSum += parseInt(el.price * el.count)
      })
    },
  },
});
