<template>
  <div id="app">

    Calculation A
    <CalculatorInput/>
    Calculation B
    <CalculatorInput/>
  </div>
</template>

<script>
import CalculatorInput from './components/CalculatorInput.vue'


export default {
  name: 'app',
  components: {
    CalculatorInput
  }
}
</script>

<style scoped>
#app{
    width:100%;
    height: 100%;
}
</style>

