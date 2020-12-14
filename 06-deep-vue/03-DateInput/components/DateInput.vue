<template>
  <AppInput
    :type="type"
    v-model="date"
    ref="theDateInput"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',
  inheritAttrs: false,
  
  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'date',
      validator: function(value) {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1;
      }
    },
    valueAsNumber: {
      type: Number
    },
    valueAsDate: {
      type: Date
    }
  },

  data(){
    return {
      input: null,
      step: null,
    };
  },

  computed: {
    date: {
      get: function() {
        if (this.valueAsNumber) return this.format(this.valueAsNumber);
        if (this.valueAsDate) return this.format(this.valueAsDate);
        return this.value;
      },
      set: function(newValue) {
        this.updateValues(newValue);
      }
    }
  },

  methods: {
    format(date) {
      switch (this.type) {
        case 'time': 
          const len = ( this.step && (this.step % 60 > 0) ) ? 8 : 5;
          return  new Date(date).toISOString().substr(11, len);
        case 'datetime-local':
          return new Date(date).toISOString().substr(0, 16);
        default:
          return new Date(date).toISOString().substr(0, 10);
      }
    },
    updateValues(newValue) {  
      // По условию задачи 'newValue' нельзя использовать.
      // Нашел такой способ добраться до 'valueAsNumber' и 'valueAsDate'.
      let valueAsNumber = this.input.$el.children[0].valueAsNumber;
      let valueAsDate = this.input.$el.children[0].valueAsDate;
      if ( !valueAsDate ) valueAsDate = new Date(valueAsNumber);
      this.$emit('update:valueAsNumber', valueAsNumber);
      this.$emit('update:valueAsDate', valueAsDate);
    },
  },
  mounted() {
    this.input = this.$refs.theDateInput;
    this.step = this.input.$attrs.step;
  }
};
</script>

<style scoped></style>
