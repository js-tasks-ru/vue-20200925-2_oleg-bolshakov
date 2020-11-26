<template>
  <button type="button" @click="handleClick">{{ lcCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  data() {
    return {
      lcCount: null,
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  watch: {
    count: {
      handler: function(newValue) {
        this.lcCount = newValue;
      },
      immediate: true,
    }
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    handleClick() {
      this.$emit('increment', ++this.lcCount);
    }
  },
};
</script>

<style></style>
