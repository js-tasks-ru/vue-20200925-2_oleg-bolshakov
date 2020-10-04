import Vue from './vue.esm.browser.js';

const CounterButton = {
  data: () => ({
    count: 0
  }),
  name: 'CounterButton',
  template: '<button @click="handleClick">Clicked {{ count }} times.</button>',
  methods: {
    handleClick: function() {
      this.count++
    }
  }
};

const app = new Vue({
  name: 'App',
  template: `<main id="#app">
    <counter-button></counter-button>
  </main>`,
  components: { CounterButton }
});

app.$mount('#app');
// Рекомендуется использовать МЕТОД в качестве обработчика события
