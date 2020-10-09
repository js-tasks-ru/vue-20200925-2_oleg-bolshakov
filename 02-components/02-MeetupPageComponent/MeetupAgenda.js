import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div v-if="agenda.length > 0">
        <div class="meetup-agenda__item">
          <meetup-agenda-item
            v-for="item in agenda"
            :key="item.id"
            :agendaItem="item"
          ></meetup-agenda-item>
        </div>
      </div>
      <p v-else class="meetup-agenda__empty">Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!</p>
    </div>
  `,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true
    }
  }
};
