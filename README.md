## vue3-simple-dropzone

> vue3-simple-dropzone is file uploader componet for your Vue-3 project. At this moment this works for only single file uploading.

![](doc/images/view.png)

### How to use?

- To change style pass your css class name to the props `className`.
- Use `onSelect` to handle event.

Example:

```vue
<template>
  <Dropzone className="boxStyle" @onSelect="handler">
    <p>Drop file here</p>
  </Dropzone>
</template>

<script setup lang="ts">
import Dropzone from "./Dropzone.vue";

function handler(ev) {
  // Handel event
}
</script>

<style>
.boxStyle {
  background-color: rgb(254, 255, 233) !important;
}
</style>
```

Options:

| Prop        | Type     | Description                                                   |
| ----------- | -------- | ------------------------------------------------------------- |
| `className` | `string` | This is optional. To change style pass class names as string. |

Events:

| Prop       | Type     | Description            |
| ---------- | -------- | ---------------------- |
| `onSelect` | `object` | Emits the file object. |
