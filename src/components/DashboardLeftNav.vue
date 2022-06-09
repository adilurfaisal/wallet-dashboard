<template>
  <q-item clickable tag="a" :href="link">
    <div class="nav-icon" v-html="icon"></div>
    <div class="nav-title" v-html="title"></div>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardLeftNav",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
