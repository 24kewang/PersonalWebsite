import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="flex pt-20 items-center justify-center gap-8 text-xl">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo blur-sm" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react animate-spin" alt="React logo" />
        </a>
      </div>
      <h1 className="text-center">Vite + React</h1>
      <h2 className="text-center text-secondary">Click on the logos to learn more</h2>
      <div className="card flex h-1000 flex-col items-center">
        <button
          className="px-4 py-2 mt-4 mb-2 bg-background text-white rounded hover:bg-blue-600 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code class="text-base">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
