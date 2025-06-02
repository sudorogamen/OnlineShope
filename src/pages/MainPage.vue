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
    return { products: [] };
  },
  props: {},
  methods: {},
  beforeMount() {
    this.products = MyList;
  },
};
</script>
<style scoped>
*{
  color: rgba(205, 207, 208, 1);
      user-select: none;

}


</style>
