import { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './scene';

function App() {

  useEffect(() => {

    const Escena = new SceneInit('myThreeJsCanvas');

    Escena.initialize();

    Escena.animate();

    const AgregarCubo = (x: any, y: any, z: any) => {

      const GeometriaCubo = new THREE.BoxGeometry(1, 1, 1);

      const MaterialCubo = new THREE.MeshPhongMaterial({

        color: 0xfafafa,

      });

      const Cubo = new THREE.Mesh(GeometriaCubo, MaterialCubo);

      Cubo.position.set(x, y, z);

      Escena.scene.add(Cubo);

    };

    // top rows
    AgregarCubo(0, 2, 0);
    AgregarCubo(2, 2, 0);
    AgregarCubo(-2, 2, 0);
    AgregarCubo(0, 2, -2);
    AgregarCubo(2, 2, -2);
    AgregarCubo(-2, 2, -2);
    AgregarCubo(0, 2, 2);
    AgregarCubo(2, 2, 2);
    AgregarCubo(-2, 2, 2);

    // middle rows
    AgregarCubo(0, 0, 0);
    AgregarCubo(2, 0, 0);
    AgregarCubo(-2, 0, 0);
    AgregarCubo(0, 0, -2);
    AgregarCubo(2, 0, -2);
    AgregarCubo(-2, 0, -2);
    AgregarCubo(0, 0, 2);
    AgregarCubo(2, 0, 2);
    AgregarCubo(-2, 0, 2);

    // bottom rows
    AgregarCubo(0, -2, 0);
    AgregarCubo(2, -2, 0);
    AgregarCubo(-2, -2, 0);
    AgregarCubo(0, -2, -2);
    AgregarCubo(2, -2, -2);
    AgregarCubo(-2, -2, -2);
    AgregarCubo(0, -2, 2);
    AgregarCubo(2, -2, 2);
    AgregarCubo(-2, -2, 2);

    const Puntero = new THREE.Vector2();

    const Raycaster = new THREE.Raycaster();

    const onMouseMove = (event: any) => {

      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      Puntero.x = (event.clientX / window.innerWidth) * 2 - 1;

      Puntero.y = -(event.clientY / window.innerHeight) * 2 + 1;

      Raycaster.setFromCamera(Puntero, Escena.camera);

      const Intersecciones = Raycaster.intersectObjects(Escena.scene.children);

      // Cambiar el color de todo lo que atraviese el raycaster.
      for (let i = 0; i < Intersecciones.length; i++) {

        Intersecciones[i].object.material.color.set(0xff0000);

      }

      // Cambiar el color de lo primero que toque el raycaster.
      // if (Intersecciones.length > 0) {

      //   Intersecciones[0].object.material.color.set(0xff0000);

      // }

    };

    window.addEventListener('mousemove', onMouseMove);

  }, []);

  return (

    <div>

      <canvas id="myThreeJsCanvas" />

    </div>

  );

}

export default App;