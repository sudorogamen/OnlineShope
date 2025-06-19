<template>
  <div>
    <Filters class="filters"></Filters>
    <ProductsRow></ProductsRow>
  </div>
</template>
<script>
import ProductsRow from "@/components/ProductsRow.vue";
import Filters from "@/components/Filters.vue";
export default {
  components: {
    ProductsRow,
    Filters,
  },
  data() {
    return {
    };
  },
  props: {
  },
  methods: {
  },mounted(){
    if (this.$store.state.savedPosition.y) {
        window.scrollTo({top: this.$store.state.savedPosition.y})
    } 


    this.$store.getters.filtersCreate;
   
  }
 
};
</script>
<style scoped>
.filters {
  margin-top: 10px;
}
</style>
