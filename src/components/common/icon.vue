<template>
  <svg :class="iconStyle" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    iconClass: {
      required: true
    },
    iconStyle: String
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>
