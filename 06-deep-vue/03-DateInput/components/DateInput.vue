<template>
  <AppInput
    :type="type"
    :value="date"
    @input.native="event => updateValues(event)"
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

  computed: {
    date() {
      if (this.valueAsNumber) return this.format(this.valueAsNumber);
      if (this.valueAsDate) return this.format(this.valueAsDate);
      return this.value;
    },
    step() {
      return this.$attrs.step;
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
    updateValues(event) {  
      let valueAsNumber = event.target.valueAsNumber;
      let valueAsDate = event.target.valueAsDate;
      if ( !valueAsDate ) valueAsDate = new Date(valueAsNumber);
      this.$emit('update:valueAsNumber', valueAsNumber);
      this.$emit('update:valueAsDate', valueAsDate);
    },
  },
};
</script>

<style scoped></style>
