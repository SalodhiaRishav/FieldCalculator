<template>
<div>
    <div>
        {{label}}
         <PopUp popUpText="press 'c' to open Calculator"></PopUp>

    </div>
    <div class="input-container" >
        <input  class="input-field"
                type="text"
                :value="inputFieldValue"
                @input="onInput"
                :disabled="showCalculator"
                @focus="isFieldFocused = true"
                @blur="isFieldFocused = false"
                @keyup.enter ="showCalculationResult">
        <i class="fa fa-calculator icon" @click="openCalculator"></i>
          <!-- <calculator v-if="showCalculator" class="popuptext" :defaultResultValue="calculatorValue" @closeBtnClicked="closeCalc" @calcEnterPressed="onCalcEnterPressed"></calculator> -->


       <div  v-if="showCalculator" class="modal" ref="modalBackground" :style="'z-index:'+zIndex+';'"> 
            
          <calculator class="modal-content" :style="'top : '+modelContentY+';left: '+modelContentX+';'" :defaultResultValue="calculatorValue" @closeBtnClicked="closeCalc" @calcEnterPressed="onCalcEnterPressed"></calculator>
        </div>
    </div>

</div>
</template>

<script>
import Calculator from './Calculator.vue';
import PopUp from './PopUp.vue'


export default {
    props: ['label','value','zIndex'],
    components:{
        Calculator,
        PopUp,
    },
    data(){
        return{
            isFieldFocused:false,
            validInputString:"1234567890.,%*-+/=",
            operatorString:".,%*-+/",
            showCalculator:false,
            inputFieldValue:this.value,
            modelContentX:"25%",
            modelContentY:"25%",
        }
    },
    mounted(){
        let self=this;
        window.addEventListener("click", function(event) {
           if(self.$refs.modalBackground === event.target)
           {
               self.showCalculator=false;
           }
        });

         window.addEventListener("keyup", e => {
            if(this.isFieldFocused && e.key == 'c')
            {
                this.showCalculator=true;
            }

            if(this.showCalculator===true && e.key==='Escape')
            {
                this.showCalculator=false;
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
        },
        computedValue: {
            get () {
                return this.inputFieldValue;
            },
            set (val) {
                console.log(val);
                this.inputFieldValue = val;
                this.$emit('input', this.inputFieldValue);
            }
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
            this.$emit('input',this.inputFieldValue);
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

        openCalculator(e)
        {
            this.modelContentX=e.x+"px";
            this.modelContentY=e.y+"px";
            this.showCalculator= true;
        },
    }
}
</script>

<style>
@import url("./styles/CalculatorInput.css");
</style>