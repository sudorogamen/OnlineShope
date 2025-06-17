<template>
  <li class="checkboxList">
    <div>
      <label>
        <input
          id="all"
          class="all_checkbox"
          type="checkbox"
          v-model="newSelectedItems"
          value="all"
          @change="toggleSelect($event)"
        />
        All
      </label>
    </div>
    <div v-for="category in checkboxList" :key="category">
      <input
        type="checkbox"
        :id="category"
        :value="category"
        v-model="newSelectedItems"
        @change="toggleSelect($event)"
      />
      <label :for="category">
        {{ category }}
      </label>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      newSelectedItems:[]
    };
  },
  props: {
    checkboxList: {
      type: Array,
    },
    selectedItems:{
      type: Array
    },
  },
  mounted(){
    this.newSelectedItems = [...this.selectedItems]
  },
  methods: {
    toggleSelect(e) {
      if (e.target.value == "all") {
        if (e.target.checked) {
          this.newSelectedItems = [...this.checkboxList];
        } else {
          this.newSelectedItems = [];
        }
      } else {
        if (e.target.checked) {
          if (this.newSelectedItems.length === this.checkboxList.length) {
              this.newSelectedItems.push('all')
          }
        } else {
          this.newSelectedItems = this.newSelectedItems.filter(
            (c) => c !== e.target.value && c !== 'all'
          );
        }
      }
      this.$emit('selectedItems', this.newSelectedItems)
    },
   
  },
};
</script>

<style scoped>
.category-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
