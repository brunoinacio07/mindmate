import * as Toolbar from '@radix-ui/react-toolbar';
import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import { Square } from "./components/nodes/Square";

import "reactflow/dist/style.css";
import DefaultEdge from "./components/edges/DefaultEdge";
import { Circle } from './components/nodes/Circle';
import { Triangle } from './components/nodes/Triangle';

const NODE_TYPES = {
  square: Square,
  circle: Circle,
  triangle: Triangle,
}

const EDGE_TYPE = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 300,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 300,
    },
    data: {},
  },
]satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    setEdges(edges => addEdge(connection, edges))
  }, [])

  function handleAddSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 30,
          y: 30,
        },
        data: {},
      }
    ])
  }

  function handleAddCircleNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "circle",
        position: {
          x: 30,
          y: 30,
        },
        data: {},
      }
    ])
  }

  function handleAddTriangleNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "triangle",
        position: {
          x: 30,
          y: 30,
        },
        data: {},
      }
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPE}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-12 h-20 w-fit max-w-4xl overflow-hidden">
        <div className='flex gap-4'>
          <Toolbar.Button
            className='w-32 h-32 bg-teal-500 rounded mt-4 transition hover:-translate-y-2'
            onClick={handleAddSquareNode}
          />
          <Toolbar.Button
            className='w-32 h-32 bg-blue-500 rounded-full mt-4 transition hover:-translate-y-2'
            onClick={handleAddCircleNode}
          />
          <Toolbar.Button className="w-0 h-0 mt-5 border-l-[45px] border-l-transparent border-b-[70px] border-b-orange-500 border-r-[45px] border-r-transparent  transition hover:-translate-y-2"
            onClick={handleAddTriangleNode}
          />
        </div>
      </Toolbar.Root>
    </div>
  )
}

export default App
