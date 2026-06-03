'use client'

import {useEffect, useRef} from "react";
import * as THREE from "three";

export default function AdminOrbitScene() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0.35, 5.8);

        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const core = new THREE.Group();
        scene.add(core);

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 1.5, 1.5, 6, 6, 6),
            new THREE.MeshStandardMaterial({
                color: 0x34d399,
                metalness: 0.45,
                roughness: 0.22,
                emissive: 0x063b2b,
                emissiveIntensity: 0.55,
            })
        );
        core.add(cube);

        const wire = new THREE.Mesh(
            new THREE.BoxGeometry(1.72, 1.72, 1.72),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.4,
            })
        );
        core.add(wire);

        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.58,
            side: THREE.DoubleSide,
        });
        const ringOne = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 12, 120), ringMaterial);
        const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.01, 12, 120), ringMaterial.clone());
        ringOne.rotation.x = Math.PI / 2.8;
        ringTwo.rotation.y = Math.PI / 2.4;
        core.add(ringOne, ringTwo);

        const grid = new THREE.GridHelper(7, 18, 0x34d399, 0x334155);
        grid.position.y = -2.1;
        grid.material.transparent = true;
        grid.material.opacity = 0.34;
        scene.add(grid);

        const points = new THREE.BufferGeometry();
        const pointPositions = new Float32Array(120 * 3);
        for (let index = 0; index < pointPositions.length; index += 3) {
            pointPositions[index] = (Math.random() - 0.5) * 7;
            pointPositions[index + 1] = (Math.random() - 0.5) * 4.2;
            pointPositions[index + 2] = (Math.random() - 0.5) * 4;
        }
        points.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
        const pointField = new THREE.Points(
            points,
            new THREE.PointsMaterial({
                color: 0xa7f3d0,
                size: 0.025,
                transparent: true,
                opacity: 0.65,
            })
        );
        scene.add(pointField);

        scene.add(new THREE.AmbientLight(0xffffff, 1.4));
        const keyLight = new THREE.DirectionalLight(0x99f6e4, 2.2);
        keyLight.position.set(3, 4, 5);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0x38bdf8, 12, 9);
        rimLight.position.set(-3, -1, 3);
        scene.add(rimLight);

        const resize = () => {
            const {clientWidth, clientHeight} = container;
            renderer.setSize(clientWidth, clientHeight, false);
            camera.aspect = clientWidth / Math.max(clientHeight, 1);
            camera.updateProjectionMatrix();
        };

        const observer = new ResizeObserver(resize);
        observer.observe(container);
        resize();

        let animationFrame = 0;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            core.rotation.x = elapsed * 0.32;
            core.rotation.y = elapsed * 0.48;
            ringOne.rotation.z = elapsed * 0.7;
            ringTwo.rotation.x = elapsed * 0.55;
            pointField.rotation.y = elapsed * 0.08;
            grid.position.z = (elapsed * 0.24) % 1;

            renderer.render(scene, camera);
            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            observer.disconnect();
            container.removeChild(renderer.domElement);
            cube.geometry.dispose();
            cube.material.dispose();
            wire.geometry.dispose();
            wire.material.dispose();
            ringOne.geometry.dispose();
            ringTwo.geometry.dispose();
            ringMaterial.dispose();
            grid.geometry.dispose();
            grid.material.dispose();
            points.dispose();
            pointField.material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0" aria-hidden="true"/>;
}
