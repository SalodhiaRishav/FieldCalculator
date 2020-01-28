<template>
  <div id="app">
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

<style>
@import url(./AppStyle.css);
</style>

