import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <div v-if="loading">Loading...</div>
    <div v-else>
      <meetup-view :meetup="meetup"></meetup-view>
    </div>
  `,

  components: {
    MeetupView
  },

  data: function() {
    return {
      rawMeetup: undefined,
      loading: true
    }
  },

  computed: {
    meetup: function() {
      let meetup = this.rawMeetup;
      if ( !meetup ) return undefined;
      return {
        ...meetup,
        date: new Date(meetup.date),
      };
    }
  },

  methods: {
    fetchMeetupById(meetupId) {
      fetchMeetup(meetupId).then(data => {
        this.rawMeetup = data;
      }).finally(()=>{
        this.loading = false;
      })
    }
  },

  mounted() {
    this.fetchMeetupById(MEETUP_ID);
  }

};
