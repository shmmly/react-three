import React, { FC, useRef, useState, FormEvent } from 'react'
import { Card, Button, Row, Col, Input, Form } from 'antd'
import * as THREE from 'three'
import { Camera, LineBasicMaterial } from 'three'
import { FormComponentProps } from 'antd/lib/form'



interface Props {}
const CourseTwo: FC<Props & FormComponentProps> = ({
  form: { getFieldDecorator, validateFields, resetFields }
}) => {
  const [flag, setFlag] = useState<boolean>(false)
  const [gridFlag, setGridFlag] = useState<boolean>(false)

  const [position, setPosition] = useState({ x: 300, y: 300, z: 300 })
  const [up, setUp] = useState({ x: 0, y: 1, z: 0 })

  const lineRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const drawCoordinateRef = useRef<HTMLDivElement>(null)

  function drawLine() {
    setFlag(!flag)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(400, 400)
    renderer.setClearColor(0x0000, 1.0)
    if (!flag) {
      lineRef.current && lineRef.current.append(renderer.domElement)
    } else {
      lineRef.current &&
        lineRef.current.removeChild(lineRef.current.childNodes[0])
    }

    const camera = new THREE.PerspectiveCamera(45, 400 / 400, 1, 10000)
    camera.position.x = 0
    camera.position.y = 1000
    camera.position.z = 0
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    const sence = new THREE.Scene()

    // 定义光线
    const light = new THREE.DirectionalLight(0xff0000, 1.0)
    light.position.set(100, 100, 200)
    sence.add(light)

    //   定义一个几何体
    const geometry = new THREE.Geometry()
    //  材质
    const meterial = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors
    })

    const p1 = new THREE.Vector3(-300, 10, 100)
    const p2 = new THREE.Vector3(100, 0, -100)

    const startCor = new THREE.Color(0x444444)
    const endCor = new THREE.Color(0xff0000)
    geometry.vertices.push(p1, p2)
    geometry.colors.push(startCor, endCor)
    //  第三个是线段的链接方式
    const line = new THREE.LineSegments(geometry, meterial)
    sence.add(line)
    renderer.clear()
    renderer.render(sence, camera)
  }

  function drawGrid() {
    setGridFlag(!gridFlag)
    // 定义render函数
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(400, 400)
    renderer.setClearColor(0xffffff, 1.0)
    if (!gridFlag) {
      gridRef.current && gridRef.current.append(renderer.domElement)
    } else {
      gridRef.current &&
        gridRef.current.removeChild(gridRef.current.childNodes[0])
    }
    const camera = new THREE.PerspectiveCamera()
    // 定义相机的位置
    camera.position.set(0, 0, -400)
    // 定义相机的朝向
    camera.up.set(0, 1, 0)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const sence = new THREE.Scene()
    const geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(-200, 0, 0))
    geometry.vertices.push(new THREE.Vector3(200, 0, 0))
    for (let i = 0; i <= 20; i++) {
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x0000, opacity: 0.2 })
      )
      line.position.y = i * 20 - 200
      sence.add(line)
      const line2 = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0x0000, opacity: 0.3 })
      )
      line2.position.x = i * 20 - 200
      line2.rotation.z = (90 * Math.PI) / 180
      sence.add(line2)
    }
    renderer.clear()
    renderer.render(sence, camera)
  }

  function drawCoordinate() {
    //   如果存在就先删除
    if (drawCoordinateRef.current && drawCoordinateRef.current.childNodes[0]) {
      drawCoordinateRef.current.removeChild(
        drawCoordinateRef.current.childNodes[0]
      )
    //   drawCoordinateRef.current.removeChild(
    //     drawCoordinateRef.current.childNodes[1]
    //   )
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(400, 400)
    renderer.setClearColor(0xffffff, 1.0)

    // const stats = new Stats()
    // stats.dom.style.position = 'absolute'
    // stats.dom.style.right = '0'
    // stats.dom.style.top = '0'

    if (drawCoordinateRef.current) {
      drawCoordinateRef.current.appendChild(renderer.domElement)
    //   drawCoordinateRef.current.appendChild(stats.dom)
    }

    const camera = new THREE.PerspectiveCamera()
    // 定义相机的位置
    camera.position.set(position.x, position.y, position.z)
    // 定义相机的朝向
    camera.up.set(up.x, up.y, up.z)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    const sence = new THREE.Scene()
    // X轴
    const xg = new THREE.Geometry()
    xg.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(200, 0, 0))
    const x = new THREE.Line(xg, new LineBasicMaterial({ color: 'red' }))
    sence.add(x)

    // y 轴
    const yg = new THREE.Geometry()
    yg.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 200, 0))
    const y = new THREE.Line(yg, new LineBasicMaterial({ color: 'blue' }))
    sence.add(y)
    //z 轴
    const zg = new THREE.Geometry()
    zg.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 200))
    const z = new THREE.Line(zg, new LineBasicMaterial({ color: 'black' }))
    sence.add(z)

    renderer.clear()
    renderer.render(sence, camera)
    // stats.update()
  }

  function setParams(e: FormEvent<any>) {
    e.preventDefault()
    validateFields((error, values) => {
      setPosition(values.position)
      setUp(values.up)
    })
  }

  function reset() {
    resetFields()
  }

  return (
    <div>
      <Row gutter={12}>
        <Col span={12}>
          <Card title="画一个彩色线" bordered>
            <Button onClick={drawLine}>开始绘制</Button>
            <div ref={lineRef} style={{ marginTop: 20 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="画一个网格" bordered>
            <Button onClick={drawGrid}>开始绘制</Button>
            <div ref={gridRef} style={{ marginTop: 20 }} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="画一个坐标轴">
            <Button onClick={drawCoordinate}>开始绘制</Button>
            <Form layout="inline" onSubmit={setParams}>
              <Form.Item label="相机position x轴">
                {getFieldDecorator('position.x', {
                  initialValue: position.x
                })(<Input />)}
              </Form.Item>
              <Form.Item label="相机up x轴">
                {getFieldDecorator('up.x', {
                  initialValue: up.x
                })(<Input />)}
              </Form.Item>
              <Form.Item label="相机position y轴">
                {getFieldDecorator('position.y', {
                  initialValue: position.y
                })(<Input />)}
              </Form.Item>
              <Form.Item label="相机up y轴">
                {getFieldDecorator('up.y', {
                  initialValue: up.y
                })(<Input />)}
              </Form.Item>
              <Form.Item label="相机position z轴">
                {getFieldDecorator('position.z', {
                  initialValue: position.z
                })(<Input />)}
              </Form.Item>
              <Form.Item label="相机up z轴">
                {getFieldDecorator('up.z', {
                  initialValue: up.z
                })(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={reset}>
                  重置
                </Button>
              </Form.Item>
            </Form>

            <div ref={drawCoordinateRef} style={{ marginTop: 20 }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Form.create()(CourseTwo)
