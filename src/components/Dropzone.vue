<template>
  <div class="upBody">
    <div>inside</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style scoped>
.upBody {
  background-color: bisque;
}
</style>
