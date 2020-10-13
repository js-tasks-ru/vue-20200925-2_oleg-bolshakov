export const MeetupDescription = {
  name: 'MeetupDescription',
  
  template: `<p class="meetup-description">{{ description }}</p>`,

  props: {
    description: {
      type: String,
      default: function() {
        return "Описание отсутсвует."
      }
    }
  }
};
