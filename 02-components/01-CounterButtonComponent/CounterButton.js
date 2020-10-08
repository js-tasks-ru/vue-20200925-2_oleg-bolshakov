export const CounterButton = {
  name: 'CounterButton',

  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="handleClick">{{ count }}</button>',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: function () {
        return 0;
      }
    }
  },
  // Компонент должен иметь модель
  model: {
    props: 'count',
    event: 'increment',
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    handleClick() {
      let value = this.count + 1;
      this.$emit('increment', value);
    }
  }
};
