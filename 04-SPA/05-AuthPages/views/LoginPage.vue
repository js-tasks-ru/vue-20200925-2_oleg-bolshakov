<template>
  <form class="form" @submit="checkForm">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <label>
          <input
            type="email"
            placeholder="demo@email"
            class="form-control"
            v-model="email"
          />
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <label>
          <input
            type="password"
            placeholder="password"
            class="form-control"
            v-model="password"
          />
        </label>
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      if (this.email && this.password) {
        login(this.email, this.password).then((response) => {
          if (response.fullname) {
            alert(response.fullname);
          } else {
            alert('Неверные учетные данные');
          }
        });
      }
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) alert('Требуется ввести пароль');
    },
  },
};
</script>

<style scoped></style>
