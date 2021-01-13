import logo from './logo.svg'
import './App.css'

import AllLists from './components/AllLists'

function App () {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <AllLists />
      </main>
    </div>
  )
}

export default App
