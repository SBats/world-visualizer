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
// import { GraphData } from "force-graph";
import { Node } from "ug-ts";
import Konva from "konva";
import { Group } from "@/store";

@Component
export default class Canvas extends Vue {
  @Getter("groups") groups!: Array<Node<Group, Group>["properties"]>;
  // forceGraph?: ForceGraphInstance;
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
    if (this.groups) {
      this._drawGraph(this.groups);
    }
  }

  private _drawGraph(groups: Array<Node<Group, Group>["properties"]>) {
    const container = document.getElementById("graph-container");
    if (!container) return;
    // this.forceGraph = ForceGraph();
    // this.forceGraph(container)
    //   .width(container.clientWidth)
    //   .height(container.clientHeight)
    //   .linkDirectionalParticles(2)
    //   .graphData(graph);
    console.log(groups);
    const stage = new Konva.Stage({
      container: "graph-container", // id of container <div>
      width: 500,
      height: 500,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    groups.forEach((group, index) => {
      const circle = new Konva.Circle({
        x: 60 * (index + 1),
        y: 60,
        radius: 30,
        stroke: "black",
        strokeWidth: 4,
      });

      layer.add(circle);
    });

    stage.draw();
  }
}
</script>
