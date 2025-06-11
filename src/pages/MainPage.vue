<template>
  <div>
    <Filters @sortProduct="sortProduct" class="filters"></Filters>
    <ProductsRow :productsArray="products"></ProductsRow>
  </div>
</template>
<script>
import ProductsRow from "@/components/ProductsRow.vue";
import MyList from "@/My-list";
import Filters from "@/components/Filters.vue";
export default {
  components: {
    ProductsRow,Filters
  },
  data() {
    return {
       products: [],
       searchProducts:false,
       sortValue:"",
     };
  },
  props: {
    searchValue:{
type:String
    },
  },
  watch:{
    sortValue(n){
    if (n == 'def') {
    this.products = this.products.toSorted((a, b) => {
      return a.id - b.id
    })
  }else{
    this.products = this.products.toSorted((a, b) => {
            const priceA = parseInt(a.price.replace(/\s/g, ""));
          const priceB = parseInt(b.price.replace(/\s/g, ""));
           if (n === "up") {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
  });
  }
      
    },
searchValue(n){
  this.searchProducts=true
},
searchProducts(n){

  if (this.searchValue == '') {
    this.products = MyList;
  }else{
    this.products = [];
    MyList.forEach(el => {
      if ( el.name.replace(/\s/g, "").toUpperCase().trim().includes(this.searchValue.replace(/\s/g, "").toUpperCase().trim())) {
      this.products.push({...el});
    }
  });
  }
    this.searchProducts=false
}
  },
  methods: {
    sortProduct(sortValue){
   this.sortValue = sortValue
    },
  },
  beforeMount() {
    if (this.searchValue != '') {
      
        this.searchProducts=true
    }else{
      
      this.products = MyList;
    }
  },
};
</script>
<style scoped>

.filters{
  margin-top: 10px;
}

</style>
