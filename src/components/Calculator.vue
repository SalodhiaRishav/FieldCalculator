<template>
    <div class="calculatorBox">
        <div class="resultBox">
            <div class="memoryBox">
                 <span class="closeCalcBtn" @click="closeCalc">&times;</span>
            </div>
            <div class="expressionBox">
                <div class="expressionInputBox" :class="{'afterInputLimit':showSmallFont,'beforeInputLimit':!showSmallFont}">
                   <span style="vertical-align:text-bottom">{{expressionString}}</span>  
                </div>
            </div>
        </div>
        <div class="buttonBox">
            <div v-for="button in buttons" class="buttonDiv" :key="button.key">
                <button :class="'calButton '+ button.color" @click="onCalcKeyPress($event,button.key)">{{button.value}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import buttons from "./resources/buttons.js";

export default {
    props:['defaultResultValue'],

    data(){
        return{
            buttons:buttons,
            maxCharAllowedInCalcInput:27,
            maxCharLimitForBigFont:14,
            expressionString:this.defaultResultValue,
            validInputString:"1234567890.%*-+/=",
            operatorString:".%*-+/",
            resultOperatorString:"%*+/"
        }
    },

    computed:{
        showSmallFont (){
            const expressionLength = this.expressionString.length;
            if(expressionLength > this.maxCharLimitForBigFont)
            {
                return true;
            }
            return false;
        }
    },

    mounted(){
        window.addEventListener("keypress", e => {
            const pressedKey = String.fromCharCode(e.keyCode);
            this.onCalcKeyPress(null,pressedKey);
        });

        //for backspace and enter bcz keypress don't allow these keys
        window.addEventListener("keyup", e => {
            if(e.keyCode === 8)
            {
                this.onCalcKeyPress(null,'C');
            }
            if(e.keyCode === 13)
            {
                this.onCalcKeyPress(null,'Enter');
            }
        });
    },

    methods:{
        closeCalc(){
            this.$emit("closeBtnClicked")
        },

        onCalcKeyPress(e,keyValue)
        {
            if(e !==null)
            {
                e.target.blur();
            }

            switch (keyValue) {
                case 'AC':
                    this.expressionString="";
                    break;

                case 'C':
                    this.expressionString=	this.expressionString.slice(0, -1);
                    break;

                case '+/-':
                    {
                        if(isNaN(this.expressionString)){
                          return;
                        }
                        const expression = this.expressionString.replace(",",".") +" * -1";
                        this.expressionString=this.$mathjs.evaluate(expression).toString();
                    }
                    break;

                case '=':
                    {
                        const expressionToEvaluate=this.expressionString.replace(",",".");
                        this.expressionString=this.$mathjs.evaluate(expressionToEvaluate).toString();
                    }
                    break;

                case 'Enter':
                    {
                        if(isNaN(this.expressionString)){
                            return;
                        }
                        this.$emit('calcEnterPressed',{result:this.expressionString});
                    }
                    break;

                default :
                    {
                        if(this.expressionString.length > this.maxCharAllowedInCalcInput)
                        {
                            return ;
                        }

                        if (this.validInputString.indexOf(keyValue) === -1)
                        {
                            return;
                        }
                        
                        if(this.operatorString.indexOf(keyValue) > -1)
                        {
                            const lastCharacter = this.expressionString[this.expressionString.length-1];
                            if(this.operatorString.indexOf(lastCharacter) > -1)
                            {
                                return;
                            }
                            if(this.expressionString.length === 0
                              &&
                              this.resultOperatorString.indexOf(keyValue) > -1)
                            {
                               return;   
                            }
                        }
                        this.expressionString+=keyValue;
                    }
            }
        },
    }
}
</script>

<style>
@import url('./styles/CalculatorStyle.css');
</style>
