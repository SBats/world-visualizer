<template>
  <!-- <v-stage :config="stageConfig">
    <v-layer>
      <v-circle :config="entityConfig"></v-circle>
    </v-layer>
  </v-stage>-->
  <div id="graph-container"></div>
</template>

<style>
#graph-container {
  width: 100vw;
  height: 50vh;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import ForceGraph, { ForceGraphInstance, GraphData } from "force-graph";

@Component
export default class Canvas extends Vue {
  @Getter("formattedGraph") graph!: GraphData;
  forceGraph?: ForceGraphInstance;
  // private stageConfig = {
  //   width: 200,
  //   height: 200,
  // };

  // private entityConfig = {
  //   x: 40,
  //   y: 40,
  //   radius: 20,
  //   fill: "red",
  //   stroke: "black",
  //   strokeWidth: 1,
  // };

  mounted() {
    if (this.graph) {
      console.log(this.graph);
      this._drawGraph(this.graph);
    }
  }

  private _drawGraph(graph: GraphData) {
    const container = document.getElementById("graph-container");
    if (!container) return;
    this.forceGraph = ForceGraph();
    this.forceGraph(container)
      .width(container.clientWidth)
      .height(container.clientHeight)
      .linkDirectionalParticles(2)
      .graphData(graph);
  }
}
</script>
