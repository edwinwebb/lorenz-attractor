import React from 'react'
import { Canvas, } from 'react-three-fiber';
import {Line,OrbitControls,Html} from '@react-three/drei';

function LineGeomTest() {
    const points = test();
    return(
        <Line lineWidth={1} points={ points } />
    )
}


function test(e){
    var data = {
        time: 0,
        totalTime: 100,
        timeInc: 0.01,
        rho: 28,
        sigma: 10,
        beta: 8/3,
        x: 1,
        y: 2,
        z: 2
    },
    pointsArray = [];
    
    while(data.time < data.totalTime){
            // x' = sigma*(y-x)
            // y' = x*(rho - z) - y
            // z' = x*y - beta*z
            data.x = data.x + data.timeInc * (data.sigma * (data.y - data.x));
            data.y = data.y + data.timeInc * (data.x * (data.rho - data.z) - data.y);
            data.z = data.z + data.timeInc * (data.x * data.y - data.beta * data.z);
            
            pointsArray.push([data.x, data.y, data.z]);
            
            data.time = data.time + data.timeInc;
    }
    
    return(pointsArray);
}

export default function App() {
    return (<Canvas camera={{position: [0,0,-5], fov: 75}} pixelRatio={window.devicePixelRatio}>
        <color attach="background" args={[0x7ec0ee]} />
        <ambientLight color={ 0x404040 } intensity={0.3} />
        <pointLight position={[0,4,5]} color={0xffffff} distance={10} decay={1} intensity={0.5} />
        <hemisphereLight color={0xffffbb} groundColor={0x080820} intensity={0.33} />
        <spotLight color={0xffffff} intensity={0.8} distance={7} angle={0.8} decay={1} penumbra={1} position={[5, 1, -2]} />
        <LineGeomTest />
        <OrbitControls />
        <Html>
        <h1>hello</h1>
        <p>world</p>
        </Html>
    </Canvas>)
}
