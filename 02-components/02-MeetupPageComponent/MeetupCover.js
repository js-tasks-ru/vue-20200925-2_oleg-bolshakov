export const MeetupCover = {
  template: `
    <div
      class="meetup-cover"
      :style="{backgroundImage: coverLink}"
    >
      <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>
  `,

  props: {
    link: {
      type: String
    },
    title: {
      type: String
    }
  },

  computed: {
    coverLink() {
      return this.link ? `url('${this.link}')` : "";
    }
  }
};
