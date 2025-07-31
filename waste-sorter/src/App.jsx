import { useState } from 'react'
import './App.css'
import WasteScanner from './components/WasteScanner'
import WasteResult from './components/WasteResult'
import Infographics from './components/Infographics'
import Header from './components/Header'

function App() {
  const [scannedItem, setScannedItem] = useState(null)
  const [showInfographics, setShowInfographics] = useState(false)

  const handleScanResult = (item) => {
    setScannedItem(item)
  }

  const handleReset = () => {
    setScannedItem(null)
  }

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        {!scannedItem ? (
          <div className="scanner-section">
            <WasteScanner onScanResult={handleScanResult} />
            
            <div className="info-section">
              <h2>📊 Waste Statistics</h2>
              <p>Learn about waste generation across different sectors</p>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowInfographics(!showInfographics)}
              >
                {showInfographics ? 'Hide' : 'Show'} Infographics
              </button>
            </div>
          </div>
        ) : (
          <WasteResult 
            item={scannedItem} 
            onReset={handleReset}
          />
        )}
        
        {showInfographics && (
          <Infographics />
        )}
      </main>
      
      <footer className="footer">
        <p>🌱 EcoSort - Making waste sorting fun and educational!</p>
        <p>Built with React.js • No real AI needed, just smart categorization</p>
      </footer>
    </div>
  )
}

export default App
