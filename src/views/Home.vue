<template>
  <div class="home">
    <Canvas />
    <div>
      <ul>
        <li v-for="character in characters" :key="character.id">
          {{ character.name }}
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
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { Character, Group } from "../store";

@Component({
  components: { Canvas },
})
export default class Home extends Vue {
  @Getter("characters") characters!: Character[];
  @Getter("groups") groups!: Group[];
}
</script>
