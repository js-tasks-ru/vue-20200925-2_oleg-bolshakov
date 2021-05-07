<template>
  <div>
    <template v-for="item in cards">
      <slot name="default" :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: Number,
    perPage: Number,
    items: Array
  },
  computed: {
    cards() {
      let index = (this.page * this.perPage) - this.perPage;
      let count = this.perPage;
      return [...this.items].splice(index, count);
    }
  }
};
</script>

<style></style>
