import Vue from "vue";
import Vuex from "vuex";
import { Graph, Unit } from "ug-ts";

Vue.use(Vuex);

export enum EntitiesType {
  GROUP = "GROUP",
  CHARACTER = "CHARACTER",
}

enum Relations {
  PART_OF = "PART_OF",
}

abstract class Entity {
  id!: string;
  name!: string;
  type!: EntitiesType;

  constructor(params: { name: Entity["name"]; type: Entity["type"] }) {
    this.id = `${params.type}_${Date.now().toString()}`;
    this.name = params.name;
    this.type = params.type;
  }
}

export class Character extends Entity {
  constructor(name: Entity["name"]) {
    super({ name, type: EntitiesType.CHARACTER });
  }
}

export class Group extends Entity {
  constructor(name: Entity["name"]) {
    super({ name, type: EntitiesType.GROUP });
  }
}

interface State {
  graph?: Graph;
}

export default new Vuex.Store({
  state: {
    graph: undefined,
  } as State,
  mutations: {
    addEntity(state, { entity, groups }: { entity: Entity; groups: Group[] }) {
      const graph = state.graph || new Graph();
      const node = graph.createNode(entity.type, entity);
      const groupsNodes = groups.map((group) => {
        const graphGroups = graph.nodes(EntitiesType.GROUP);
        graphGroups.createIndex("id");
        return graphGroups.find(group.id);
      });
      groupsNodes.forEach((groupNode) => {
        graph
          .createEdge(Relations.PART_OF, {
            id: `${node.properties.id}_PART_OF_${groupNode.properties.id}`,
          })
          .link(node, groupNode);
      });
      Vue.set(state, "graph", graph);
    },
  },
  getters: {
    graph: (state) => {
      return state.graph?.toJSON();
    },
    characters: (state) => {
      return !state.graph
        ? []
        : state.graph
            .nodes(EntitiesType.CHARACTER)
            .query()
            .units()
            .map((unit: Unit<Character>) => ({ ...unit.properties }));
    },
    groups: (state) => {
      return !state.graph
        ? []
        : state.graph
            .nodes(EntitiesType.GROUP)
            .query()
            .units()
            .map((unit: Unit<Group>) => ({ ...unit.properties }));
    },
  },
  actions: {},
  modules: {},
});
