<template>
<div>
    <div>
        {{label}}
    </div>
    <div class="input-container" >
        <input  class="input-field"
                type="text"
                v-bind:value="inputFieldValue"
                v-on:input="onInput"
                @focus="isFieldFocused = true"
                @blur="isFieldFocused = false"
                :disabled="showCalculator"
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
    props: ['label','value','zIndex'],
    components:{
        Calculator,
    },
    data(){
        return{
            isFieldFocused:false,
            validInputString:"1234567890.,%*-+/=",
            operatorString:".,%*-+/",
            showCalculator:false,
            inputFieldValue:this.value
        }
    },
    mounted(){
         window.addEventListener("keyup", e => {
            if(!this.isFieldFocused)
            {
                return;
            }
            if (e.altKey && e.which == 67){
                this.showCalculator=true;
            }
        });
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
            if(val.length > 27)
            {
                this.inputFieldValue =	this.inputFieldValue.slice(0, -1);
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
            }

            //to be discussed

            // if( enteredCharacter === "=" && this.inputFieldValue[0]!== '=')
            // {
            //      this.inputFieldValue =	"="+this.inputFieldValue;
            // }
            this.$emit('input', this.inputFieldValue);
        }
    },
    methods:{
        onInput(e){
            this.inputFieldValue=e.target.value;
        },
        closeCalc()
        {
            this.showCalculator=false;
        },

        showCalculationResult()
        {
            if(this.inputFieldValue[0] !== "=")
            {
                return;
            }
            else
            {
                if(this.inputFieldValue.length<=1)
                {
                    return;
                }
                const lastChar=this.inputFieldValue[this.inputFieldValue.length-1];

                if(this.operatorString.indexOf(lastChar)>-1)
                {
                    return;
                }
                const expressionToEvaluate = this.inputFieldValue.substring(1).replace(',','.');
                this.inputFieldValue=this.$mathjs.evaluate(expressionToEvaluate).toString();
            }
            // const finalResult = this.inputFieldValue.substring(1);
            // if(isNaN(finalResult)){
            //     return;
            // }
            // if(this.inputFieldValue[0] ==="=")
            // {
            //     this.inputFieldValue = finalResult;
            // }
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