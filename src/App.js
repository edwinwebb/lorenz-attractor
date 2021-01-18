import React, {useState} from 'react'
import { Canvas } from 'react-three-fiber';
import {Line,OrbitControls} from '@react-three/drei';

function LineGeomTest(props) {
    const {data} =  props
    const points = lorenzPoints(data);
    
    return(
        <Line lineWidth={1} points={points} />
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

export default function App() {
    const [data, updateData] = useState({
        start: 0,
        end: 11,
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
        <input type="number" step="1" value={data.rho}  onChange={ (e)=>{ updateData({...data, rho: parseFloat(e.target.value)})} }/>
        <hr />
        <label>sigma</label>
        <input type="number" step="1" value={data.sigma}  onChange={ (e)=>{ updateData({...data, sigma: parseFloat(e.target.value)})} }/>
        <hr />
    </div>
    <div id="wrap">
        <Canvas camera={{position: [0,0,-5], fov: 75}} pixelRatio={window.devicePixelRatio}>
            <color attach="background" args={[0xf5f4f4]} />
            <LineGeomTest data={data} />
            <OrbitControls />
        </Canvas>
    </div>
    
    </>)
}
