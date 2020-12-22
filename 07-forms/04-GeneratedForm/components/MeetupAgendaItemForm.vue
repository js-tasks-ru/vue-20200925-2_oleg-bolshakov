<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="handleRemove">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group label="Тип">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="lcAgendaItem.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="(item, idx) in fieldSpecification"
      :key="idx"
      :label="item.title"
    >
      <component
        :is="item.component"
        v-bind="item.props"
        v-bind:[item.model.prop]="lcAgendaItem[item.field]"
        v-on:[item.model.event]="value => lcAgendaItem[item.field] = value"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

const HOURS_A_DAY = 24;
const MINUTES_PER_HOUR = 60;

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  data() {
    return {
      lcAgendaItem: { ...this.agendaItem },
      duration: null,
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fieldSpecification() {
      return this.$options.fieldSpecifications[this.lcAgendaItem.type];
    },
    startsAt: {
      get() {
        return this.lcAgendaItem.startsAt;
      },
      set(value) {
        this.lcAgendaItem.startsAt = value;
        this.updateEndsTime();
      }
    },
    endsAt: {
      get() {
        return this.lcAgendaItem.endsAt;
      },
      set(value) {
        this.lcAgendaItem.endsAt = value;
        this.calculateDuration();
      }
    }
  },

  watch: {
    lcAgendaItem: {
      handler: function() {
        this.$emit('update:agendaItem', { ...this.lcAgendaItem });
      },
      deep: true
    }
  },

  methods: {
    handleRemove() {
      this.$emit('remove');
    },
    updateEndsTime() {
      let hours = parseInt(this.startsAt.split(':')[0]) + this.duration.hours;
      let minutes = parseInt(this.startsAt.split(':')[1]) + this.duration.minutes;
      if (minutes >= MINUTES_PER_HOUR) {
        minutes = minutes % MINUTES_PER_HOUR;
        hours++;
      };
      hours = hours % HOURS_A_DAY;
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      this.endsAt = hours + ':' + minutes;
    },
    calculateDuration() {
      let hours = parseInt(this.endsAt.split(':')[0]) - parseInt(this.startsAt.split(':')[0]),
          minutes = parseInt(this.endsAt.split(':')[1]) - parseInt(this.startsAt.split(':')[1]);
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
    },
  },
  mounted() {
    this.calculateDuration();
  }
};
</script>

<style></style>
