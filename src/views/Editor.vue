<template>
  <div>
    <h2>Add Group</h2>
    <input type="text" v-model="newGroup.name" />
    <multiselect v-model="newGroup.parents" :options="groups"> </multiselect>
    <button type="button" v-on:click="createGroup">Add</button>
    <h2>Add Entity</h2>
    <input type="text" v-model="newEntity.name" />
    <multiselect v-model="newEntity.parents" :options="groups"> </multiselect>
    <button type="button" v-on:click="createEntity">Add</button>
  </div>
</template>

<script lang="ts">
import Multiselect from "vue-multiselect";
import { Component, Vue } from "vue-property-decorator";
import { Group, Entity } from "@/store";

@Component({
  components: { Multiselect },
})
export default class Editor extends Vue {
  newGroup = { name: "", parents: [] };
  newEntity = { name: "", parents: [] };
  private groups = Object.values(this.$store.state.groups) || [];

  createGroup() {
    this.$store.commit("createGroup", new Group(this.newGroup));
  }

  createEntity() {
    this.$store.commit("createEntity", new Entity(this.newEntity));
  }
}
</script>
