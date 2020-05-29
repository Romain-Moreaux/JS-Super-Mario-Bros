import Compositor from './Compositor.js'
import { loadLevel } from './loaders.js'
import { loadBackgroundSprites } from './sprites.js'
import { createBackgroundLayer, createSpritesLayer } from './layers.js'
import { createMario } from './entities.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([createMario(), loadBackgroundSprites(), loadLevel('1-1')]).then(
  ([mario, backgroundSprites, level]) => {
    const comp = new Compositor()
    console.log(comp)

    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundSprites
    )
    comp.layers.push(backgroundLayer)

    const gravity = 0.5

    const spritesLayer = createSpritesLayer(mario)
    comp.layers.push(spritesLayer)

    function update() {
      comp.draw(context)
      mario.update()
      mario.vel.y += gravity
      requestAnimationFrame(update)
    }

    update()
  }
)
