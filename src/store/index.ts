import Vue from "vue";
import Vuex from "vuex";
import { Graph, Edge, Node } from "ug-ts";
// import { GraphData } from "force-graph";

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

function initGraph(): Graph {
  const graph = new Graph();
  graph.nodes(EntitiesType.GROUP).createIndex("id");
  graph.nodes(EntitiesType.CHARACTER).createIndex("id");
  graph.edges(Relations.PART_OF).createIndex("id");
  return graph;
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
      const graph = state.graph || initGraph();
      const node = graph.createNode(entity.type, entity);
      const groupsNodes = groups.map((group) =>
        graph.nodes(EntitiesType.GROUP).find(group.id)
      );
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
            .map((character: Node<Character, Group>) => ({
              ...character.properties,
            }));
    },
    groups: (state) => {
      return !state.graph
        ? []
        : state.graph
            .nodes(EntitiesType.GROUP)
            .query()
            .units()
            .map((group: Node<Group, Group>) => ({ ...group.properties }));
    },
    partOfLinks: (state) => {
      return !state.graph
        ? []
        : state.graph
            .edges(Relations.PART_OF)
            .query()
            .units()
            .map((link: Edge<Group | Character, Group>) => ({
              source: link.inputNode.properties.id,
              target: link.outputNode.properties.id,
            }));
    },
    // formattedGraph: (state, getters): GraphData => {
    //   const parsedGraph: GraphData = { nodes: [], links: [] };
    //   if (state.graph) {
    //     const groupNodes = getters.groups.map((group: Group) => ({
    //       ...group,
    //       val: 10,
    //       color: "red",
    //     }));
    //     const characterNodes = getters.characters.map(
    //       (character: Character) => ({
    //         ...character,
    //         val: 2,
    //       })
    //     );
    //     const partOfLinks = getters.partOfLinks;
    //     parsedGraph.nodes = [...groupNodes, ...characterNodes];
    //     parsedGraph.links = partOfLinks;
    //   }
    // return parsedGraph;
    // },
  },
  actions: {},
  modules: {},
});
