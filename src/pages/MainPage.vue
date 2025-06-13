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
  },
 
};
</script>
<style scoped>
.filters {
  margin-top: 10px;
}
</style>
