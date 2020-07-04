import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class Entity {
  id: string = Date.now().toString();
  name!: string;
  parents: Set<Group["id"]> = new Set();

  constructor(params: {
    name: Entity["name"];
    parents?: Set<Group["id"]> | Array<Group["id"]>;
  }) {
    this.name = params.name;
  }
}

export class Group {
  id: string = Date.now().toString();
  name!: string;
  parents: Set<Group["id"]> = new Set();

  constructor(params: {
    name: Entity["name"];
    parents?: Set<Group["id"]> | Array<Group["id"]>;
  }) {
    this.name = params.name;
    this.parents = new Set(params.parents);
  }
}

interface State {
  groups: { [id: string]: Group };
  entities: { [id: string]: Entity };
}

export default new Vuex.Store({
  state: {
    groups: {},
    entities: {},
  } as State,
  mutations: {
    createGroup(state, group: Group) {
      state.groups[group.id] = group;
    },
    createEntity(state, entity: Entity) {
      state.entities[entity.id] = entity;
    },
  },
  actions: {},
  modules: {},
});
