<template>
  <div class="toasts">
    <div v-for="toast in toasts" :key="toast.id">
      <div
        v-if="toast.type==='success'"
        class="toast toast_success"
      >
        <app-icon icon="check-circle" />
        <span>{{ toast.message }}</span>
      </div>
      <div
        v-if="toast.type==='error'"
        class="toast toast_error"
      >
        <app-icon icon="alert-circle" />
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',
  data: function() {
    return {
      toasts: [],
      id: 0,
    }
  },

  components: { AppIcon },

  methods: {
    error(message) {
      this.addToast(message, 'error');
    },

    success(message) {
      this.addToast(message, 'success');
    },

    addToast(message, type) {
      this.toasts.push({
        id: ++this.id,
        type: type,
        message: message,
      });
      setTimeout(this.deleteToast, DELAY, this.id);
    },

    deleteToast(id) {
      this.toasts = this.toasts.filter(toast => {return toast.id !== id});
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
  margin: 8px;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
