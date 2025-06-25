import * as THREE from 'three'
import gsap from 'gsap'

import './style.css'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 2, z: 1 })
gsap.to(mesh.position, { duration: 1, delay: 4, z: 0 })

// Animations
const tick = () => {
  // Update objects
  const elapsedTime = clock.getElapsedTime()
  mesh.rotation.y = elapsedTime * Math.PI * 2
  camera.position.y = Math.sin(elapsedTime)
  camera.position.x = Math.cos(elapsedTime)
  camera.lookAt(mesh.position)

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
