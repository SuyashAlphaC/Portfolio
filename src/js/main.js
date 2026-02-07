import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// Advanced Three.js Portfolio with Complex Scroll Animations
class ArtisticPortfolio {
    constructor() {
        this.scrollY = 0;
        this.currentSection = 0;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();

        // Scene management
        this.scenes = {
            hero: null,
            about: null,
            skills: null,
            contact: null,
            projects: []
        };

        this.cameras = {
            hero: null,
            about: null,
            skills: null,
            contact: null,
            projects: []
        };

        this.renderers = {
            hero: null,
            about: null,
            skills: null,
            contact: null,
            projects: []
        };

        // Particle systems and complex geometries
        this.particleSystems = [];
        this.morphingGeometries = [];
        this.shaderMaterials = [];

        this.init();
    }

    init() {
        this.setupAdvancedHeroScene();
        this.setupDynamicAboutScene();
        this.setupNetworkSkillsScene();
        this.setupAdvancedContactScene();
        this.setupAdvancedProjectScenes();
        this.setupScrollAnimations();
        this.setupMouseInteractions();
        this.setupResponsiveHandling();
        this.animate();
    }

    // Advanced Hero Scene with Complex Blockchain Visualization
    setupAdvancedHeroScene() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Advanced lighting setup
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
        scene.add(ambientLight);

