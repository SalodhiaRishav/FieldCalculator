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
            <div class="calButton colorLightBlue">AC</div>
            <div class="calButton colorLightBlue">C</div>
            <div class="calButton colorLightBlue">%</div>
            <div class="calButton colorLightBlue">/</div>
            <div class="calButton colorLightGray">7</div>
            <div class="calButton colorLightGray">8</div>
            <div class="calButton colorLightGray">9</div>
            <div class="calButton colorLightBlue">*</div>
            <div class="calButton colorLightGray">4</div>
            <div class="calButton colorLightGray">5</div>
            <div class="calButton colorLightGray">6</div>
            <div class="calButton colorLightBlue">-</div>
            <div class="calButton colorLightGray">1</div>
            <div class="calButton colorLightGray">2</div>
            <div class="calButton colorLightGray">3</div>
            <div class="calButton colorLightBlue">+</div>
            <div class="calButton colorLightGray">+/-</div>
            <div class="calButton colorLightGray">0</div>
            <div class="calButton colorLightGray">.</div>
            <div class="calButton colorLightBlue">=</div>
        </div>
     </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            expressionString:""
        }
    },
    mounted(){
          window.addEventListener("keypress", e => {
             let pressedKey = String.fromCharCode(e.keyCode);
             if(pressedKey === "=")
             {
                 this.expressionString=eval(this.expressionString).toString();
             }
             else
             {
                 this.expressionString+=pressedKey;
             }
          });
           window.addEventListener("keyup", e => {
           
             if(e.keyCode === 8)
             {
                 this.expressionString=	this.expressionString.slice(0, -1);
             }
          });
    },
    methods:{

        onKeyPress($event)
        {
            console.log("keyPressed");

            console.log($event);
        }
    }
}
</script>

<style scoped>
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
    line-height: 52px;
    font-size: 20px;
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
