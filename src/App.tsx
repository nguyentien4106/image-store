import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './store'
import { LoadingOverlay } from './components/loading-overlay'
import { NotificationProvider } from './contexts/notification'

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-100">
            <LoadingOverlay />
            <RouterProvider router={router} />
        </div>
      </NotificationProvider>
    </Provider>
  )
}

export default App