        // Dynamic point lights that move with scroll
        const pointLight1 = new THREE.PointLight(0x6366f1, 2, 50);
        pointLight1.position.set(10, 10, 10);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xf59e0b, 1.5, 30);
        pointLight2.position.set(-10, -5, 5);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x10b981, 1, 40);
        pointLight3.position.set(0, 15, -10);
        scene.add(pointLight3);

        // Complex blockchain network visualization
        this.createAdvancedBlockchainNetwork(scene);

        // Particle field background
        this.createAdvancedParticleField(scene);

        // Floating geometric shapes
        this.createFloatingGeometry(scene);

        camera.position.set(0, 0, 20);

        this.scenes.hero = scene;
        this.cameras.hero = camera;
        this.renderers.hero = renderer;

        // Store lights for animation
        this.heroLights = [pointLight1, pointLight2, pointLight3];
    }

    createAdvancedBlockchainNetwork(scene) {
        const group = new THREE.Group();

        // Create complex node network
        const nodes = [];
        const nodeGeometry = new THREE.IcosahedronGeometry(0.8, 2);

        // Shader material for nodes
        const vertexShader = `
            varying vec3 vPosition;
            varying vec3 vNormal;
            uniform float time;
            
            void main() {
                vPosition = position;
                vNormal = normal;
                
                vec3 pos = position;
                pos += normal * sin(time * 2.0 + position.x * 10.0) * 0.1;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragmentShader = `
            varying vec3 vPosition;
            varying vec3 vNormal;
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                vec3 glow = mix(color1, color2, sin(time + vPosition.x * 5.0) * 0.5 + 0.5);
                gl_FragColor = vec4(glow * intensity, 1.0);
            }
        `;

        // Create interconnected nodes
        const nodePositions = [
            [0, 3, 0], [4, 1, 2], [-4, 1, -2], [2, -2, 3],
            [-3, -1, 1], [1, 1, -4], [-1, 4, 1], [3, -3, -1],
            [0, 0, 5], [-2, 2, -3]
        ];

        nodePositions.forEach((pos, index) => {
            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    time: { value: 0 },
                    color1: { value: new THREE.Color(0x6366f1) },
                    color2: { value: new THREE.Color(0xf59e0b) }
                },
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const node = new THREE.Mesh(nodeGeometry, material);
            node.position.set(...pos);
            node.userData = { index, material };
            nodes.push(node);
            group.add(node);
        });

        // Create animated connections
        this.createAnimatedConnections(group, nodes);

        // Add data streams
        this.createDataStreams(group, nodes);

        scene.add(group);
        this.blockchainGroup = group;
        this.blockchainNodes = nodes;
    }

    createAnimatedConnections(group, nodes) {
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6],
            [5, 7], [6, 8], [7, 9], [8, 0], [9, 1], [2, 7]
        ];

        connections.forEach(([i, j]) => {
            const start = nodes[i].position;
            const end = nodes[j].position;

            // Create tube geometry for connections
            const curve = new THREE.CatmullRomCurve3([
                start.clone(),
                start.clone().lerp(end, 0.3).add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)),
                start.clone().lerp(end, 0.7).add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)),
                end.clone()
            ]);

            const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
            const tubeMaterial = new THREE.MeshBasicMaterial({
                color: 0x818cf8,
                transparent: true,
                opacity: 0.6,
                emissive: 0x6366f1,
                emissiveIntensity: 0.2
            });

            const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
            tube.userData = { type: 'connection', curve };
            group.add(tube);
        });
    }

    createDataStreams(group, nodes) {
        // Create flowing data particles along connections
        const particleCount = 200;
        const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);

        for (let i = 0; i < particleCount; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.8),
                transparent: true,
                opacity: 0.8
            });

            const particle = new THREE.Mesh(particleGeometry, material);
            particle.userData = {
                speed: 0.01 + Math.random() * 0.02,
                path: Math.floor(Math.random() * nodes.length),
                progress: Math.random()
            };

            group.add(particle);
        }
    }

    createAdvancedParticleField(scene) {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Position
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            // Color
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Size
            sizes[i] = Math.random() * 2 + 0.5;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        this.heroParticles = particles;
    }

    createFloatingGeometry(scene) {
        const group = new THREE.Group();

        // Create various floating geometric shapes
        const geometries = [
            new THREE.TetrahedronGeometry(1, 2),
            new THREE.OctahedronGeometry(1.2, 1),
            new THREE.DodecahedronGeometry(0.8, 0),
            new THREE.IcosahedronGeometry(1.1, 1)
        ];

        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6),
                metalness: 0.3,
                roughness: 0.4,
                transparent: true,
                opacity: 0.7,
                transmission: 0.3,
                thickness: 1
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20
            );

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatRange: Math.random() * 2 + 1,
                initialY: mesh.position.y
            };

            group.add(mesh);
        }

        scene.add(group);
        this.floatingGeometry = group;
    }

    // Dynamic About Section with Morphing DNA
    setupDynamicAboutScene() {
        const canvas = document.getElementById('about-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create morphing DNA structure
        this.createMorphingDNA(scene);

        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xf59e0b, 1, 20);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 12;

        this.scenes.about = scene;
        this.cameras.about = camera;
        this.renderers.about = renderer;
    }

    createMorphingDNA(scene) {
        const group = new THREE.Group();
        const radius = 3;
        const height = 10;
        const segments = 200;

        // Create double helix with morphing capabilities
        const helix1Points = [];
        const helix2Points = [];
        const connectionLines = [];

        for (let i = 0; i < segments; i++) {
            const y = (i / segments) * height - height / 2;
            const angle1 = (i / segments) * Math.PI * 10;
            const angle2 = angle1 + Math.PI;

            const x1 = Math.cos(angle1) * radius;
            const z1 = Math.sin(angle1) * radius;
            const x2 = Math.cos(angle2) * radius;
            const z2 = Math.sin(angle2) * radius;

            helix1Points.push(new THREE.Vector3(x1, y, z1));
            helix2Points.push(new THREE.Vector3(x2, y, z2));
        }

        // Create helix curves
        const curve1 = new THREE.CatmullRomCurve3(helix1Points);
        const curve2 = new THREE.CatmullRomCurve3(helix2Points);

        // Helix tubes
        const tubeGeometry1 = new THREE.TubeGeometry(curve1, segments, 0.1, 8, false);
        const tubeGeometry2 = new THREE.TubeGeometry(curve2, segments, 0.1, 8, false);

        const tubeMaterial1 = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.2,
            roughness: 0.3,
            transparent: true,
            opacity: 0.8,
            emissive: 0x6366f1,
            emissiveIntensity: 0.1
        });

        const tubeMaterial2 = new THREE.MeshPhysicalMaterial({
            color: 0xf59e0b,
            metalness: 0.2,
            roughness: 0.3,
            transparent: true,
            opacity: 0.8,
            emissive: 0xf59e0b,
            emissiveIntensity: 0.1
        });

        const tube1 = new THREE.Mesh(tubeGeometry1, tubeMaterial1);
        const tube2 = new THREE.Mesh(tubeGeometry2, tubeMaterial2);

        group.add(tube1, tube2);

        // Add connecting rungs
        for (let i = 0; i < segments; i += 10) {
            const start = helix1Points[i];
            const end = helix2Points[i];

            const rungGeometry = new THREE.CylinderGeometry(0.05, 0.05, start.distanceTo(end), 8);
            const rungMaterial = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.6 });
            const rung = new THREE.Mesh(rungGeometry, rungMaterial);

            rung.position.copy(start.clone().lerp(end, 0.5));
            rung.lookAt(end);
            rung.rotateX(Math.PI / 2);

            group.add(rung);
        }

        // Add floating data nodes
        for (let i = 0; i < 20; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.8),
                transparent: true,
                opacity: 0.8
            });

            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * height,
                (Math.random() - 0.5) * 12
            );

            node.userData = {
                floatSpeed: Math.random() * 0.02 + 0.01,
                rotationSpeed: Math.random() * 0.05 + 0.02
            };

            group.add(node);
        }

        scene.add(group);
        this.dnaGroup = group;
    }

    // Network Skills Visualization
    setupNetworkSkillsScene() {
        const canvas = document.getElementById('skills-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        const container = canvas.parentElement;
        const updateSize = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = Math.max(rect.height, 600); // Ensure minimum height
            
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
        
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create 3D skill network
        this.createSkillNetwork3D(scene);

        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.8);
        scene.add(ambientLight);

        camera.position.z = 12; // Moved closer for better visibility

        this.scenes.skills = scene;
        this.cameras.skills = camera;
        this.renderers.skills = renderer;
    }

    createSkillNetwork3D(scene) {
        const group = new THREE.Group();

        // Define skills with 3D positions and specific geometries
        const skills = [
            { name: 'Solidity', position: [0, 3, 0], color: 0x6366f1, connections: [1, 2, 3], shape: 'diamond' },
            { name: 'Cairo', position: [3, 1, 2], color: 0xff6b35, connections: [0, 4, 5], shape: 'pyramid' },
            { name: 'JavaScript', position: [-3, 1, -1], color: 0xf7df1e, connections: [0, 5, 6], shape: 'cube' },
            { name: 'Ethereum', position: [2, -1, 3], color: 0x627eea, connections: [0, 1, 7], shape: 'diamond' },
            { name: 'StarkNet', position: [-2, -1, 1], color: 0x6c5ce7, connections: [1, 2, 8], shape: 'star' },
            { name: 'Rust', position: [1, 2, -3], color: 0xce422b, connections: [1, 2, 9], shape: 'gear' },
            { name: 'Solana', position: [-1, 0, -2], color: 0x9945ff, connections: [2, 5, 10], shape: 'waves' },
            { name: 'TypeScript', position: [0, -2, 2], color: 0x3178c6, connections: [2, 6, 11], shape: 'cube' },
            { name: 'Docker', position: [-3, 2, 0], color: 0x2496ed, connections: [4, 6, 7], shape: 'cube' },
            { name: 'Chainlink', position: [3, -2, -1], color: 0x375bd2, connections: [0, 6, 7], shape: 'diamond' },
            { name: 'Git', position: [1, 1, 4], color: 0xf05032, connections: [6, 8, 9], shape: 'sphere' },
            { name: 'Linux', position: [-1, -3, -1], color: 0xfcc624, connections: [7, 8, 10], shape: 'sphere' },
            { name: 'C++', position: [2, 0, -3], color: 0x00599c, connections: [5, 9, 11], shape: 'cube' },
            { name: 'Kubernetes', position: [-2, 3, 2], color: 0x326ce5, connections: [8, 11, 12], shape: 'sphere' },
            { name: 'Noir', position: [4, 1, 0], color: 0x1a1a1a, connections: [0, 1, 4], shape: 'diamond' },
            { name: 'Vercel', position: [0, 2, 3], color: 0x000000, connections: [2, 7, 10], shape: 'pyramid' }
        ];

        const nodes = [];

        // Create skill nodes with custom geometries
        skills.forEach((skill, index) => {
            let geometry;

            // Custom geometry based on skill type
            switch (skill.shape) {
                case 'diamond': // Ethereum/Solidity
                    geometry = new THREE.OctahedronGeometry(0.5, 1);
                    break;
                case 'pyramid': // Cairo/StarkNet
                    geometry = new THREE.TetrahedronGeometry(0.6, 1);
                    break;
                case 'cube': // JavaScript
                    geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
                    break;
                case 'star': // StarkNet
                    geometry = new THREE.IcosahedronGeometry(0.5, 2);
                    break;
                case 'gear': // Rust
                    geometry = new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8, 2, 3);
                    break;
                case 'waves': // Solana
                    geometry = new THREE.CylinderGeometry(0.3, 0.5, 0.8, 8);
                    break;
                case 'torus': // DeFi
                    geometry = new THREE.TorusGeometry(0.4, 0.2, 8, 16);
                    break;
                case 'anchor': // Anchor framework
                    geometry = new THREE.ConeGeometry(0.3, 0.8, 8);
                    break;
                case 'anvil': // Foundry
                    geometry = new THREE.CylinderGeometry(0.6, 0.4, 0.5, 8);
                    break;
                case 'hardhat': // Hardhat
                    geometry = new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
                    break;
                default:
                    geometry = new THREE.IcosahedronGeometry(0.4, 2);
            }

            const material = new THREE.MeshPhysicalMaterial({
                color: skill.color,
                metalness: 0.7,
                roughness: 0.3,
                transparent: true,
                opacity: 0.9,
                emissive: skill.color,
                emissiveIntensity: 0.3,
                clearcoat: 1,
                clearcoatRoughness: 0.2
            });

            const node = new THREE.Mesh(geometry, material);
            node.position.set(...skill.position);
            node.userData = {
                skill: skill.name,
                index,
                originalPosition: new THREE.Vector3(...skill.position),
                pulsing: false,
                shape: skill.shape
            };

            nodes.push(node);
            group.add(node);

            // Add skill label with better positioning
            this.createEnhancedSkillLabel(group, skill.name, node.position, skill.color);
        });

        // Create enhanced connections with different styles
        skills.forEach((skill, index) => {
            skill.connections.forEach(connIndex => {
                if (connIndex < skills.length) {
                    this.createEnhancedConnection(group, nodes[index].position, nodes[connIndex].position, skill.color);
                }
            });
        });

        scene.add(group);
        this.skillsGroup = group;
        this.skillNodes = nodes;
    }

    createSkillLabel(group, text, position, color) {
        // Create a simple sprite for the label
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.font = 'Bold 24px Arial';
        context.textAlign = 'center';
        context.fillText(text, 128, 32);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.copy(position);
        sprite.position.y += 1;
        sprite.scale.set(2, 0.5, 1);

        group.add(sprite);
    }

    createEnhancedSkillLabel(group, text, position, color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 80;

        // Background with rounded rectangle
        context.fillStyle = `rgba(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}, 0.8)`;
        context.fillRect(10, 10, 280, 60);

        // Text
        context.fillStyle = '#ffffff';
        context.font = 'Bold 24px "JetBrains Mono", monospace';
        context.textAlign = 'center';
        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowBlur = 4;
        context.fillText(text, 150, 50);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            alphaTest: 0.1
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.copy(position);
        sprite.position.y += 1;
        sprite.scale.set(1.8, 0.48, 1);

        group.add(sprite);
    }

    createDynamicConnection(group, start, end) {
        const points = [start.clone(), end.clone()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({
            color: 0x818cf8,
            transparent: true,
            opacity: 0.4,
            linewidth: 2
        });

        const line = new THREE.Line(geometry, material);
        line.userData = { type: 'connection' };
        group.add(line);
    }

    createEnhancedConnection(group, start, end, color) {
        // Create animated tube connections
        const curve = new THREE.CatmullRomCurve3([
            start.clone(),
            start.clone().lerp(end, 0.3).add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)),
            start.clone().lerp(end, 0.7).add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)),
            end.clone()
        ]);

        const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
        const tubeMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
            emissive: color,
            emissiveIntensity: 0.2
        });

        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        tube.userData = { type: 'enhanced_connection', curve, color };
        group.add(tube);

        // Add data flow particles
        for (let i = 0; i < 3; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.8
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.userData = {
                type: 'flow_particle',
                curve: curve,
                progress: i * 0.33,
                speed: 0.01 + Math.random() * 0.01
            };
            group.add(particle);
        }
    }

    // Advanced Contact Scene
    setupAdvancedContactScene() {
        const canvas = document.getElementById('contact-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create holographic communication network
        this.createHolographicNetwork(scene);

        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
        scene.add(ambientLight);

        camera.position.z = 12;

        this.scenes.contact = scene;
        this.cameras.contact = camera;
        this.renderers.contact = renderer;
    }

    createHolographicNetwork(scene) {
        const group = new THREE.Group();

        // Create holographic globe
        const globeGeometry = new THREE.SphereGeometry(3, 64, 64);
        const globeMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        group.add(globe);

        // Create data points on globe
        for (let i = 0; i < 100; i++) {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;

            const x = 3 * Math.sin(theta) * Math.cos(phi);
            const y = 3 * Math.cos(theta);
            const z = 3 * Math.sin(theta) * Math.sin(phi);

            const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const pointMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.8),
                transparent: true,
                opacity: 0.8
            });

            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.set(x, y, z);
            point.userData = {
                pulseSpeed: Math.random() * 0.02 + 0.01,
                originalScale: point.scale.clone()
            };

            group.add(point);
        }

        // Create orbital rings with different orientations
        const ringGeometry = new THREE.TorusGeometry(4, 0.05, 8, 100);

        const ring1 = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.6 }));
        const ring2 = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 }));
        const ring3 = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 }));

        ring2.rotation.x = Math.PI / 2;
        ring3.rotation.y = Math.PI / 2;

        group.add(ring1, ring2, ring3);

        // Add communication satellites
        for (let i = 0; i < 6; i++) {
            const satGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const satMaterial = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
            const satellite = new THREE.Mesh(satGeometry, satMaterial);

            const angle = (i / 6) * Math.PI * 2;
            satellite.position.set(Math.cos(angle) * 6, Math.sin(angle) * 2, Math.sin(angle) * 6);
            satellite.userData = {
                orbitSpeed: 0.01,
                orbitRadius: 6,
                orbitAngle: angle
            };

            group.add(satellite);
        }

        scene.add(group);
        this.contactGroup = group;
        this.contactRings = [ring1, ring2, ring3];
    }

    // Advanced Project Scenes
    setupAdvancedProjectScenes() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const canvas = card.querySelector('.project-canvas');
            if (!canvas) return;

            const projectType = card.getAttribute('data-project');
            
            // Create simple animated background for each project
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            
            const rect = canvas.getBoundingClientRect();
            renderer.setSize(rect.width, rect.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Create project-specific visualization
            this.createProjectVisualization(scene, projectType);
            
            camera.position.z = 5;
            
            // Store for animation
            this.scenes.projects[index] = scene;
            this.cameras.projects[index] = camera;
            this.renderers.projects[index] = renderer;
        });
    }

    createProjectVisualization(scene, projectType) {
        const group = new THREE.Group();
        
        switch(projectType) {
            case 'ambit':
                this.createAmbitVisualization(group);
                break;
            case 'kairo':
                this.createKairoVisualization(group);
                break;
            case 'typenad':
                this.createTypenadVisualization(group);
                break;
            case 'lottery':
                this.createLotteryVisualization(group);
                break;
            default:
                this.createDefaultVisualization(group);
        }
        
        scene.add(group);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x6366f1, 0.6);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xf59e0b, 1, 10);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);
    }

    createAmbitVisualization(group) {
        // Morpho Blue inspired design with yield curves
        const curveGeometry = new THREE.TorusGeometry(1, 0.1, 8, 16);
        const curveMaterial = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
        const curve = new THREE.Mesh(curveGeometry, curveMaterial);
        curve.rotation.x = Math.PI / 4;
        group.add(curve);
        
        // Floating coins
        for(let i = 0; i < 5; i++) {
            const coinGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
            const coinMaterial = new THREE.MeshPhongMaterial({ color: 0xf59e0b });
            const coin = new THREE.Mesh(coinGeometry, coinMaterial);
            coin.position.set(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );
            group.add(coin);
        }
    }

    createKairoVisualization(group) {
        // Circuit breaker visualization
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        group.add(box);
        
        // Protective rings
        for(let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(1.5 + i * 0.3, 0.05, 8, 16);
            const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            group.add(ring);
        }
    }

    createTypenadVisualization(group) {
        // Keyboard keys floating
        for(let i = 0; i < 8; i++) {
            const keyGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
            const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x9945ff });
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                (i % 4 - 1.5) * 0.5,
                Math.floor(i / 4) * 0.5 - 0.25,
                0
            );
            group.add(key);
        }
    }

    createLotteryVisualization(group) {
        // Lottery balls
        for(let i = 0; i < 6; i++) {
            const ballGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const ballMaterial = new THREE.MeshPhongMaterial({ 
                color: [0xff4444, 0x44ff44, 0x4444ff, 0xffff44, 0xff44ff, 0x44ffff][i] 
            });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );
            group.add(ball);
        }
    }

    createDefaultVisualization(group) {
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
    }

    // Removed - project visualizations now use GitHub logos

    createLotteryVisualization3D(group) {
        // Realistic lottery machine with glass dome
        const baseGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.5, 32);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2c2c54,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1;

        // Glass dome
        const domeGeometry = new THREE.SphereGeometry(2.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 0.95,
            thickness: 0.1,
            transparent: true,
            opacity: 0.9
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.y = 0.5;

        // Lottery balls with numbers
        const ballGroup = new THREE.Group();
        const ballColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffff44, 0xff44ff, 0x44ffff];
        for (let i = 0; i < 20; i++) {
            const ballGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const ballMaterial = new THREE.MeshPhysicalMaterial({
                color: ballColors[i % ballColors.length],
                metalness: 0.1,
                roughness: 0.2,
                clearcoat: 1,
                clearcoatRoughness: 0.1
            });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);

            // Random position inside dome
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI * 0.5;
            const radius = Math.random() * 1.5 + 0.5;

            ball.position.set(
                radius * Math.sin(theta) * Math.cos(phi),
                Math.random() * 2 - 0.5,
                radius * Math.sin(theta) * Math.sin(phi)
            );

            ball.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    Math.random() * 0.01,
                    (Math.random() - 0.5) * 0.02
                ),
                bounceSpeed: Math.random() * 0.02 + 0.01,
                number: i + 1
            };

            ballGroup.add(ball);
        }

        // Winner display panel
        const panelGeometry = new THREE.PlaneGeometry(1.5, 0.8);
        const panelMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.8
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(0, -2.5, 2.5);

        // LED number displays
        for (let i = 0; i < 3; i++) {
            const ledGeometry = new THREE.PlaneGeometry(0.3, 0.4);
            const ledMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                emissive: 0xff0000,
                emissiveIntensity: 0.8
            });
            const led = new THREE.Mesh(ledGeometry, ledMaterial);
            led.position.set(-0.5 + i * 0.5, -2.5, 2.51);
            group.add(led);
        }

        // Chainlink VRF symbol (oracle pattern)
        const oracleGeometry = new THREE.RingGeometry(0.3, 0.4, 8);
        const oracleMaterial = new THREE.MeshBasicMaterial({
            color: 0x375bd2,
            emissive: 0x375bd2,
            emissiveIntensity: 0.3
        });
        const oracle = new THREE.Mesh(oracleGeometry, oracleMaterial);
        oracle.position.set(2.5, 1, 0);
        oracle.rotation.y = Math.PI / 4;

        group.add(base, dome, ballGroup, panel, oracle);
        group.userData = { base, dome, ballGroup, oracle };
    }

    createLotteryParticles(group) {
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 5;

            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        group.add(particles);
    }

    createCrossChainVisualization3D(group) {
        // Ethereum chain (left side)
        const ethChain = this.createEthereumChain(-3);

        // Polygon chain (right side)  
        const polygonChain = this.createPolygonChain(3);

        // NFT token in center
        const nftGroup = this.createNFTToken();

        // CCIP bridge with animated data packets
        this.createCCIPBridge(group);

        // Burn and mint visualization
        this.createBurnMintAnimation(group);

        group.add(ethChain, polygonChain, nftGroup);
    }

    createEthereumChain(xOffset) {
        const chainGroup = new THREE.Group();

        // Ethereum logo representation (diamond shape)
        const ethGeometry = new THREE.OctahedronGeometry(0.8);
        const ethMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x627eea,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x627eea,
            emissiveIntensity: 0.3
        });
        const ethLogo = new THREE.Mesh(ethGeometry, ethMaterial);
        ethLogo.position.set(xOffset, 2, 0);

        // Chain blocks
        for (let i = 0; i < 3; i++) {
            const blockGeometry = new THREE.BoxGeometry(1, 0.8, 1);
            const blockMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x627eea,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x627eea,
                emissiveIntensity: 0.1
            });
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(xOffset, i * 1.2 - 1, 0);
            chainGroup.add(block);
        }

        chainGroup.add(ethLogo);
        return chainGroup;
    }

    createPolygonChain(xOffset) {
        const chainGroup = new THREE.Group();

        // Polygon logo representation (multi-sided shape)
        const polyGeometry = new THREE.IcosahedronGeometry(0.8);
        const polyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x8247e5,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x8247e5,
            emissiveIntensity: 0.3
        });
        const polyLogo = new THREE.Mesh(polyGeometry, polyMaterial);
        polyLogo.position.set(xOffset, 2, 0);

        // Chain blocks
        for (let i = 0; i < 3; i++) {
            const blockGeometry = new THREE.BoxGeometry(1, 0.8, 1);
            const blockMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x8247e5,
                metalness: 0.7,
                roughness: 0.3,
                emissive: 0x8247e5,
                emissiveIntensity: 0.1
            });
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(xOffset, i * 1.2 - 1, 0);
            chainGroup.add(block);
        }

        chainGroup.add(polyLogo);
        return chainGroup;
    }

    createNFTToken() {
        const nftGroup = new THREE.Group();

        // NFT frame
        const frameGeometry = new THREE.RingGeometry(0.8, 1, 4);
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xffd700,
            emissiveIntensity: 0.2
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.rotation.x = Math.PI / 4;

        // NFT artwork (colorful plane)
        const artGeometry = new THREE.PlaneGeometry(1.4, 1.4);
        const artMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
            transparent: true,
            opacity: 0.8
        });
        const artwork = new THREE.Mesh(artGeometry, artMaterial);
        artwork.position.z = -0.1;

        nftGroup.add(frame, artwork);
        nftGroup.position.y = 0.5;
        return nftGroup;
    }

    createCCIPBridge(group) {
        // Chainlink CCIP bridge representation
        const bridgeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 12);
        const bridgeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x375bd2,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x375bd2,
            emissiveIntensity: 0.3
        });
        const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
        bridge.rotation.z = Math.PI / 2;
        bridge.position.y = 0.5;

        // CCIP logo elements (interconnected links)
        for (let i = 0; i < 5; i++) {
            const linkGeometry = new THREE.TorusGeometry(0.2, 0.05, 8, 16);
            const linkMaterial = new THREE.MeshBasicMaterial({
                color: 0x375bd2,
                emissive: 0x375bd2,
                emissiveIntensity: 0.4
            });
            const link = new THREE.Mesh(linkGeometry, linkMaterial);
            link.position.set(-2 + i * 1, 0.5, 0.3);
            link.rotation.x = Math.PI / 2;
            group.add(link);
        }

        group.add(bridge);
    }

    createBurnMintAnimation(group) {
        // Burn effect (left side - red particles)
        for (let i = 0; i < 10; i++) {
            const burnGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const burnMaterial = new THREE.MeshBasicMaterial({
                color: 0xff4444,
                emissive: 0xff4444,
                emissiveIntensity: 0.8
            });
            const burnParticle = new THREE.Mesh(burnGeometry, burnMaterial);
            burnParticle.position.set(-3 + Math.random() * 0.5, Math.random() * 3, Math.random() * 0.5);
            burnParticle.userData = { type: 'burn', speed: 0.02 };
            group.add(burnParticle);
        }

        // Mint effect (right side - green particles)
        for (let i = 0; i < 10; i++) {
            const mintGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const mintMaterial = new THREE.MeshBasicMaterial({
                color: 0x44ff44,
                emissive: 0x44ff44,
                emissiveIntensity: 0.8
            });
            const mintParticle = new THREE.Mesh(mintGeometry, mintMaterial);
            mintParticle.position.set(3 + Math.random() * 0.5, Math.random() * 3, Math.random() * 0.5);
            mintParticle.userData = { type: 'mint', speed: 0.02 };
            group.add(mintParticle);
        }
    }

    createCrossChainBridge(group, chain1, chain2) {
        const bridgeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 12);
        const bridgeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.8,
            emissive: 0x10b981,
            emissiveIntensity: 0.2
        });
        const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
        bridge.rotation.z = Math.PI / 2;

        // Add data flow particles
        this.createDataFlowParticles(group);

        group.add(bridge);
    }

    createDataFlowParticles(group) {
        for (let i = 0; i < 20; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: 0x10b981,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(-3 + (i / 20) * 6, 0, 0);
            particle.userData = {
                flowSpeed: 0.02,
                direction: 1
            };
            group.add(particle);
        }
    }

    createFundMeVisualization3D(group) {
        // Create 3D funding visualization with animated coins
        const targetGeometry = new THREE.TorusGeometry(2, 0.1, 8, 50);
        const targetMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.6
        });
        const target = new THREE.Mesh(targetGeometry, targetMaterial);

        // Create coins with realistic materials
        for (let i = 0; i < 12; i++) {
            const coinGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
            const coinMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xf59e0b,
                metalness: 0.9,
                roughness: 0.1,
                clearcoat: 1
            });
            const coin = new THREE.Mesh(coinGeometry, coinMaterial);

            coin.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2
            );
            coin.rotation.x = Math.random() * Math.PI;
            coin.rotation.z = Math.random() * Math.PI;

            coin.userData = {
                rotationSpeed: Math.random() * 0.05 + 0.02,
                floatSpeed: Math.random() * 0.01 + 0.005
            };

            group.add(coin);
        }

        group.add(target);
    }

    createCircuitBreakerVisualization3D(group) {
        // Create circuit breaker visualization with electrical effects
        const breakerGeometry = new THREE.BoxGeometry(2, 3, 1);
        const breakerMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2d3748,
            metalness: 0.8,
            roughness: 0.3
        });
        const breaker = new THREE.Mesh(breakerGeometry, breakerMaterial);

        // Create switch
        const switchGeometry = new THREE.BoxGeometry(0.5, 1, 0.2);
        const switchMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xf56565,
            metalness: 0.5,
            roughness: 0.4
        });
        const switchMesh = new THREE.Mesh(switchGeometry, switchMaterial);
        switchMesh.position.set(0, 0.5, 0.6);

        // Add electrical arcs
        this.createElectricalArcs(group);

        group.add(breaker, switchMesh);
        group.userData = { breaker, switch: switchMesh };
    }

    createElectricalArcs(group) {
        for (let i = 0; i < 8; i++) {
            const arcPoints = [];
            const startPoint = new THREE.Vector3(-1, Math.random() * 2 - 1, 0.5);
            const endPoint = new THREE.Vector3(1, Math.random() * 2 - 1, 0.5);

            // Create jagged arc
            const segments = 10;
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const point = startPoint.clone().lerp(endPoint, t);
                point.y += Math.sin(t * Math.PI * 4) * 0.3 * Math.random();
                point.z += (Math.random() - 0.5) * 0.2;
                arcPoints.push(point);
            }

            const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
            const arcMaterial = new THREE.LineBasicMaterial({
                color: 0x60a5fa,
                transparent: true,
                opacity: 0.8
            });
            const arc = new THREE.Line(arcGeometry, arcMaterial);
            arc.userData = {
                flickerSpeed: Math.random() * 0.1 + 0.05,
                originalOpacity: 0.8
            };

            group.add(arc);
        }
    }

    createSolanaDEXVisualization3D(group) {
        // Create DEX trading visualization
        const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x14f195,
            metalness: 0.6,
            roughness: 0.4,
            transparent: true,
            opacity: 0.8
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);

        // Create trading pairs as orbiting objects
        const tradingPairs = ['SOL/USDC', 'SOL/ETH', 'RAY/SOL', 'SRM/USDC'];
        tradingPairs.forEach((pair, index) => {
            const pairGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const pairMaterial = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color().setHSL(index / tradingPairs.length, 0.8, 0.6),
                metalness: 0.5,
                roughness: 0.3
            });
            const pairSphere = new THREE.Mesh(pairGeometry, pairMaterial);

            const angle = (index / tradingPairs.length) * Math.PI * 2;
            pairSphere.position.set(Math.cos(angle) * 3, 1, Math.sin(angle) * 3);
            pairSphere.userData = {
                orbitAngle: angle,
                orbitSpeed: 0.01 + Math.random() * 0.01
            };

            group.add(pairSphere);
        });

        // Add volume visualization
        this.createVolumeVisualization(group);

        group.add(base);
    }

    createVolumeVisualization(group) {
        for (let i = 0; i < 50; i++) {
            const barGeometry = new THREE.BoxGeometry(0.1, Math.random() * 2 + 0.5, 0.1);
            const barMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.3, 0.8, 0.6),
                transparent: true,
                opacity: 0.7
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);

            bar.position.set(
                (Math.random() - 0.5) * 8,
                bar.geometry.parameters.height / 2,
                (Math.random() - 0.5) * 8
            );

            bar.userData = {
                growthSpeed: Math.random() * 0.02 + 0.01,
                maxHeight: bar.geometry.parameters.height
            };

            group.add(bar);
        }
    }

    createAegisCircuitBreakerVisualization3D(group) {
        // Enhanced Aegis Labs circuit breaker with production-grade effects
        const mainBreaker = new THREE.BoxGeometry(3, 4, 1.5);
        const breakerMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a2e,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1
        });
        const breakerMesh = new THREE.Mesh(mainBreaker, breakerMaterial);

        // Aegis Labs logo simulation
        const logoGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 16);
        const logoMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x6366f1,
            emissiveIntensity: 0.3
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, 0, 0.8);

        // Circuit patterns
        this.createAdvancedCircuitPattern(group);

        // Production indicator lights
        for (let i = 0; i < 6; i++) {
            const lightGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const lightMaterial = new THREE.MeshBasicMaterial({
                color: i < 4 ? 0x00ff00 : 0xff4444,
                emissive: i < 4 ? 0x00ff00 : 0xff4444,
                emissiveIntensity: 0.8
            });
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.set(-1.2 + (i * 0.4), 1.5, 0.8);

            light.userData = {
                pulseSpeed: 0.02 + Math.random() * 0.03,
                originalIntensity: 0.8
            };

            group.add(light);
        }

        group.add(breakerMesh, logo);
        group.userData = { breaker: breakerMesh, logo };
    }

    createSolanaLendingVisualization3D(group) {
        // Solana logo (stylized S shape)
        const solanaGeometry = new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8, 2, 3);
        const solanaMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x9945ff,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x9945ff,
            emissiveIntensity: 0.3
        });
        const solanaLogo = new THREE.Mesh(solanaGeometry, solanaMaterial);
        solanaLogo.position.y = 2.5;
        solanaLogo.scale.set(0.8, 0.8, 0.8);

        // Lending vault (central structure)
        const vaultGeometry = new THREE.CylinderGeometry(1.5, 1.8, 1.5, 8);
        const vaultMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x14f195,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1
        });
        const vault = new THREE.Mesh(vaultGeometry, vaultMaterial);
        vault.position.y = 0;

        // Lending pools (connected nodes)
        const poolPositions = [
            [-2, 1, 0], [2, 1, 0], [0, 1, -2], [0, 1, 2],
            [-1.5, 0.5, 1.5], [1.5, 0.5, -1.5], [-1.5, 0.5, -1.5], [1.5, 0.5, 1.5]
        ];

        poolPositions.forEach((pos, index) => {
            // Pool node
            const poolGeometry = new THREE.IcosahedronGeometry(0.4, 1);
            const poolMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x00d4ff,
                metalness: 0.6,
                roughness: 0.4,
                emissive: 0x00d4ff,
                emissiveIntensity: 0.2
            });
            const pool = new THREE.Mesh(poolGeometry, poolMaterial);
            pool.position.set(...pos);

            // Connection line to vault
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(...pos),
                new THREE.Vector3(0, 0, 0)
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x14f195,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);

            pool.userData = {
                orbitAngle: (index / poolPositions.length) * Math.PI * 2,
                orbitSpeed: 0.01 + Math.random() * 0.005,
                originalPosition: new THREE.Vector3(...pos)
            };

            group.add(pool, line);
        });

        // SOL tokens (animated coins)
        for (let i = 0; i < 12; i++) {
            const tokenGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
            const tokenMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffc107,
                metalness: 0.9,
                roughness: 0.1,
                clearcoat: 1
            });
            const token = new THREE.Mesh(tokenGeometry, tokenMaterial);

            const angle = (i / 12) * Math.PI * 2;
            token.position.set(
                Math.cos(angle) * 3,
                Math.sin(i * 0.5) * 0.5 + 1.5,
                Math.sin(angle) * 3
            );
            token.userData = {
                orbitAngle: angle,
                orbitSpeed: 0.02,
                floatSpeed: 0.03
            };

            group.add(token);
        }

        // Anchor framework symbol (anchor shape)
        const anchorGeometry = new THREE.CylinderGeometry(0.1, 0.3, 0.8, 8);
        const anchorMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x512da8,
            metalness: 0.8,
            roughness: 0.3,
            emissive: 0x512da8,
            emissiveIntensity: 0.2
        });
        const anchor = new THREE.Mesh(anchorGeometry, anchorMaterial);
        anchor.position.set(-3, 0.5, 0);
        anchor.rotation.z = Math.PI / 6;

        // Interest rate displays
        this.createLendingInterestRates(group);

        group.add(solanaLogo, vault, anchor);
    }

    createZKStablecoinVisualization3D(group) {
        // Premium stablecoin with gold finish
        const coinGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32);
        const coinMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.95,
            roughness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            emissive: 0xffd700,
            emissiveIntensity: 0.1
        });
        const mainCoin = new THREE.Mesh(coinGeometry, coinMaterial);

        // Dollar symbol on coin
        const dollarGeometry = new THREE.RingGeometry(0.4, 0.5, 16);
        const dollarMaterial = new THREE.MeshBasicMaterial({
            color: 0x2d3748,
            transparent: true,
            opacity: 0.8
        });
        const dollarSymbol = new THREE.Mesh(dollarGeometry, dollarMaterial);
        dollarSymbol.position.y = 0.11;
        dollarSymbol.rotation.x = -Math.PI / 2;

        // ZK-SNARK proof visualization (cryptographic patterns)
        const zkProofGroup = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            const proofGeometry = new THREE.TorusGeometry(0.3 + i * 0.2, 0.02, 8, 16);
            const proofMaterial = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.3 - i * 0.03,
                emissive: 0x6366f1,
                emissiveIntensity: 0.2
            });
            const proof = new THREE.Mesh(proofGeometry, proofMaterial);
            proof.position.y = i * 0.1 - 0.4;
            proof.rotation.x = Math.PI / 2;
            zkProofGroup.add(proof);
        }

        // Privacy shield dome
        const shieldGeometry = new THREE.SphereGeometry(2.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const shieldMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                varying vec3 vPosition;
                void main() {
                    float pattern = sin(vPosition.x * 10.0 + time) * sin(vPosition.z * 10.0 + time * 0.5);
                    vec3 color = mix(vec3(0.4, 0.2, 0.8), vec3(0.2, 0.8, 0.4), pattern * 0.5 + 0.5);
                    float opacity = 0.15 + pattern * 0.05;
                    gl_FragColor = vec4(color, opacity);
                }
            `,
            uniforms: {
                time: { value: 0 }
            },
            transparent: true,
            side: THREE.DoubleSide
        });
        const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
        shield.position.y = 1;

        // Circom circuit visualization (mathematical nodes)
        for (let i = 0; i < 12; i++) {
            const nodeGeometry = new THREE.IcosahedronGeometry(0.1, 1);
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                emissive: 0x00ffff,
                emissiveIntensity: 0.5
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

            const angle = (i / 12) * Math.PI * 2;
            const height = Math.sin(i * 0.5) * 1.5;
            node.position.set(
                Math.cos(angle) * 2,
                height + 1,
                Math.sin(angle) * 2
            );

            node.userData = {
                orbitAngle: angle,
                orbitSpeed: 0.01,
                pulseSpeed: 0.05 + Math.random() * 0.03
            };

            group.add(node);
        }

        // Privacy transactions (encrypted data streams)
        for (let i = 0; i < 20; i++) {
            const streamGeometry = new THREE.SphereGeometry(0.03, 8, 8);
            const streamMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.9, 0.8),
                transparent: true,
                opacity: 0.8
            });
            const stream = new THREE.Mesh(streamGeometry, streamMaterial);

            stream.position.set(
                (Math.random() - 0.5) * 8,
                Math.random() * 4,
                (Math.random() - 0.5) * 8
            );

            stream.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    Math.random() * 0.01,
                    (Math.random() - 0.5) * 0.02
                ),
                type: 'privacy'
            };

            group.add(stream);
        }

        // Regulatory compliance indicator
        const complianceGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
        const complianceMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00,
            emissiveIntensity: 0.5
        });
        const compliance = new THREE.Mesh(complianceGeometry, complianceMaterial);
        compliance.position.set(2.5, 1.5, 0);

        group.add(mainCoin, dollarSymbol, zkProofGroup, shield, compliance);
        group.userData = {
            coin: mainCoin,
            zkProofs: zkProofGroup,
            shield,
            shieldMaterial
        };
    }

    createAdvancedCircuitPattern(group) {
        // Create circuit board pattern
        const patterns = [];
        for (let i = 0; i < 20; i++) {
            const lineGeometry = new THREE.BoxGeometry(
                Math.random() * 2 + 0.5, 0.02, 0.02
            );
            const lineMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                emissive: 0x00ffff,
                emissiveIntensity: 0.5
            });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);

            line.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 3,
                0.8
            );
            line.rotation.z = Math.random() * Math.PI;

            patterns.push(line);
            group.add(line);
        }
        return patterns;
    }

    createInterestRateVisualization(group) {
        // Floating percentage indicators
        for (let i = 0; i < 5; i++) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 64;

            context.fillStyle = '#14f195';
            context.font = 'Bold 20px Arial';
            context.textAlign = 'center';
            context.fillText(`${(2 + Math.random() * 8).toFixed(1)}%`, 64, 40);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(
                (Math.random() - 0.5) * 5,
                2 + Math.random() * 2,
                (Math.random() - 0.5) * 5
            );
            sprite.scale.set(1, 0.5, 1);

            group.add(sprite);
        }
    }

    createLendingInterestRates(group) {
        const rates = ['2.5%', '4.2%', '6.8%', '3.1%', '5.7%'];
        rates.forEach((rate, i) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 64;

            context.fillStyle = '#9945ff';
            context.font = 'Bold 18px Arial';
            context.textAlign = 'center';
            context.fillText(`APY: ${rate}`, 64, 40);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(spriteMaterial);

            const angle = (i / rates.length) * Math.PI * 2;
            sprite.position.set(
                Math.cos(angle) * 2.5,
                2 + Math.sin(i) * 0.3,
                Math.sin(angle) * 2.5
            );
            sprite.scale.set(0.8, 0.4, 1);

            group.add(sprite);
        });
    }

    // Scroll-based animations and camera movements
    setupScrollAnimations() {
        let ticking = false;
        
        const handleScroll = () => {
            this.scrollY = window.pageYOffset;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Enhanced smooth scroll for navigation using GSAP
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: { y: offsetTop, autoKill: false },
                        ease: "power2.inOut"
                    });
                }
            });
        });

        this.setupIntersectionObservers();
    }

    updateScrollAnimations() {
        const scrollProgress = this.scrollY / (document.body.scrollHeight - window.innerHeight);

        // Hero scene scroll effects
        if (this.blockchainGroup) {
            this.blockchainGroup.rotation.y = scrollProgress * Math.PI * 2;
            this.blockchainGroup.rotation.x = scrollProgress * Math.PI;

            // Move blockchain nodes diagonally
            this.blockchainNodes.forEach((node, index) => {
                const offset = scrollProgress * 10;
                node.position.x = node.userData.material.uniforms.time.value * Math.cos(index * 0.5) + offset;
                node.position.y = node.userData.material.uniforms.time.value * Math.sin(index * 0.3) + Math.sin(offset + index);
            });
        }

        // Update hero camera with scroll
        if (this.cameras.hero) {
            this.cameras.hero.position.x = Math.sin(scrollProgress * Math.PI * 2) * 5;
            this.cameras.hero.position.y = scrollProgress * 10 - 5;
            this.cameras.hero.lookAt(0, 0, 0);
        }

        // Floating geometry movement
        if (this.floatingGeometry) {
            this.floatingGeometry.children.forEach((mesh, index) => {
                const scrollOffset = scrollProgress * 20;
                mesh.position.x += Math.sin(scrollOffset + index) * 0.1;
                mesh.position.y += Math.cos(scrollOffset + index * 0.5) * 0.1;
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
            });
        }

        // Hero lights movement
        if (this.heroLights) {
            this.heroLights.forEach((light, index) => {
                light.position.x = Math.sin(scrollProgress * Math.PI + index * 2) * 15;
                light.position.z = Math.cos(scrollProgress * Math.PI + index * 2) * 15;
                light.intensity = 1 + Math.sin(scrollProgress * Math.PI * 4) * 0.5;
            });
        }

        // Particle field animation
        if (this.heroParticles) {
            const positions = this.heroParticles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += Math.sin(scrollProgress * Math.PI + i * 0.01) * 0.01;
                positions[i + 1] += Math.cos(scrollProgress * Math.PI + i * 0.01) * 0.01;
            }
            this.heroParticles.geometry.attributes.position.needsUpdate = true;
        }
    }

    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        // Animate sections on scroll
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target.querySelectorAll('.section-title, .section-subtitle'),
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            stagger: 0.2,
                            ease: "power2.out"
                        }
                    );
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });

        // Project cards animation
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target,
                        { opacity: 0, rotateY: 90, scale: 0.8 },
                        {
                            opacity: 1,
                            rotateY: 0,
                            scale: 1,
                            duration: 1.2,
                            ease: "back.out(1.7)"
                        }
                    );
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card').forEach(card => {
            cardObserver.observe(card);
        });

        // Skill icons animation
        const skillIconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill icons
                    const skillIcons = entry.target.querySelectorAll('.skill-icon');
                    skillIcons.forEach((icon, index) => {
                        // Initial animation
                        gsap.fromTo(icon,
                            { opacity: 0, y: 50, rotateY: 180 },
                            {
                                opacity: 1,
                                y: 0,
                                rotateY: 0,
                                duration: 1,
                                delay: index * 0.1,
                                ease: "back.out(1.7)"
                            }
                        );

                        // Animate progress circle
                        const progress = parseInt(icon.dataset.progress);
                        const circle = icon.querySelector('.progress-ring-circle');
                        if (circle) {
                            const circumference = 2 * Math.PI * 26; // radius = 26
                            circle.style.strokeDasharray = circumference;
                            circle.style.strokeDashoffset = circumference;

                            gsap.to(circle, {
                                strokeDashoffset: circumference - (circumference * progress) / 100,
                                duration: 2,
                                delay: 0.5 + index * 0.1,
                                ease: "power2.out"
                            });
                        }

                        // Add animated class
                        icon.classList.add('animated');
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skills-icons-grid').forEach(grid => {
            skillIconObserver.observe(grid);
        });

        // Legacy skill bars animation (fallback)
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach((bar, index) => {
                        const progress = bar.dataset.progress;
                        gsap.to(bar, {
                            width: `${progress}%`,
                            duration: 2,
                            delay: index * 0.1,
                            ease: "power2.out"
                        });
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skills-list').forEach(list => {
            skillObserver.observe(list);
        });
    }

    // Mouse interactions
    setupMouseInteractions() {
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.updateMouseInteractions();
        });

        // Click interactions for skill nodes
        window.addEventListener('click', (event) => {
            if (this.skillNodes && this.cameras.skills) {
                this.raycaster.setFromCamera(this.mouse, this.cameras.skills);
                const intersects = this.raycaster.intersectObjects(this.skillNodes);

                if (intersects.length > 0) {
                    const selectedNode = intersects[0].object;
                    this.animateSkillNodeSelection(selectedNode);
                }
            }
        });
    }

    updateMouseInteractions() {
        // Hero scene mouse parallax
        if (this.blockchainGroup) {
            gsap.to(this.blockchainGroup.rotation, {
                duration: 2,
                x: this.mouse.y * 0.2,
                y: this.mouse.x * 0.2,
                ease: "power2.out"
            });
        }

        // Skills nodes attraction to mouse
        if (this.skillNodes && this.cameras.skills) {
            this.raycaster.setFromCamera(this.mouse, this.cameras.skills);

            this.skillNodes.forEach(node => {
                const distance = node.position.distanceTo(new THREE.Vector3(this.mouse.x * 10, this.mouse.y * 10, 0));
                const attraction = Math.max(0, 1 - distance / 5);

                gsap.to(node.scale, {
                    duration: 0.5,
                    x: 1 + attraction * 0.5,
                    y: 1 + attraction * 0.5,
                    z: 1 + attraction * 0.5,
                    ease: "power2.out"
                });
            });
        }
    }

    animateSkillNodeSelection(node) {
        // Pulse animation for selected skill
        gsap.to(node.scale, {
            duration: 0.3,
            x: 1.5,
            y: 1.5,
            z: 1.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });

        // Color change animation
        gsap.to(node.material.emissiveIntensity, {
            duration: 0.3,
            value: 0.8,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }

    // Responsive handling
    setupResponsiveHandling() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        // Hero scene resize
        if (this.cameras.hero && this.renderers.hero) {
            this.cameras.hero.aspect = window.innerWidth / window.innerHeight;
            this.cameras.hero.updateProjectionMatrix();
            this.renderers.hero.setSize(window.innerWidth, window.innerHeight);
        }

        // Other scenes resize
        Object.keys(this.scenes).forEach(key => {
            if (key !== 'hero' && key !== 'projects' && this.scenes[key]) {
                const canvas = this.renderers[key].domElement;
                const container = canvas.parentElement;
                const rect = container.getBoundingClientRect();

                this.cameras[key].aspect = rect.width / rect.height;
                this.cameras[key].updateProjectionMatrix();
                this.renderers[key].setSize(rect.width, rect.height);
            }
        });

        // Project scenes resize
        this.scenes.projects.forEach((scene, index) => {
            if (scene && this.cameras.projects[index] && this.renderers.projects[index]) {
                const canvas = this.renderers.projects[index].domElement;
                const container = canvas.parentElement;
                const rect = container.getBoundingClientRect();

                this.cameras.projects[index].aspect = rect.width / rect.height;
                this.cameras.projects[index].updateProjectionMatrix();
                this.renderers.projects[index].setSize(rect.width, rect.height);
            }
        });
    }

    // Main animation loop
    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();

        // Update shader uniforms
        if (this.blockchainNodes) {
            this.blockchainNodes.forEach(node => {
                if (node.userData.material && node.userData.material.uniforms) {
                    node.userData.material.uniforms.time.value = time;
                }
            });
        }

        // Animate all scenes
        this.animateHeroScene(time);
        this.animateAboutScene(time);
        this.animateSkillsScene(time);
        this.animateContactScene(time);
        this.animateProjectScenes(time);

        // Render all scenes
        this.renderAllScenes();
    }

    animateHeroScene(time) {
        if (this.blockchainGroup) {
            // Continuous rotation with variation
            this.blockchainGroup.rotation.y += 0.005;

            // Animate individual nodes
            this.blockchainNodes.forEach((node, index) => {
                node.rotation.x = time * 0.3 + index * 0.2;
                node.rotation.y = time * 0.2 + index * 0.1;

                // Floating motion
                node.position.y += Math.sin(time * 2 + index) * 0.02;
            });
        }

        // Animate floating geometry
        if (this.floatingGeometry) {
            this.floatingGeometry.children.forEach((mesh, index) => {
                const userData = mesh.userData;

                // Rotation
                mesh.rotation.x += userData.rotationSpeed.x;
                mesh.rotation.y += userData.rotationSpeed.y;
                mesh.rotation.z += userData.rotationSpeed.z;

                // Floating
                mesh.position.y = userData.initialY + Math.sin(time * userData.floatSpeed) * userData.floatRange;
            });
        }
    }

    animateAboutScene(time) {
        if (this.dnaGroup) {
            this.dnaGroup.rotation.y = time * 0.1;

            // Animate data nodes
            this.dnaGroup.children.forEach(child => {
                if (child.userData.floatSpeed) {
                    child.rotation.y += child.userData.rotationSpeed;
                    child.position.y += Math.sin(time * child.userData.floatSpeed) * 0.01;
                }
            });
        }
    }

    animateSkillsScene(time) {
        if (this.skillsGroup) {
            this.skillsGroup.rotation.y = time * 0.05;

            // Animate skill nodes
            this.skillNodes.forEach((node, index) => {
                node.position.y += Math.sin(time * 2 + index) * 0.01;

                // Different rotation based on shape
                switch (node.userData.shape) {
                    case 'gear':
                        node.rotation.z = time * 0.5;
                        break;
                    case 'diamond':
                        node.rotation.y = time * 0.3;
                        node.rotation.x = time * 0.2;
                        break;
                    case 'waves':
                        node.rotation.x = time * 0.4;
                        break;
                    default:
                        node.rotation.y = time * 0.3;
                }
            });

            // Animate flow particles in enhanced connections
            this.skillsGroup.children.forEach(child => {
                if (child.userData.type === 'flow_particle') {
                    child.userData.progress += child.userData.speed;
                    if (child.userData.progress > 1) {
                        child.userData.progress = 0;
                    }

                    const point = child.userData.curve.getPoint(child.userData.progress);
                    child.position.copy(point);

                    // Pulsing effect
                    const scale = 1 + Math.sin(time * 5 + child.userData.progress * 10) * 0.5;
                    child.scale.setScalar(scale);
                }
            });
        }
    }

    animateContactScene(time) {
        if (this.contactGroup) {
            this.contactGroup.rotation.y = time * 0.1;

            // Animate orbital rings
            if (this.contactRings) {
                this.contactRings.forEach((ring, index) => {
                    ring.rotation.x = time * (0.2 + index * 0.1);
                    ring.rotation.z = time * (0.15 + index * 0.05);
                });
            }

            // Animate satellites and data points
            this.contactGroup.children.forEach(child => {
                if (child.userData.orbitSpeed) {
                    child.userData.orbitAngle += child.userData.orbitSpeed;
                    child.position.x = Math.cos(child.userData.orbitAngle) * child.userData.orbitRadius;
                    child.position.z = Math.sin(child.userData.orbitAngle) * child.userData.orbitRadius;
                } else if (child.userData.pulseSpeed) {
                    const scale = 1 + Math.sin(time * child.userData.pulseSpeed) * 0.3;
                    child.scale.setScalar(scale);
                }
            });
        }
    }

    animateProjectScenes(time) {
        // Project scenes removed - GitHub logos are now static
        return;
    }

    animateLotteryScene(group, time) {
        const userData = group.userData;
        if (userData.wheel) {
            userData.wheel.rotation.z = time * 2;
        }

        if (userData.ballGroup) {
            userData.ballGroup.children.forEach((ball, index) => {
                ball.position.y += Math.sin(time * ball.userData.bounceSpeed + ball.userData.bouncePhase) * 0.1;
                ball.rotation.x += 0.02;
                ball.rotation.y += 0.03;
            });
        }
    }

    animateCrossChainScene(group, time) {
        // Animate chain links
        group.children.forEach(child => {
            if (child.type === 'Group') {
                child.rotation.y = time * 0.3;
                child.children.forEach((link, index) => {
                    link.rotation.z = time * 0.5 + index * 0.2;
                });
            } else if (child.userData.flowSpeed) {
                // Animate data flow particles
                child.position.x += child.userData.flowSpeed * child.userData.direction;
                if (child.position.x > 3) {
                    child.position.x = -3;
                } else if (child.position.x < -3) {
                    child.position.x = 3;
                }
            }
        });
    }

    animateFundMeScene(group, time) {
        group.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.y += child.userData.rotationSpeed;
                child.position.y += Math.sin(time * child.userData.floatSpeed) * 0.1;
            }
        });
    }

    animateCircuitBreakerScene(group, time) {
        const userData = group.userData;

        // Animate switch
        if (userData.switch) {
            userData.switch.rotation.z = Math.sin(time * 0.5) * 0.3;
        }

        // Animate electrical arcs
        group.children.forEach(child => {
            if (child.type === 'Line' && child.userData.flickerSpeed) {
                child.material.opacity = child.userData.originalOpacity * (0.5 + Math.sin(time * child.userData.flickerSpeed) * 0.5);
            }
        });
    }

    animateSolanaDEXScene(group, time) {
        group.children.forEach(child => {
            if (child.userData.orbitSpeed) {
                child.userData.orbitAngle += child.userData.orbitSpeed;
                child.position.x = Math.cos(child.userData.orbitAngle) * 3;
                child.position.z = Math.sin(child.userData.orbitAngle) * 3;
                child.rotation.y += 0.02;
            } else if (child.userData.growthSpeed) {
                const scale = 1 + Math.sin(time * child.userData.growthSpeed) * 0.3;
                child.scale.y = scale;
                child.position.y = (child.userData.maxHeight * scale) / 2;
            }
        });
    }

    animateAegisCircuitBreakerScene(group, time) {
        const userData = group.userData;

        // Animate main breaker
        if (userData.breaker) {
            userData.breaker.rotation.y = Math.sin(time * 0.3) * 0.1;
        }

        // Animate logo
        if (userData.logo) {
            userData.logo.rotation.z += 0.02;
            userData.logo.material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.2;
        }

        // Animate indicator lights
        group.children.forEach(child => {
            if (child.userData.pulseSpeed) {
                child.material.emissiveIntensity = child.userData.originalIntensity + Math.sin(time * child.userData.pulseSpeed) * 0.3;
                child.scale.setScalar(1 + Math.sin(time * child.userData.pulseSpeed * 2) * 0.1);
            }
        });
    }

    animateSolanaLendingScene(group, time) {
        group.children.forEach(child => {
            if (child.userData.orbitSpeed) {
                child.userData.orbitAngle += child.userData.orbitSpeed;
                const radius = 2 + Math.sin(time * 0.5) * 0.5;
                child.position.x = Math.cos(child.userData.orbitAngle) * radius;
                child.position.z = Math.sin(child.userData.orbitAngle) * radius;
                child.position.y += Math.sin(time * child.userData.floatSpeed) * 0.05;
                child.rotation.y += 0.02;
            }
        });
    }

    animateZKStablecoinScene(group, time) {
        const userData = group.userData;

        // Animate main coin
        if (userData.coin) {
            userData.coin.rotation.y += 0.02;
            userData.coin.position.y = Math.sin(time * 0.5) * 0.2;
        }

        // Animate ZK proofs
        if (userData.zkProofs) {
            userData.zkProofs.rotation.y = time * 0.3;
            userData.zkProofs.children.forEach((proof, index) => {
                proof.material.opacity = 0.3 - index * 0.03 + Math.sin(time * 2 + index * 0.5) * 0.1;
            });
        }

        // Animate privacy shield
        if (userData.shield && userData.shieldMaterial) {
            userData.shield.rotation.y = time * 0.2;
            userData.shieldMaterial.uniforms.time.value = time;
        }

        // Animate circom nodes and privacy streams
        group.children.forEach(child => {
            if (child.userData.orbitSpeed) {
                if (child.userData.pulseSpeed) {
                    // Circom nodes
                    const scale = 1 + Math.sin(time * child.userData.pulseSpeed) * 0.3;
                    child.scale.setScalar(scale);
                    child.userData.orbitAngle += child.userData.orbitSpeed;
                    child.position.x = Math.cos(child.userData.orbitAngle) * 2;
                    child.position.z = Math.sin(child.userData.orbitAngle) * 2;
                } else {
                    // Privacy particles orbital motion
                    const angle = time * child.userData.orbitSpeed;
                    const distance = child.userData.distance || 2;
                    child.position.x = Math.cos(angle) * distance;
                    child.position.z = Math.sin(angle) * distance;
                    child.position.y = Math.sin(angle * 2) * distance * 0.3;
                    child.rotation.x += 0.02;
                    child.rotation.y += 0.03;
                }
            } else if (child.userData.velocity && child.userData.type === 'privacy') {
                // Privacy data streams
                child.position.add(child.userData.velocity);

                // Boundary check and reset
                if (child.position.length() > 8) {
                    child.position.set(
                        (Math.random() - 0.5) * 2,
                        Math.random() * 2,
                        (Math.random() - 0.5) * 2
                    );
                }

                child.rotation.x += 0.05;
                child.rotation.y += 0.03;
            }
        });
    }

    renderAllScenes() {
        if (this.renderers.hero && this.scenes.hero && this.cameras.hero) {
            this.renderers.hero.render(this.scenes.hero, this.cameras.hero);
        }

        if (this.renderers.about && this.scenes.about && this.cameras.about) {
            this.renderers.about.render(this.scenes.about, this.cameras.about);
        }

        if (this.renderers.skills && this.scenes.skills && this.cameras.skills) {
            this.renderers.skills.render(this.scenes.skills, this.cameras.skills);
        }

        if (this.renderers.contact && this.scenes.contact && this.cameras.contact) {
            this.renderers.contact.render(this.scenes.contact, this.cameras.contact);
        }

        // Project scenes removed - no longer rendering Three.js project animations
    }
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    new ArtisticPortfolio();

    // Navigation animations
    gsap.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    });

    // Hero text animations
    gsap.fromTo('.hero-title .title-line',
        { y: '100%' },
        {
            y: '0%',
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            delay: 1
        }
    );

    gsap.fromTo(['.hero-subtitle', '.hero-description', '.hero-buttons'],
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            delay: 1.8,
            ease: "power2.out"
        }
    );
});