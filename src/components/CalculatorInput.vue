<template>
<div>
    <div>
        {{label}}
    </div>
    <div class="input-container" >
        <input class="input-field"
                type="text"
                v-model="inputFieldValue"
                @keyup.enter ="showCalculationResult">
        <i class="fa fa-calculator icon" @click="openCalculator"></i>
        <div  v-if="showCalculator" class="modal" :style="'z-index:'+zIndex+';'">
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
            label:"Calculation",
            zIndex:1,
            validInputString:"1234567890.,%*-+/=",
            operatorString:".,%*-+/",
            inputFieldValue:"",
            showCalculator:false,
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
            if(val.length === 0)
            {
               return;
            }
            const enteredCharacter =  val[val.length-1];
            
            if (this.validInputString.indexOf(enteredCharacter) === -1)
            {
                this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
            }

            if(this.operatorString.indexOf(enteredCharacter) > -1)
            {
                if(this.inputFieldValue.length>1)
                {
                    const secondLastCharacter = this.inputFieldValue[this.inputFieldValue.length-2];
                    if(this.operatorString.indexOf(secondLastCharacter) > -1)
                    {
                        this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
                    }
                }
            }

            if( enteredCharacter === "=" && this.inputFieldValue.length !== 1)
            {
                 this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
                 
                 if(this.inputFieldValue[0] !== "=")
                 {
                    const expressionToEvaluate=this.inputFieldValue.replace(',','.');
                    this.inputFieldValue="="+this.$mathjs.evaluate(expressionToEvaluate).toString();
                 }
                 else
                 {
                    const expressionToEvaluate = this.inputFieldValue.substring(1).replace(',','.');
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

        showCalculationResult()
        {
            const finalResult = this.inputFieldValue.substring(1);
            if(isNaN(finalResult)){
                return;
            }
            if(this.inputFieldValue[0] ==="=")
            {
                this.inputFieldValue = finalResult;
            }
        },

        onCalcEnterPressed(e){
            this.inputFieldValue = e.result;
            this.showCalculator=false;
        },

        openCalculator()
        {
            this.showCalculator= true;
        },
    }
}
</script>

<style>
@import url("./styles/CalculatorInput.css");
</style>