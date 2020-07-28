<template>
  <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="entityConfig"></v-circle>
    </v-layer>
  </v-stage>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { Graph } from "ug-ts";

@Component
export default class Canvas extends Vue {
  @Getter("graph") graph!: Graph;

  private stageConfig = {
    width: 200,
    height: 200,
  };

  private entityConfig = {
    x: 40,
    y: 40,
    radius: 20,
    fill: "red",
    stroke: "black",
    strokeWidth: 1,
  };

  created() {
    if (this.graph) {
      console.log(this.graph);
    }
  }
}
</script>
