<template>
  <div class="progress" :class="classObject" :style="{ width: width + '%'}"></div>
</template>

<script>
import TWEEN from './vendor/tween.esm';

const START_VALUE = 0;
const END_VALUE = 100;
const DURATION = 30 * 1000;
const DELAY = 100;

export default {
  name: 'TheTopProgressBar',
  data() {
    return {
      width: START_VALUE,
      pending: false,
      classObject: { show: false, failed: false },
      tween: new TWEEN.Tween({ x: START_VALUE }).to({ x: END_VALUE }, DURATION).delay(DELAY)
    }
  },
  methods: {
    start() {
      if ( !this.pending ) {
        this.width = START_VALUE;
        this.classObject.show = true;
        this.classObject.failed = false;
        this.loading();
      }
    },
    finish() {
      this.tween.stop();
      this.width = END_VALUE;
      this.classObject.show = false;
    },
    fail() {
      this.classObject.failed = true;
      setTimeout(() => {
        this.finish();
      }, 0);
    },
    loading() {
      var vm = this;
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      this.tween.easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(function (object) {
          vm.width = object.x
        })
        .onStart(() => this.pending = true)
        .onStop(() => this.pending = false)
        .onComplete(() => this.pending = false)
        .start()
      animate()
    }
  }
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
