<template>
<div class="tempBackgroundBox">
     <div class="calculatorBox">
        <div class="resultBox">
            <div class="memoryBox">

            </div>
            <div class="expressionBox">
                <div type="text" class="expressionInputBox">
                    {{expressionString}}
                </div>
            </div>
        </div>
        <div class="buttonBox">
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'AC')">AC</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'C')">C</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'%')">%</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'/')">/</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'7')">7</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'8')">8</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'9')">9</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'*')">*</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'4')">4</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'4')">5</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'6')">6</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'-')">-</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'1')">1</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'2')">2</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'3')">3</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'+')">+</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'+/-')">+/-</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'0')">0</button>
            <button class="calButton colorLightGray" @click="onCalcKeyPress($event,'.')">.</button>
            <button class="calButton colorLightBlue" @click="onCalcKeyPress($event,'=')">=</button>
        </div>
     </div>
</div>
</template>

<script>
export default {
    props:['defaultResultValue'],
    data(){
        return{
            expressionString:this.defaultResultValue,
            validInputString:"1234567890.%*-+/=",
            operatorString:".%*-+/",
            resultOperatorString:"%*+/"
        }
    },
    mounted(){
        // const acButton=this.$refs.acButton;
        // acButton.focus();
        // acButton.click();
        window
        .addEventListener("keypress", e => {
             let pressedKey = String.fromCharCode(e.keyCode);
             this.onCalcKeyPress(null,pressedKey);

          });

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
        onCalcKeyPress(e,keyValue)
        {
            if(e !==null)
            {
                e.target.blur();
            }
            if(keyValue === "AC")
            {
                this.expressionString="";
            }
            else if(keyValue === "C")
            {
                 this.expressionString=	this.expressionString.slice(0, -1);
            }
            else if(keyValue === "+/-")
            {
                if(isNaN(this.expressionString)){
                    return;
                }
                const expression = this.expressionString +" * -1";
                this.expressionString=eval(expression).toString();
            }
            else if(keyValue === "=")
            {
                this.expressionString=eval(this.expressionString).toString();
            }
            else if(keyValue === "Enter")
            {
                if(isNaN(this.expressionString)){
                    return;
                }
               this.$emit('calcEnterPressed',{result:this.expressionString});

            }
            else
            {
                if (this.validInputString.indexOf(keyValue) === -1)
                {
                    return;
                }
                
                if(this.operatorString.indexOf(keyValue) > -1)
                {
                    
                    let lastCharacter = this.expressionString[this.expressionString.length-1];
                    if(this.operatorString.indexOf(lastCharacter) > -1)
                    {
                        return;
                    }
                }
                this.expressionString+=keyValue;
            }
        }
    }
}
</script>

<style scoped>
button{
    cursor: pointer;
}
button:focus {
    outline: #6186b3 auto 5px; 
}
.tempBackgroundBox{
    width:336px;
    height: 416px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #319CF1;
}
.calculatorBox{
    display: flex;
    width:320px;
    height: 400px;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
}
.resultBox{
    width:90%;
    height:25%;
    background-color: #D8EFFF;
    margin-top:8px;
    margin-bottom:8px;

    display:flex;
    flex-direction: column;
    align-items: center;
}
.memoryBox
{
    width:100%;
    height:33%;
    background-color: #FFFFFF;
}
.expressionBox{
    width:100%;
    height:67%;
    background-color: #FFFFFF;
}
.expressionInputBox{
    width:100%;
    height:100%;
    border-top:0px;
    border-right:0px;
    border-bottom: 1px solid black;
    border-left:0px;
    background-color: #FFFFFF;
    text-align: right; 
    font-size:28px;
    line-height: 320%;
}
.buttonBox{
    width:90%;
    height:75%;
    margin-bottom:8px;

    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.calButton{
    width: 21%;
    height: 18%;
    text-align: center;
    border-radius: 5px;
    line-height: 48px;
    font-size: 20px;
    border:0px;
}
.colorLightBlue
{
    background-color: #D8EFFF;
    color:#4a86b3;;
}

.colorLightGray{
    background-color: #F3F8FC;
    color:#4d498c;
}


</style>
