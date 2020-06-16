<template>
  <div>
    <h2>Add Group</h2>
    <input type="text" v-model="groupName" />
    <button type="button" v-on:click="createGroup">Add</button>
    <h2>Add Entity</h2>
    <input type="text" v-model="entityName" />
    <button type="button" v-on:click="createEntity">Add</button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { Group, Entity } from "@/store";

@Component
export default class Editor extends Vue {
  groupName = "";
  entityName = "";

  createGroup() {
    this.$store.commit("createGroup", new Group({ name: this.groupName }));
  }

  createEntity() {
    this.$store.commit("createEntity", new Entity({ name: this.entityName }));
  }
}
</script>
