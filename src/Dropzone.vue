<template>
  <div class="d-flex-all-center d-mainbody">
    <div
      ref="refDropzone"
      @drop="onDropHandler"
      @dragover.prevent="onDragoverHandler"
      class="d-dropzone"
      :class="className"
    >
      <input ref="refFile" type="file" @change="onDrop" style="display: none" />

      <div @click="refFile.click()" class="d-h-full d-flex-all-center">
        <!-- <span v-if="isDragActive">Drop the files here ...</span>
        <span v-else>Drag 'n' drop image here, or click to select image</span> -->
        <slot>
          <p>click to select a file / Drop file</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Dropzone",
  props: {
    className: String,
  },
  emits: ["onSelect"],
  setup(_, { emit }) {
    const refFile = ref();
    const refDropzone = ref();

    function onDrop(acceptFiles: any) {
      emit("onSelect", acceptFiles.target.files["0"]);
    }

    // Not in use
    /* function onDragHandler(event: any) {
      console.log(event);
    }
    */
    function onDropHandler(event: any) {
      event.preventDefault();

      if (event.dataTransfer.items) {
        emit("onSelect", event.dataTransfer.items[0].getAsFile());
      }
    }

    function onDragoverHandler(event: any) {
      event.preventDefault();
    }

    return {
      refFile,
      refDropzone,
      onDrop,
      onDropHandler,
      onDragoverHandler,
    };
  },
});
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
