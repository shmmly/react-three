import React, { FC, useState } from 'react'
import * as THREE from 'three';
interface Props {}
const Camera: FC<Props> = () => {
  const [] = useState()
  function initCamera() {
      const camera = new THREE.Camera()
      const light = new THREE.PointLight()
  }
  return <div />
}
export default Camera
