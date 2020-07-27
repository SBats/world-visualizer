<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="entityConfig"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Graph } from "ug-ts";

@Component
export default class Canvas extends Vue {
  @Getter("graph") graph: Graph | undefined;

  private stageConfig = {
    width: 200,
    height: 200,
  };

  private entityConfig = {
    x: 100,
    y: 100,
    radius: 70,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
  };

  updated() {
    console.log(this.graph);
  }
}
</script>
