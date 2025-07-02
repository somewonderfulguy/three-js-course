import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

import matcap from './textures/matcaps/7.png'

import './style.css'

// Debug
const gui = new GUI()

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Scene
const scene = new THREE.Scene()

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load(matcap)
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('こんにちわ Three.js', {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 12,
  })

  textGeometry.computeBoundingBox()
  console.log(textGeometry.boundingBox)
  textGeometry.center()
  // if (textGeometry.boundingBox) {
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5, // Subtract bevel thickness
  //   )
  // }
  textGeometry.computeBoundingBox()
  console.log(textGeometry.boundingBox)

  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
})

console.time('donuts')

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

for (let i = 0; i < 1000; i++) {
  const donut = new THREE.Mesh(donutGeometry, material)

  donut.position.x = (Math.random() - 0.5) * 12
  donut.position.y = (Math.random() - 0.5) * 12
  donut.position.z = (Math.random() - 0.5) * 12

  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI

  const scale = Math.random()
  donut.scale.set(scale, scale, scale)

  scene.add(donut)
}

console.timeEnd('donuts')

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
camera.position.z = 2
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
