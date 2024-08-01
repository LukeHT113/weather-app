import '../assets/App.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Home from '../routes/Home'
import Forecast from '../routes/Forecast'
import Guide from '../routes/Guide'
import FavouriteProvider from '../context/FavouriteContext'

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/forecast",
    element: <Forecast />
  },
  {
    path: "/guide",
    element: <Guide />
  }
], {
  basename: "/weather-app"
})

function App() {

  return (
    <FavouriteProvider>
      <RouterProvider router={router} />
    </FavouriteProvider>
  )
}

export default App
