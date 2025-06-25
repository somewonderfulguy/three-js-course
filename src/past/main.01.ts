import * as THREE from 'three'

import './style.css'

// Scene
const scene = new THREE.Scene()

// Group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
group.add(cube1)

group.position.y = 1
group.scale.y = 2
group.rotation.y = 1

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
)
cube3.position.x = 2
group.add(cube3)

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// mesh.position.set(0.7, -0.6, 1)
// mesh.scale.set(2, 0.5, 0.5)

// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.5

// scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper(3)
// const axesHelperMesh = new THREE.AxesHelper(3)
// mesh.add(axesHelperMesh)
scene.add(axesHelper)

const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)

// camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position)

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
