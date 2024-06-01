import { BackgroundCanvas } from './Background'

import './styles.css'

import titleImage from './assets/title.png'
import jimImage from './assets/jim.png'
import appleMusic from './assets/icons/apple-music.svg'
import facebook from './assets/icons/facebook.svg'
import instagram from './assets/icons/instagram.svg'
import soundcloud from './assets/icons/soundcloud.svg'
import spotify from './assets/icons/spotify.svg'
import youtube from './assets/icons/youtube.svg'

import { MdMail } from 'react-icons/md'

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
              href="https://music.apple.com/ca/artist/orange-octopus-jim/1722913416"
              target="_blank"
              className="absolute"
              style={{
                top: '74%',
                left: '72%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={appleMusic} alt="Apple Music" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61554985387535"
              target="_blank"
              className="absolute"
              style={{
                top: '57%',
                left: '25%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/orangeoctopusjim"
              target="_blank"
              className="absolute"
              style={{
                top: '67%',
                left: '35%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              href="https://soundcloud.com/orangeoctopusjim"
              target="_blank"
              className="absolute"
              style={{
                top: '85%',
                left: '63%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={soundcloud} alt="Soundcloud" />
            </a>
            <a
              href="https://open.spotify.com/artist/4e7WxRPI3ysWogDPUsxTXv?si=VnTjwi65SHep8Y3sLZSHpA"
              target="_blank"
              className="absolute"
              style={{
                top: '72%',
                left: '56%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={spotify} alt="Spotify" />
            </a>
            <a
              href="https://www.youtube.com/@orangeoctopusjim"
              target="_blank"
              className="absolute"
              style={{
                top: '75%',
                left: '20%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src={youtube} alt="Youtube" />
            </a>
          </div>
        </main>
        <footer className="flex justify-center items-center text-white h-[10%]">
          <a href="mailto:ooj@orangeoctopusjim.ink">
            <button className="bg-orange-600 text-white py-2 px-4 rounded-full flex flex-row gap-2 items-center">
              <MdMail />
              Contact
            </button>
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App
