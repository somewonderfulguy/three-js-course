import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import './style.css'

console.log(OrbitControls)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Cursor position
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / 800 - 1
  cursor.y = event.clientY / 600 - 1
})

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// )

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1
// controls.update()
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // mesh.rotation.y = elapsedTime

  // Update camera
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.position.x = cursor.x * 3
  // camera.position.y = cursor.y * 3 * -1
  // camera.lookAt(mesh.position)

  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
