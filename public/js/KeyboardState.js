const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  constructor() {
    // hold the current state of a key
    this.keyStates = new Map()
    // hold the callback func for a key code
    this.keyMap = new Map()
  }

  addMaping(code, callback) {
    this.keyMap.set(code, callback)
  }

  handleEvent(event) {
    const { code } = event

    // Abord if the key isn't mapped yet
    if (!this.keyMap.has(code)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    // Abord if the actual key is already pressed
    if (this.keyStates.get(code) === keyState) {
      return
    }

    this.keyStates.set(code, keyState)

    // Get the callback value and execute it
    this.keyMap.get(code)(keyState)
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
