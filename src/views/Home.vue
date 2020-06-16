<template>
  <div class="home">
    <Canvas />
    <div>
      <ul>
        <li v-for="entity in entities" :key="entity.id">
          {{ entity.name }}
        </li>
      </ul>
      <ul>
        <li v-for="group in groups" :key="group.id">
          {{ group.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Canvas from "@/components/Canvas.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Canvas }
})
export default class Home extends Vue {
  private entities = Object.values(this.$store.state.entities) || [];
  private groups = Object.values(this.$store.state.groups) || [];
}
</script>
