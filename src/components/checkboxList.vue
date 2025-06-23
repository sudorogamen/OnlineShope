<template>
  <li class="checkboxList">
    <div>
      <label class=" all">
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
      newSelectedItems: [],
    };
  },
  props: {
    checkboxList: {
      type: Array,
    },
    selectedItems: {
      type: Array,
    },
  },
  watch: {
    checkboxList(n) {
      this.filtersUpdated(n);
    },
    selectedItems(n) {
      this.newSelectedItems = n;
      this.filtersUpdated(n);
    },
  },
  mounted() {
    this.newSelectedItems = [...this.selectedItems];
    this.newSelectedItems = this.newSelectedItems.filter((item) =>
      this.checkboxList.includes(item)
    );
    if (this.newSelectedItems.length === this.checkboxList.length) {
      this.newSelectedItems.push("all");
    }
  },
  methods: {
    filtersUpdated(n) {
      this.newSelectedItems = this.newSelectedItems.filter((item) =>
        this.checkboxList.includes(item)
      );
      if (this.newSelectedItems.length === this.checkboxList.length) {
        this.newSelectedItems.push("all");
      }
    },
    toggleSelect(e) {
      if (e.target.value == "all") {
        this.newSelectedItems = [...this.checkboxList, "all"];
      } else {
        if (e.target.checked) {
          if (this.newSelectedItems.length === this.checkboxList.length) {
            this.newSelectedItems.push("all");
          }
        } else {
          this.newSelectedItems = this.newSelectedItems.filter(
            (c) => c !== "all"
          );

          if (this.newSelectedItems.length < 1) {
            this.newSelectedItems.push(e.target.value);
          }
        }
      }
      this.$emit("selectedItems", this.newSelectedItems);
    },
  },
};
</script>

<style scoped>
.checkboxList {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.all, .checkboxList div{
  display: flex;
  align-items: center;
  gap: 5px;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--accent-color);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {

}

input[type="checkbox"]:checked::after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 89, 0, 1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>');
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 15px;
  height: 15px;
}




</style>
