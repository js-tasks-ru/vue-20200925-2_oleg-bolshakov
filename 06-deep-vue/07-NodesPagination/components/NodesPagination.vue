<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  render(h) {
    let index = (this.page * this.perPage) - this.perPage;
    let count = this.perPage;
    return h('div', (Array.isArray(this.$slots.default)) ? [...this.$slots.default].splice(index, count) : []);
  }
};
</script>

<style scoped></style>
