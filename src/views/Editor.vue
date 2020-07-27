<template>
  <div>
    <h2>Add Group</h2>
    <input type="text" v-model="newGroup.name" />
    <multiselect
      v-model="newGroup.parents"
      :options="groups"
      :multiple="true"
      track-by="id"
      label="name"
    ></multiselect>
    <button type="button" v-on:click="createGroup">Add</button>
    <h2>Add Character</h2>
    <input type="text" v-model="newCharacter.name" />
    <multiselect
      v-model="newCharacter.parents"
      :options="groups"
      :multiple="true"
      track-by="id"
      label="name"
    ></multiselect>
    <button type="button" v-on:click="createCharacter">Add</button>
  </div>
</template>

<script lang="ts">
import Multiselect from "vue-multiselect";
import { Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Group, Character } from "@/store";

@Component({
  components: { Multiselect },
})
export default class Editor extends Vue {
  newGroup = { name: "", parents: [] };
  newCharacter = { name: "", parents: [] };

  @Getter("groups") groups!: Group[];

  createGroup() {
    this.$store.commit("addEntity", {
      entity: new Group(this.newGroup.name),
      groups: this.newGroup.parents,
    });
  }

  createCharacter() {
    this.$store.commit("addEntity", {
      entity: new Character(this.newCharacter.name),
      groups: this.newCharacter.parents,
    });
  }
}
</script>
