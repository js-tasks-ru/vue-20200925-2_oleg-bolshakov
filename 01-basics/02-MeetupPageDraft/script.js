import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: null,
    loadingTimeout: 2000,
  },

  mounted() {
    setTimeout(() => {
      this.fetchMeetupById(MEETUP_ID);
    }, this.loadingTimeout);
  },

  computed: {
    meetup() {
      let meetup = this.rawMeetup;
      if ( !meetup ) return null;
      return {
        ...meetup,
        cover: meetup.imageId ? getMeetupCoverLink(meetup) : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        ISODate: new Date(meetup.date).toISOString().substr(0, 10),
        agenda: Array.isArray(meetup.agenda) ? meetup.agenda : [],
      };
    },
    agenda() {
      return this.meetup.agenda.map(item => {
        return {
          ...item,
          icon: item.type in agendaItemIcons ? agendaItemIcons[item.type] : agendaItemIcons.other,
          title: item.title ? item.title : agendaItemTitles[item.type],
        };
      });
    }
  },

  methods: {
    fetchMeetupById(meetupId) {
      const headers = { "Content-Type": "application/json" };
      fetch(`${API_URL}/meetups/${meetupId}`, { headers })
        .then(response => response.json())
        .then(data => (this.rawMeetup = data))
    },
  },

});
