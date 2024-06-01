import { BackgroundCanvas } from './Background'

import './styles.css'

import titleImage from './assets/title.png'
import jimImage from './assets/jim.png'
import icon1 from './assets/icons/facebook.svg'
import icon2 from './assets/icons/instagram.svg'

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
        <main className="flex justify-center items-center h-[75%] relative">
          <div
            className="relative aspect-ratio-container"
            style={{ aspectRatio: '120/94' }}
          >
            <img
              className="absolute top-0 left-0 w-full h-full object-contain"
              src={jimImage}
              alt="Jim"
            />
            <a
              href="#link1" // Replace with the desired link
              className="absolute"
              style={{
                top: '65%',
                left: '30%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={icon1} alt="Icon 1" />
            </a>
            <a
              href="#link2" // Replace with the desired link
              className="absolute"
              style={{
                top: '70%',
                left: '60%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={icon2} alt="Icon 2" />
            </a>
            {/* Add more icons with appropriate links */}
          </div>
        </main>
        <footer className="flex justify-center items-center text-white h-[10%]">
          Contact
        </footer>
      </div>
    </div>
  )
}

export default App
