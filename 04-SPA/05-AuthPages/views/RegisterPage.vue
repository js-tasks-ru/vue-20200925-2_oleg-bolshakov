<template>
  <form class="form" @submit="checkForm">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullname" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input type="checkbox" v-model="checked" /> Я согласен с условиями
        <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт? <router-link to="/login">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      fullname: null,
      email: null,
      password: null,
      password2: null,
      checked: false,
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.fullname) {
        alert('Требуется ввести полное имя');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      if (this.password !== this.password2) {
        alert('Пароли не совпадают');
        return;
      }
      if (!this.checked) {
        alert('Требуется согласиться с условиями');
        return;
      }
      register(this.email, this.fullname, this.password).then((response) => {
        if (response.error) {
          alert(response.message);
        } else {
          alert(response.id);
        }
      });
    },
  },
};
</script>

<style scoped></style>
