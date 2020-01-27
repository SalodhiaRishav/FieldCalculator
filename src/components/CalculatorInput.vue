<template>
<div>
    <div  v-bind:class="{ someBlur: blurInput }" class="input-container" >
        <input class="input-field" type="text" v-model="inputFieldValue"
        :class="{ 'redBorderOnFocus': !isValidExpression, 'greenBorderOnFocus': isValidExpression }"
        :disabled="showCalculator"
        @keyup ="onEnterPressed">
        <i class="fa fa-calculator icon" @click="onClickCalculatorIcon"></i>
        <div  v-if="showCalculator" class="modal">
                <calculator class="modal-content" :defaultResultValue="calculatorValue" @closeBtnClicked="closeCalc" @calcEnterPressed="onCalcEnterPressed"></calculator>
        </div>
    </div>
         
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
        
        closeCalc()
        {
            this.showCalculator=false;
        },
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
            this.showCalculator=false;
        },
        onClickCalculatorIcon()
        {
            this.showCalculator= true;
        },
       
    }

}
</script>


<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  position:absolute;
  top:10px;
  left:320px;
  border: 1px solid #888;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

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