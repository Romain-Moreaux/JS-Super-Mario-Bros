import { loadLevel } from './loaders.js'
import { createMario } from './entities.js'
import Timer from './Timer.js'
import { setupKeyboard } from './input.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  mario.pos.set(64, 64)

  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  // For debugging purposes
  // const collisionLayer = createCollisionLayer(level)
  // level.comp.layers.push(collisionLayer)
  // ;['mousedown', 'mousemove'].forEach((eventName) => {
  //   canvas.addEventListener(eventName, (event) => {
  //     if (event.buttons === 1) {
  //       mario.vel.set(0, 0)
  //       mario.pos.set(event.offsetX, event.offsetY)
  //     }
  //   })
  // })

  const timer = new Timer(1 / 60)
  timer.update = function update(deltaTime) {
    level.update(deltaTime)
    level.comp.draw(context)
  }
  timer.start()
})
