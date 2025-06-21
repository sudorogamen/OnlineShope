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
  watch:{
selectedItems(n){
 this.newSelectedItems = n
 this.newSelectedItems = this.newSelectedItems.filter(item =>
  this.checkboxList.includes(item)
 )
     if (this.newSelectedItems.length === this.checkboxList.length) {
              this.newSelectedItems.push('all')
          }
}
},
mounted(){
   this.newSelectedItems = [...this.selectedItems]
    this.newSelectedItems = this.newSelectedItems.filter(item =>
        this.checkboxList.includes(item)
 )
     if (this.newSelectedItems.length === this.checkboxList.length) {
              this.newSelectedItems.push('all')
          }
  },
  methods: {
    toggleSelect(e) {
      if (e.target.value == "all") {
      this.newSelectedItems = [...this.checkboxList,'all'];
      } else {
        if (e.target.checked) {
          
          if (this.newSelectedItems.length === this.checkboxList.length) {
            this.newSelectedItems.push('all')
          }
        } else {
          this.newSelectedItems = this.newSelectedItems.filter(
            (c) => c !== 'all'
          );
        
          if (this.newSelectedItems.length < 1) { 
             this.newSelectedItems.push(e.target.value )
          }
        }
      }
      this.$emit('selectedItems', this.newSelectedItems)
    },
   
  },
};
</script>

<style scoped>
.checkboxList.err{
  color: red;
}
.category-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
