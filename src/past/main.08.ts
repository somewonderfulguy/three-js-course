import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import doorColor from './textures/door/color.jpg'
import doorAlpha from './textures/door/alpha.jpg'
import doorAmbientOcclusion from './textures/door/ambientOcclusion.jpg'
import doorHeight from './textures/door/height.jpg'
import doorNormal from './textures/door/normal.jpg'
import doorMetalness from './textures/door/metalness.jpg'
import doorRoughness from './textures/door/roughness.jpg'
import matcap from './textures/matcaps/3.png'
import gradient from './textures/gradients/5.jpg'

import './style.css'

// Debug
const gui = new GUI()

// Canvas
const canvas = document.createElement('canvas')
canvas.className = 'webgl'
document.body.appendChild(canvas)

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColor)
const doorAlphaTexture = textureLoader.load(doorAlpha)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusion)
const doorHeightTexture = textureLoader.load(doorHeight)
const doorNormalTexture = textureLoader.load(doorNormal)
const doorMetalnessTexture = textureLoader.load(doorMetalness)
const doorRoughnessTexture = textureLoader.load(doorRoughness)
const matcapTexture = textureLoader.load(matcap)
const gradientTexture = textureLoader.load(gradient)

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Objects
// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial()
// const material = new THREE.MeshDepthMaterial()
const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.wireframe = true

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)
// material.matcap = matcapTexture
// material.map = doorColorTexture
// material.color = new THREE.Color(0xff0000)
// material.wireframe = true
// material.flatShading = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// material.sheen = 1
// material.sheenRoughness = 0
// material.sheenColor = new THREE.Color(0x1188ff)
// gui.addColor(material, 'sheenColor')
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.add(material, 'sheen').min(0).max(1).step(0.0001)

// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(0).max(1).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(0).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(0).max(1000).step(1)

// material.transmission = 1
// material.ior = 1.5
// material.thickness = 0.5
// gui.add(material, 'transmission').min(0).max(1).step(0.0001)
// gui.add(material, 'ior').min(0).max(10).step(0.0001)
// gui.add(material, 'thickness').min(0).max(1).step(0.0001)

material.side = THREE.DoubleSide

const geometry = new THREE.SphereGeometry(0.5, 64, 64)
const sphere = new THREE.Mesh(geometry, material)
sphere.position.x = -1.5

const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = 0

const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 128)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

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

  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
