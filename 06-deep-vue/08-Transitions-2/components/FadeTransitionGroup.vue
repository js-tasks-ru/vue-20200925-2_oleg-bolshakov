<script>
export default {
  name: 'FadeTransitionGroup',
  inheritAttrs: false,
  render(h) {
    let nodes = (Array.isArray(this.$slots.default)) ? this.$slots.default.map(vnode => {
      if ( !vnode.data.class ) vnode.data.class = {};
      vnode.data.class["fade-list-item"] = true;
      return vnode;
    }) : [];
    return h('transition-group', {
      attrs: { ...this.$attrs, name: "fade-list" },
      listeners: this.$listeners,
      class: {
        'fade-list': true,
      },
    }, nodes);
  }
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
