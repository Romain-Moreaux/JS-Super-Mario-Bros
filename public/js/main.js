import { loadLevel } from './loaders.js'
import { createMario } from './entities.js'
import Timer from './Timer.js'
import { setupKeyboard } from './input.js'
import { createCollisionLayer } from './layers.js'
import Camera from './Camera.js'
import { setupMouseControl } from './setupMouseControl.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  const camera = new Camera()
  window.camera = camera
  const collisionLayer = createCollisionLayer(level)
  level.comp.layers.push(collisionLayer)

  mario.pos.set(64, 64)

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  // For debugging purposes
  setupMouseControl(canvas, mario, camera)

  const timer = new Timer(1 / 60)
  timer.update = function update(deltaTime) {
    level.update(deltaTime)
    level.comp.draw(context, camera)
  }
  timer.start()
})
