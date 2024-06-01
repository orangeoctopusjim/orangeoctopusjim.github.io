import { BackgroundCanvas } from './Background'

import jimImage from './assets/jim.png'

function App() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full absolute z-0 m-0">
        <BackgroundCanvas />
      </div>
      <div className="w-full h-full flex absolute z-10 ">
        <img className="" src={jimImage} />
      </div>
    </div>
  )
}

export default App
