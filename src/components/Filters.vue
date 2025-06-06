<template>
<div>
     <div class="filters_row">
      <button @click="open_slideBar($event)" class="Filters_button">
        Filters
      </button>
      <div class="filters_slideBar">
        
      </div>
      <div class="filters_slideBar_overlay" @click="close_slideBar($event)"></div>
    </div>
</div>
</template>
<script>
export default {
components: {
 },
data() {
 return {};
 },
 props: {},
methods: {},
};
</script>
<style scoped></style>