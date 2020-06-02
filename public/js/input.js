import Keyboard from './KeyboardState.js'

export function setupKeyboard(entity) {
  const input = new Keyboard()

  input.addMaping('Space', (keyState) => {
    if (keyState) {
      entity.jump.start()
    } else {
      entity.jump.cancel()
    }
  })
  input.addMaping('ArrowRight', (keyState) => {
    entity.go.dir = keyState
  })
  input.addMaping('ArrowLeft', (keyState) => {
    entity.go.dir = -keyState
  })

  return input
}
