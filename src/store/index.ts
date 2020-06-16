import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class Entity {
  id: string = Date.now().toString();
  name!: string;
  groups: Set<Group["id"]> = new Set();

  constructor(entity: Partial<Entity>) {
    Object.assign(this, entity);
  }
}

export class Group {
  id: string = Date.now().toString();
  name!: string;
  children: Set<Group["id"] | Entity["id"]> = new Set();

  constructor(group: Partial<Group>) {
    Object.assign(this, group);
  }
}

interface State {
  groups: { [id: string]: Group };
  entities: { [id: string]: Entity };
}

export default new Vuex.Store({
  state: {
    groups: {},
    entities: {}
  } as State,
  mutations: {
    createGroup(state, group: Group) {
      state.groups[group.id] = group;
    },
    createEntity(state, entity: Entity) {
      state.entities[entity.id] = new Entity(entity);
      entity.groups.forEach(groupId => {
        state.groups[groupId].children.add(entity.id);
      });
    }
  },
  actions: {},
  modules: {}
});
