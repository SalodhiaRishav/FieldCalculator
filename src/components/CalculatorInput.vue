<template>
<div>
    <div  v-bind:class="{ someBlur: blurInput }" class="input-container" >
    <input class="input-field" type="text" v-model="inputFieldValue"
     :class="{ 'redBorderOnFocus': !isValidExpression, 'greenBorderOnFocus': isValidExpression }"
     :disabled="showCalculator"
     @keyup ="onEnterPressed">
    <i class="fa fa-calculator icon" @click="onClickCalculatorIcon"></i>
  </div>
  <br>
  <calculator v-if="showCalculator" :defaultResultValue="calculatorValue"  @calcEnterPressed="onCalcEnterPressed"></calculator>
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
            validInputString:"1234567890.%*-+/=",
            operatorString:".%*-+/",
            blurInput:false,
            inputFieldValue:"",
            showCalculator:false,
            isValidExpression:true
        }
    },
    computed:{
        calculatorValue (){
            if(this.inputFieldValue[0] === "=")
            {
                return this.inputFieldValue.substring(1);
            }
            return this.inputFieldValue;
        }
    },
    watch: {
        inputFieldValue(val) {
            let keyValue = '';
            if(val.length > 0)
            {
                keyValue = val[val.length-1];
            }
            if (this.validInputString.indexOf(keyValue) === -1)
            {
                this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
            }
            if(this.operatorString.indexOf(keyValue) > -1)
                {
                    let secondLastCharacter = this.inputFieldValue[this.inputFieldValue.length-2];
                    if(this.operatorString.indexOf(secondLastCharacter) > -1)
                    {
                        this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
                    }
            }

            if( keyValue === "=" && this.inputFieldValue.length !== 1)
            {
                 this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
                 
                 if(this.inputFieldValue[0] !== "=")
                 {
                     this.inputFieldValue="="+this.inputFieldValue;
                 }
                 else
                 {
                    let expressionToEvaluate = this.inputFieldValue.substring(1);
                    this.inputFieldValue="="+this.$mathjs.evaluate(expressionToEvaluate).toString();
                 }
   
            }
        }
    },
    methods:{
        onEnterPressed(e)
        {
            if(e.keyCode === 13)
            {
                let finalResult = this.inputFieldValue.substring(1);
                if(isNaN(finalResult)){
                    return;
                }
                if(this.inputFieldValue[0] ==="=")
                {
                  this.inputFieldValue = finalResult;
                }
            }
        },
        onCalcEnterPressed(e){
            this.inputFieldValue = e.result;
            this.blurInput=false;
            this.showCalculator=false;
        },
        onClickCalculatorIcon()
        {
            this.blurInput=!this.showCalculator;
            this.showCalculator= !this.showCalculator;
        },
       
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

.greenBorderOnFocus{
border: 1px solid green;
}

.redBorderOnFocus{
border: 1px solid red;
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

/* .input-field:focus {
  border: 1px solid dodgerblue;
} */
</style>