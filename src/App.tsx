import { BackgroundCanvas } from './Background'

import titleImage from './assets/title.png'
import jimImage from './assets/jim.png'

function App() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full absolute z-0 m-0">
        <BackgroundCanvas />
      </div>
      <div className="w-full h-full flex flex-col absolute z-10 ">
        <div className="flex justify-center items-center">
          <img className="h-36" src={titleImage} />
        </div>
        <div className="flex justify-center items-center h-[600px]">
          <img className="h-full w-auto" src={jimImage} />
        </div>
        <div className="flex justify-center items-center text-white">
          Contact
        </div>
      </div>
    </div>
  )
}

export default App
