<template>
  <div class="popup">
    <i class="fa fa-info-circle"  ref="popUp" @click="openPopUp"></i>
    <transition name="fade">
      <span class="popuptext" v-if="showPopUp">{{popUpText}}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["popUpText"],
  data() {
    return {
      showPopUp: false
    };
  },
  mounted() {
    let self = this;
    window.addEventListener("click", function(event) {
      if (self.$refs.popUp !== event.target) {
        self.showPopUp = false;
      }
    });
  },
  methods: {
    openPopUp() {
      this.showPopUp = !this.showPopUp;
    }
  }
};
</script>

<style>
@import url("./styles/PopUp.css");
</style>

