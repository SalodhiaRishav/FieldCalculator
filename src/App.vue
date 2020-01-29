<template>
  <div id="app">
      Alt+c to open Calculator
      <br>
      Shift+s to confirm response
      <CalculatorInput label="Calculation1" zIndex="1" v-model="someMass"/>
      <CalculatorInput label="Calculation2" zIndex="1" v-model="someMass2"/>
  </div>
</template>

<script>
import CalculatorInput from './components/CalculatorInput.vue'

export default {
  name: 'app',
  components: {
    CalculatorInput
  },
  data(){
    return{
      someMass:"12",
      someMass2:"122",

    }
  }
}
</script>

<style>
@import url(./AppStyle.css);
</style>

