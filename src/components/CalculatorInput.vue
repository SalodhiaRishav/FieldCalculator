<template>
<div>
    <div  v-bind:class="{ someBlur: blurInput }" class="input-container" >
    <input class="input-field" type="text" v-model="inputFieldValue">
    <i class="fa fa-calculator icon" @click="onClickCalculatorIcon"></i>
  </div>
  <br>
  <calculator v-if="showCalculator" :defaultResultValue="inputFieldValue"  @calcEnterPressed="onCalcEnterPressed"></calculator>
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
            blurInput:false,
            inputFieldValue:"",
            showCalculator:false
        }
    },
    methods:{
        onCalcEnterPressed(e){
            this.inputFieldValue = e.result;
            this.blurInput=false;
            this.showCalculator=false;
        },
        onClickCalculatorIcon()
        {
            this.blurInput=!this.showCalculator;
            this.showCalculator= !this.showCalculator;
        }
    }
    
}
</script>


<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

.someBlur{
filter: blur(1px);
-webkit-filter: blur(1px);
}

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
  cursor: pointer;
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