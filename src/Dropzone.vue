<template>
  <div class="d-flex-all-center d-mainbody">
    <div
      ref="refDropzone"
      @drop="onDropHandler"
      @dragover.prevent="onDragoverHandler"
      class="d-dropzone"
    >
      <input ref="refFile" type="file" @change="onDrop" style="display: none" />

      <div @click="refFile.click()" class="d-h-full d-flex-all-center">
        <!-- <span v-if="isDragActive">Drop the files here ...</span>
        <span v-else>Drag 'n' drop image here, or click to select image</span> -->
        <p>click to select a file</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// defineProps<{ msg: string }>();
const emit = defineEmits(["onUploaded"]);

const refFile = ref();
const refDropzone = ref();

function onDrop(acceptFiles: any) {
  emit("onUploaded", acceptFiles.target.files["0"]);
}

function onDragHandler(event: any) {
  console.log(event);
}

function onDropHandler(event: any) {
  event.preventDefault();

  if (event.dataTransfer.items) {
    console.log(event.dataTransfer.items[0].getAsFile());
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
      if (event.dataTransfer.items[i].kind === "file") {
        var file = event.dataTransfer.items[i].getAsFile();
        console.log("... file[" + i + "].name = " + file.name);
      }
    }
  }
}

function onDragoverHandler(event: any) {
  event.preventDefault();
}
</script>

<style scoped>
.d-h-full {
  height: 100%;
}
.d-flex-all-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.d-mainbody {
  position: relative;
}

.d-dropzone {
  width: 300px;
  height: 200px;
  background-color: rgb(224 242 254 / 1);
  border-width: 2px;
  border-color: rgb(125 211 252 / 1);
  border-style: dashed;
  border-radius: 1rem;
}
</style>
