<template>
<div>
    <div class="input-container">
    <input class="input-field" type="text">
    <i class="fa fa-calculator icon" @click="onClickCalculatorIcon"></i>
  </div>
  <br>
  <calculator v-if="showCalculator"></calculator>
</div>
</template>

<script>
import Calculator from './Calculator.vue'

export default {
    components:{
        Calculator,
    },
    data(){
        return{
            showCalculator:false
        }
    },
    methods:{
        onClickCalculatorIcon()
        {
            this.showCalculator= !this.showCalculator;
        }
    }
    
}
</script>


<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

.input-container {
  display: flex;
  width: 320px;
}

.icon {
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.input-field:focus {
  border: 1px solid dodgerblue;
}
</style>