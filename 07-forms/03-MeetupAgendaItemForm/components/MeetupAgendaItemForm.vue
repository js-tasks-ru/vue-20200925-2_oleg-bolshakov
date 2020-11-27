<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="handleRemove">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <label class="form-label">Тип</label>
      <select
        class="form-control"
        v-model="lcAgendaItem.type"
        @change="updateAgendaItem()"
      >
        <option
          v-for="(agendaItemType, idx) in agendaItemTypes"
          :key="idx"
          :value="agendaItemType.value">{{ agendaItemType.text }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="lcAgendaItem.startsAt"
            @change="updateAgendaItem()"/>
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="lcAgendaItem.endsAt"
            @change="updateAgendaItem()"/>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ title }}</label>
      <input
        class="form-control"
        v-model="lcAgendaItem.title"
        @change="updateAgendaItem()"/>
    </div>
    <div class="form-group" v-if="talk">
      <label class="form-label">Докладчик</label>
      <input
        class="form-control"
        v-model="lcAgendaItem.speaker"
        @change="updateAgendaItem()"/>
    </div>
    <div class="form-group" v-if="talk || other">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="lcAgendaItem.description"
        @change="updateAgendaItem()"
      ></textarea>
    </div>
    <div class="form-group" v-if="talk">
      <label class="form-label">Язык</label>
      <select
        class="form-control"
        v-model="lcAgendaItem.language"
        @change="updateAgendaItem()"
      >
        <option
          v-for="(talkLanguages, idx) in talkLanguages"
          :key="idx"
          :value="talkLanguages.value">{{ talkLanguages.text }}</option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const HOURS_A_DAY = 24;
const MINUTES_PER_HOUR = 60;

export default {
  name: 'MeetupAgendaItemForm',
  data() {
    return {
      agendaItemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
      lcAgendaItem: {...this.agendaItem},
      duration: null,
    };
  },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  watch: {
    'lcAgendaItem.startsAt': function() {
      this.updateEndsTime();
    },
    'lcAgendaItem.endsAt': function() {
      this.calculateDuration();
    },
  },
  computed: {
    talk() {
      return this.lcAgendaItem.type === 'talk';
    },
    other() {
      return this.lcAgendaItem.type === 'other';
    },
    title() {
      return (this.talk) ? "Тема" : (this.other ? "Заголовок" : "Нестандартный текст (необязательно)");
    },
  },
  methods: {
    handleRemove() {
      this.$emit('remove');
    },
    updateAgendaItem() {
      this.$emit('update:agendaItem', {...this.lcAgendaItem});
    },
    updateEndsTime() {
      let hours = parseInt(this.lcAgendaItem.startsAt.split(':')[0]) + this.duration.hours;
      let minutes = parseInt(this.lcAgendaItem.startsAt.split(':')[1]) + this.duration.minutes;
      if (minutes >= MINUTES_PER_HOUR) {
        minutes = minutes % MINUTES_PER_HOUR;
        hours++;
      };
      hours = hours % HOURS_A_DAY;
      hours = (hours.toString().length < 2) ? '0' + hours : hours;
      minutes = (minutes.toString().length < 2) ? '0' + minutes : minutes;
      this.lcAgendaItem.endsAt = hours + ':' + minutes;
      this.updateAgendaItem(); 
    },
    calculateDuration() {
      let hours = parseInt(this.lcAgendaItem.endsAt.split(':')[0]) - parseInt(this.lcAgendaItem.startsAt.split(':')[0]),
          minutes = parseInt(this.lcAgendaItem.endsAt.split(':')[1]) - parseInt(this.lcAgendaItem.startsAt.split(':')[1]);
      if (minutes < 0) {
        minutes = minutes + MINUTES_PER_HOUR;
        hours--;
      };
      if (hours < 0) {
        hours = hours + HOURS_A_DAY;
      };
      this.duration = {
        hours,
        minutes
      };
    }
  },
  mounted() {
    this.calculateDuration();
  }
};
</script>

<style></style>
