import { BackgroundCanvas } from './Background'

import titleImage from './assets/title.png'
import jimImage from './assets/jim.png'

function App() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full absolute z-0 m-0">
        <BackgroundCanvas />
      </div>
      <div className="w-full h-full flex flex-col absolute z-10">
        <header className="flex justify-center items-center h-[15%]">
          <img
            className="max-h-full max-w-full object-contain"
            src={titleImage}
            alt="Title"
          />
        </header>
        <main className="flex justify-center items-center h-[75%]">
          <img
            className="max-h-full max-w-full object-contain"
            src={jimImage}
            alt="Jim"
          />
        </main>
        <footer className="flex justify-center items-center text-white h-[10%]">
          Contact
        </footer>
      </div>
    </div>
  )
}

export default App
