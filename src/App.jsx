import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center gap-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo blur-sm" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react animate-spin" alt="React logo" />
        </a>
      </div>
      <h1 className="text-center">Vite + React</h1>
      <div className="card flex flex-col items-center">
        <button
          className="px-4 py-2 mt-4 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
