<template>
  <div>
    <div class="fil">
       Filters
    </div>
    <ProductsRow :productsArray="products"></ProductsRow>
  </div>
</template>
<script>
import ProductsRow from "@/components/ProductsRow.vue";
import MyList from "@/My-list";
export default {
  components: {
    ProductsRow,
  },
  data() {
    return {
       products: [],
     
     };
  },
  props: {
    searchValue:{
type:String
    }
  },
  watch:{
searchValue(n){

  if (n == '') {
    
    this.products = MyList;
  }else{
    this.products = [];
    MyList.forEach(el => {
      if ( el.name.replace(/\s/g, "").toUpperCase().trim() == n.replace(/\s/g, "").toUpperCase().trim()) {
      this.products.push({...el});
     console.log(el)
    }
  });
  }
}
  },
  methods: {},
  beforeMount() {
    if (this.searchValue != '') {
      
      this.products =[ MyList[2],MyList[2],MyList[2]];
    }else{

      this.products = MyList;
    }
  },
};
</script>
<style scoped>
*{
  color: rgba(205, 207, 208, 1);
      user-select: none;

}


</style>
