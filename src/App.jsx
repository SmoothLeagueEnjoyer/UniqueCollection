import { useState } from 'react'
import './App.css'
import { UploadGSHistory } from "./Upload";
import { StashHistoryTable } from "./StashHistoryTable"
import { Provider } from 'react-redux'
import store from './store.js'

function App() {

  return (
    <>
          <Provider store={store}>
              <div className="everything">
                  <h1 className="top-title">Uniques from GS logs</h1>
                  <div className="upload">
                      <UploadGSHistory />
                  </div>
                  <div className="history-table">
                      <StashHistoryTable />
                  </div>
              </div>
          </Provider>
    </>
  )
}

export default App
