import React, { FC, useRef, useEffect } from 'react'
import * as THREE from 'three'
interface Props {}
const CourseOne: FC<Props> = () => {
  let ele = useRef()

  useEffect(() => {
    init(ele)
  }, [ele])

  function init(ele: any) { 
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)

    ele.current.appendChild(renderer.domElement)

    const geometry = new THREE.Geometry()

    geometry.vertices.push(new THREE.Vector3(1, 1, 1))
  

    const material = new THREE.Material()

    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 10

    function render() {
      requestAnimationFrame(render)
      cube.rotation.x += 0.1
      cube.rotation.y += 0.1
      renderer.render(scene, camera)
    }
  }
  //@ts-ignore
  return <div ref={ele} />
}
export default CourseOne
