<template>
  <div class="App">
    <MyHeader :buyList="buyList"  :buyItemsCount="buyItemsCount"/>
    <RouterView @addBuyProduct="addBuyProduct"  ></RouterView>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  components: {
    MyHeader,
  },
  data() {
    return {
      buyList:[],
      buyItemsCount:0,
    
    };
  },
  props: {},
  methods: {
    
addBuyProduct(product, count){
let newItem = true
this.buyList.forEach((element) => {
        if (element.id == product.id) {
          element.count+= count;
          newItem = false;
        } 
        
         });
        if (newItem) {
       this.buyList.push({...product, count:count})
      }
 this.buyItemsCount+=count
}

  },
   beforeMount() {
      this.$store.getters.updateProducts
  },
};
</script>
<style>
.App {
  user-select: none;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 5px;
}




:root {
  --main-bg-color: rgb(10, 14, 19);
  --accent-color:rgba(255, 89, 0, 1);
}


body {
    color: rgb(255, 255, 255); 
  background:var(--main-bg-color);
}
@media (hover: hover) {
*::-webkit-scrollbar {
  width: 7px;
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--accent-color);

}

}









/* none style */
* {
  padding: 0;
  margin: 0;
  border: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Links */

a,
a:link,
a:visited a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-size: inherit;
  font-weight: inherit;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active,
textarea:focus,
textarea:active {
  outline: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

label {
  cursor: pointer;
}

legend {
  display: block;
}


</style>
