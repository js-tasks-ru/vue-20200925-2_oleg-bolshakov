<template>
  <base-button
    class="button_danger"
    :block="block"
    :tag="tag"
    v-bind="$attrs"
    v-on="$listeners"><slot></slot></base-button>
</template>

<script>
import BaseButton from './BaseButton';
export default {
  name: 'DangerButton',
  inheritAttrs: false,
  components: { BaseButton },
  props: ['block', 'tag'],
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
