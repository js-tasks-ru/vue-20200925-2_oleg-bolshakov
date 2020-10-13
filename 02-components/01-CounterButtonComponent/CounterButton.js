export const CounterButton = {

  name: 'CounterButton',

  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="handleClick">{{ count }}</button>',

  // Теперь текущее значение счётчика приходит от родителя через входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  // Описываем модель компонента на параметр count с событием increment
  model: {
    prop: 'count',
    event: 'increment',
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    handleClick() {
      this.$emit('increment', this.count + 1);
    }
  },

};
