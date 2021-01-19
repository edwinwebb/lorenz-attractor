import React, {useState} from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import {Line,OrbitControls} from '@react-three/drei';
import { a } from '@react-spring/three'
import { useSpring } from '@react-spring/core'

const LineGeomTest = (props) => {
    const {data, color = 'black'} =  props;
    const points = lorenzPoints(data);

    return(
        <Line lineWidth={2} points={points} color={ color } {...props} />
    )
}

function Box(props) {
    const [active, setActive] = useState(0)
  
    // create a common spring that will be used later to interpolate other values
    const { spring } = useSpring({
      spring: active,
      config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    })
  
    // interpolate values from common spring
    const scale = spring.to([0, 1], [1, 5])
    const rotation = spring.to([0, 1], [0, Math.PI])
    const color = spring.to([0, 1], ['#6246ea', '#e45858'])
  
    return (
      // using a from react-spring will animate our component
      <a.mesh rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} color={color} />
      </a.mesh>
    )
  }

function lorenzPoints(data) {
    const {
        start,
        end,
        increment,
        rho,
        sigma,
        beta
    } = data;
    let {
        x,
        y,
        z
    } = {...data}
    const points = [];
    const pointCap = 100000;
    
    for(let i = start; i < Math.min(pointCap, end); i+=increment) {
        x = x + increment * (sigma * (y-x));
        y = y + increment * (x * (rho-z) - y);
        z = z + increment * (x * y - beta * z);
        points.push([x,y,z])
    }
    return points
}

function Dolly() {
    useFrame(state => {
        state.camera.position.z = -150 + Math.sin(state.clock.getElapsedTime()) * 30
        state.camera.updateProjectionMatrix()
    })
    return null
}

export default function App() {
    const [data, updateData] = useState({
        start: 100,
        end: 200,
        increment: 0.01,
        rho: 28,
        sigma: 10,
        beta: 8/3,
        x: 1,
        y: 1,
        z: 1
    });
    
    return (<>
    <div id="side">
        <h1>Lorenz Attractor</h1>
        <p>The Lorenz system is a system of ordinary differential equations first studied by Edward Lorenz and Ellen Fetter. It is notable for having chaotic solutions for certain parameter values and initial conditions. In particular, the Lorenz attractor is a set of chaotic solutions of the Lorenz system. In popular media the 'butterfly effect' stems from the real-world implications of the Lorenz attractor, i.e. that in any physical system, in the absence of perfect knowledge of the initial conditions (even the minuscule disturbance of the air due to a butterfly flapping its wings), our ability to predict its future course will always fail. </p>
        <hr />
        <label>Start Time</label>
        <input type="number" step="1" value={data.start} onChange={ (e)=>{ updateData({...data, start: parseFloat(e.target.value)})} } />
        <hr />
        <label>Stop Time</label>
        <input type="number" step="10" value={data.end} onChange={ (e)=>{ updateData({...data, end: parseFloat(e.target.value)})} }/>
        <hr />
        <label>Increment</label>
        <input type="number" step="0.01" value={data.increment} min={0.001} onChange={ (e)=>{ updateData({...data, increment: parseFloat(e.target.value)})} }/>
        <hr />
        <label>rho</label>
        <input type="number" step="1" min="0" max="100" value={data.rho}  onChange={ (e)=>{ updateData({...data, rho: parseFloat(e.target.value)})} }/>
        <hr />
        <label>sigma</label>
        <input type="number" step="1" min="0" max="30" value={data.sigma}  onChange={ (e)=>{ updateData({...data, sigma: parseFloat(e.target.value)})} }/>
        <hr />
        <label>beta</label>
        <input type="number" step="0.1" min="0" max="5" value={data.beta}  onChange={ (e)=>{ updateData({...data, beta: parseFloat(e.target.value)})} }/>
        <hr />
    </div>
    <div id="wrap">
        <Canvas camera={{position: [0,0,-20], fov: 75}} pixelRatio={window.devicePixelRatio}>
            <color attach="background" args={[0xf5f4f4]} />
            <LineGeomTest position={[0,0,-28]} data={data} />
            <OrbitControls />
            <axesHelper />
            <Box />
        </Canvas>
    </div>
    
    </>)
}
