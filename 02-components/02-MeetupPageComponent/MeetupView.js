import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',
  components: {
    MeetupDescription,
    MeetupInfo,
    MeetupCover,
    MeetupAgenda,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    }
  },

  computed: {
    link() {
      return this.meetup?.imageId ? getMeetupCoverLink(this.meetup) : undefined;
    },
    agenda() {
      return Array.isArray(this.meetup?.agenda) ? this.meetup.agenda : [];
    }
  },

  template: `
    <div>
      <meetup-cover
        :title="meetup?.title"
        :link="link"
      ></meetup-cover>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            
            <h3>Описание</h3>
            <meetup-description
              :description="meetup?.description"
            ></meetup-description>

            <h3>Программа</h3>
            <meetup-agenda
              :agenda="agenda"
            ></meetup-agenda>
            
          </div>
          <div class="meetup__aside">
            <meetup-info
              :organizer="meetup?.organizer"
              :place="meetup?.place"
              :date="meetup?.date"
            ></meetup-info>
          </div>
        </div>
      </div>
    </div>
  `,
};

