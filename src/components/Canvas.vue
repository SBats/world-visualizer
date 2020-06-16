<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="entityConfig"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Canvas extends Vue {
  private stageConfig = {
    width: 200,
    height: 200
  };

  private entityConfig = {
    x: 100,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
  };
}
</script>
