const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  constructor() {
    // hold the current state of a key
    this.keyStates = new Map()
    // hold the callback func for a key code
    this.keyMap = new Map()
  }

  addMaping(keyCode, callback) {
    this.keyMap.set(keyCode, callback)
  }

  handleEvent(event) {
    const { keyCode } = event

    // Abord if the key isn't mapped yet
    if (!this.keyMap.has(keyCode)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    // Abord if the actual key is already pressed
    if (this.keyStates.get(keyCode) === keyState) {
      return
    }

    this.keyStates.set(keyCode, keyState)
    console.log(this.keyStates)

    // Get the callback value and execute it
    this.keyMap.get(keyCode)(keyState)
  }

  // bind events with the custom handleEvent
  listenTo(window) {
    ;['keydown', 'keyup'].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event)
      })
    })
  }
}
