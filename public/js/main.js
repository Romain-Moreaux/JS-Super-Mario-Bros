import { loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'
import Compositor from './Compositor.js'
import { createBackgroundLayer } from './layers.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

function createSpritesLayer(sprites, pos) {
  return function drawSpriteBuffer(context) {
    for (let i = 0; i < 20; i++) {
      sprites.draw('idle', context, pos.x + i * 16, pos.y)
    }
  }
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([marioSprites, backgroundSprites, level]) => {
  const comp = new Compositor()
  console.log(comp)

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  )
  comp.layers.push(backgroundLayer)

  const pos = {
    x: 0,
    y: 0,
  }

  const spritesLayer = createSpritesLayer(marioSprites, pos)
  comp.layers.push(spritesLayer)

  function update() {
    comp.draw(context)
    pos.x += 2
    pos.y += 2
    requestAnimationFrame(update)
  }

  update()
})
