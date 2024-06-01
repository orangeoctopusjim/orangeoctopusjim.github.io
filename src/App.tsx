import { BackgroundCanvas } from './Background'

function App() {
  return (
    <div className="bg-emerald-300 w-full h-full ">
      <div className="w-full h-full absolute">
        <BackgroundCanvas />
      </div>
      Welcome to Orange Octopus Jim's wonderful web wetsperience. Check out this
      track:
      <br />
      <audio controls src="ladybug.m4a">
        Spin
      </audio>
    </div>
  )
}

export default App
