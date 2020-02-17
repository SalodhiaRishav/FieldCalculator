<template>
  <div>
    <div class="homeContainer">
      <div class="demoForm">
        <CalculatorInput label="Total Mass" zIndex="1" v-model="totalMass" />
      </div>
      <div v-if="!showShortCutWindow" @click="openShortCutWindow" class="shortCutButton">
         <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </div>
      <div class="shortCutBox" v-if="showShortCutWindow">
          <span class="closeCalcBtn" @click="closeShortCutWindow">&times;</span>
          <h3>Shortcuts:</h3>
          <p>
              <b>c</b> : Open Calculator
            <br>
             <b>shift+s</b> : Save response
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import CalculatorInput from "./CalculatorInput.vue";

export default {
  components: {
    CalculatorInput
  },
  data() {
    return {
      showShortCutWindow:false,
      totalMass: ""
    };
  },
  methods:{
      openShortCutWindow(){
          this.showShortCutWindow=true;
      },
      closeShortCutWindow(){
          this.showShortCutWindow=false;
      }
  }
};
</script>

<style>
@import url("./styles/Home.css");
</style>