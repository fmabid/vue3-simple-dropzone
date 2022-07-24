<script lang="ts">
import { defineComponent } from "vue";
import Dropzone from "@/Dropzone.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    Dropzone,
  },
});
</script>

<template>
  <div id="app">
    <Dropzone />
  </div>
</template>
