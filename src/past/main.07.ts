import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import doorColor from './textures/door/color.jpg'
import checkerboard from './textures/checkerboard-1024x1024.png'
import checkerboard8x8 from './textures/checkerboard-8x8.png'
import minecraft from './textures/minecraft.png'
import doorAlpha from './textures/door/alpha.jpg'
import doorAmbientOcclusion from './textures/door/ambientOcclusion.jpg'
import doorHeight from './textures/door/height.jpg'
import doorMetalness from './textures/door/metalness.jpg'
import doorNormal from './textures/door/normal.jpg'
import doorRoughness from './textures/door/roughness.jpg'

import './style.css'

// Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load(doorColor)
// const colorTexture = textureLoader.load(checkerboard)
// const colorTexture = textureLoader.load(checkerboard8x8)
const colorTexture = textureLoader.load(minecraft)
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load(doorAlpha)
const ambientOcclusionTexture = textureLoader.load(doorAmbientOcclusion)
const heightTexture = textureLoader.load(doorHeight)
const metalnessTexture = textureLoader.load(doorMetalness)
const normalTexture = textureLoader.load(doorNormal)
const roughnessTexture = textureLoader.load(doorRoughness)

// colorTexture.repeat.set(2, 3)
// colorTexture.offset.set(0.5, 0)
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.set(0.5, 0.5)
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping

// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () => {
//   texture.needsUpdate = true
// }

// image.src = doorColor

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
