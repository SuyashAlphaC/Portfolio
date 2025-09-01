import * as THREE from 'three';
import { gsap } from 'gsap';

// Advanced Three.js Portfolio with Enhanced Visuals
export class EnhancedArtisticPortfolio {
    constructor() {
        this.scrollY = 0;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();
        
        // Enhanced scene management
        this.scenes = { hero: null, about: null, skills: null, contact: null, projects: [] };
        this.cameras = { hero: null, about: null, skills: null, contact: null, projects: [] };
        this.renderers = { hero: null, about: null, skills: null, contact: null, projects: [] };
        
        // Advanced effects
        this.postProcessing = {};
        this.customUniforms = {};
        this.animationMixers = [];

        this.init();
    }

    init() {
        this.setupAdvancedHeroScene();
        this.setupEnhancedAboutScene();
        this.setupInteractiveSkillsScene();
        this.setupImmersiveContactScene();
        this.setupRealisticProjectScenes();
        this.setupAdvancedScrollAnimations();
        this.setupEnhancedMouseInteractions();
        this.setupResponsiveHandling();
        this.setupPostProcessing();
        this.animate();
    }

    // Enhanced Hero Scene with Advanced Background
    setupAdvancedHeroScene() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;

        // Advanced Lighting Setup
        this.setupAdvancedLighting(scene);
        
        // Enhanced Background
        this.createAdvancedBackground(scene);
        
        // Blockchain Network Visualization
        this.createEnhancedBlockchainNetwork(scene);
        
        // Advanced Particle Systems
        this.createMultiLayeredParticles(scene);
        
        // Floating 3D Elements
        this.createAdvancedFloatingElements(scene);

        camera.position.set(0, 5, 25);

        this.scenes.hero = scene;
        this.cameras.hero = camera;
        this.renderers.hero = renderer;
    }

    setupAdvancedLighting(scene) {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.3);
        scene.add(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0x6366f1, 1.5);
        mainLight.position.set(20, 20, 20);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 500;
        scene.add(mainLight);

        // Accent lights
        const accentLight1 = new THREE.PointLight(0xf59e0b, 2, 50);
        accentLight1.position.set(-15, 10, 15);
        scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0x10b981, 1.5, 40);
        accentLight2.position.set(15, -10, -15);
        scene.add(accentLight2);

        // Rim light
        const rimLight = new THREE.SpotLight(0x818cf8, 3, 100, Math.PI * 0.1, 0.5);
        rimLight.position.set(0, 50, 0);
        rimLight.target.position.set(0, 0, 0);
        scene.add(rimLight);
        scene.add(rimLight.target);

        this.lights = { mainLight, accentLight1, accentLight2, rimLight };
    }

    createAdvancedBackground(scene) {
        // Create a cosmic background with gradients
        const backgroundGeometry = new THREE.SphereGeometry(1000, 64, 64);
        const backgroundMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                varying vec3 vWorldPosition;
                
                void main() {
                    vec3 color = vec3(0.05, 0.05, 0.1);
                    
                    // Add moving gradient
                    float gradient = (vWorldPosition.y + 500.0) / 1000.0;
                    color += vec3(0.1, 0.2, 0.4) * gradient;
                    
                    // Add animated nebula effect
                    float noise = sin(vWorldPosition.x * 0.01 + time) * sin(vWorldPosition.z * 0.01 + time * 0.5) * 0.5;
                    color += vec3(0.2, 0.1, 0.3) * noise * 0.3;
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            uniforms: {
                time: { value: 0 }
            },
            side: THREE.BackSide
        });

        const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        scene.add(backgroundMesh);
        
        this.backgroundMaterial = backgroundMaterial;
    }

    createEnhancedBlockchainNetwork(scene) {
        const group = new THREE.Group();
        
        // Create more complex node network with enhanced materials
        const nodes = [];
        const nodePositions = [
            [0, 5, 0], [8, 2, 4], [-8, 2, -4], [4, -4, 6], 
            [-6, -2, 2], [2, 2, -8], [-2, 8, 2], [6, -6, -2],
            [0, 0, 10], [-4, 4, -6], [10, -2, 0], [-10, 6, 4]
        ];

        nodePositions.forEach((pos, index) => {
            const nodeGeometry = new THREE.IcosahedronGeometry(1.2, 3);
            
            // Advanced shader material for nodes
            const nodeMaterial = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec3 vPosition;
                    varying vec3 vNormal;
                    varying vec2 vUv;
                    uniform float time;
                    uniform float index;
                    
                    void main() {
                        vPosition = position;
                        vNormal = normal;
                        vUv = uv;
                        
                        vec3 pos = position;
                        float wave = sin(time * 2.0 + index + position.x * 5.0) * 0.1;
                        pos += normal * wave;
                        
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec3 vPosition;
                    varying vec3 vNormal;
                    varying vec2 vUv;
                    uniform float time;
                    uniform float index;
                    uniform vec3 color1;
                    uniform vec3 color2;
                    
                    void main() {
                        // Fresnel effect
                        float fresnel = dot(vNormal, vec3(0, 0, 1));
                        fresnel = 1.0 - fresnel;
                        fresnel = pow(fresnel, 3.0);
                        
                        // Animated color mixing
                        float colorMix = sin(time * 2.0 + index + vPosition.y * 3.0) * 0.5 + 0.5;
                        vec3 finalColor = mix(color1, color2, colorMix);
                        
                        // Add glow effect
                        finalColor += fresnel * vec3(0.5, 0.8, 1.0);
                        
                        gl_FragColor = vec4(finalColor, 0.9);
                    }
                `,
                uniforms: {
                    time: { value: 0 },
                    index: { value: index },
                    color1: { value: new THREE.Color(0x6366f1) },
                    color2: { value: new THREE.Color(0xf59e0b) }
                },
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(...pos);
            node.castShadow = true;
            node.receiveShadow = true;
            node.userData = { index, material: nodeMaterial };
            
            nodes.push(node);
            group.add(node);
        });

        // Enhanced connections
        this.createAdvancedConnections(group, nodes);
        
        // Add energy flows
        this.createEnergyFlows(group, nodes);

        scene.add(group);
        this.blockchainGroup = group;
        this.blockchainNodes = nodes;
    }

    createAdvancedConnections(group, nodes) {
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], 
            [5, 7], [6, 8], [7, 9], [8, 10], [9, 11], [10, 0], [11, 1]
        ];

        connections.forEach(([i, j]) => {
            const start = nodes[i].position;
            const end = nodes[j].position;
            
            // Create animated beam connections
            const distance = start.distanceTo(end);
            const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, distance, 8);
            
            const beamMaterial = new THREE.ShaderMaterial({
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    varying vec2 vUv;
                    
                    void main() {
                        float flow = sin(vUv.y * 20.0 - time * 5.0) * 0.5 + 0.5;
                        vec3 color = mix(vec3(0.2, 0.4, 0.8), vec3(1.0, 0.6, 0.2), flow);
                        float alpha = flow * 0.8;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                uniforms: {
                    time: { value: 0 }
                },
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const beam = new THREE.Mesh(beamGeometry, beamMaterial);
            beam.position.copy(start.clone().lerp(end, 0.5));
            beam.lookAt(end);
            beam.userData = { material: beamMaterial };
            
            group.add(beam);
        });
    }

    createEnergyFlows(group, nodes) {
        // Create flowing energy particles
        const particleCount = 300;
        const energyGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position along network paths
            const nodeIndex = Math.floor(Math.random() * nodes.length);
            const node = nodes[nodeIndex];
            positions[i3] = node.position.x + (Math.random() - 0.5) * 2;
            positions[i3 + 1] = node.position.y + (Math.random() - 0.5) * 2;
            positions[i3 + 2] = node.position.z + (Math.random() - 0.5) * 2;
            
            // Energy colors
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.9, 0.7);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            sizes[i] = Math.random() * 0.5 + 0.1;
        }

        energyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        energyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        energyGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const energyMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    float pulsing = sin(time * 3.0 + position.x * 0.1) * 0.5 + 0.5;
                    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + pulsing);
                    
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            uniforms: {
                time: { value: 0 }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        const energyParticles = new THREE.Points(energyGeometry, energyMaterial);
        group.add(energyParticles);
        
        this.energyParticles = energyParticles;
    }

    createMultiLayeredParticles(scene) {
        // Create multiple particle layers for depth
        const layers = [
            { count: 2000, size: 0.02, speed: 0.0005, color: 0x6366f1 },
            { count: 1000, size: 0.05, speed: 0.001, color: 0xf59e0b },
            { count: 500, size: 0.08, speed: 0.0015, color: 0x10b981 }
        ];

        layers.forEach((layer, layerIndex) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(layer.count * 3);
            const colors = new Float32Array(layer.count * 3);
            const opacities = new Float32Array(layer.count);

            for (let i = 0; i < layer.count; i++) {
                const i3 = i * 3;
                
                positions[i3] = (Math.random() - 0.5) * 200;
                positions[i3 + 1] = (Math.random() - 0.5) * 200;
                positions[i3 + 2] = (Math.random() - 0.5) * 200;
                
                const color = new THREE.Color(layer.color);
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
                
                opacities[i] = Math.random() * 0.8 + 0.2;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

            const material = new THREE.ShaderMaterial({
                vertexShader: `
                    attribute float opacity;
                    varying vec3 vColor;
                    varying float vOpacity;
                    uniform float time;
                    
                    void main() {
                        vColor = color;
                        vOpacity = opacity;
                        
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        float distanceFade = 1.0 - smoothstep(50.0, 150.0, length(mvPosition.xyz));
                        
                        gl_PointSize = ${layer.size * 100} * distanceFade;
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    varying float vOpacity;
                    
                    void main() {
                        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                        gl_FragColor = vec4(vColor, alpha * vOpacity * 0.6);
                    }
                `,
                uniforms: {
                    time: { value: 0 }
                },
                transparent: true,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            });

            const particles = new THREE.Points(geometry, material);
            particles.userData = { layer: layerIndex, speed: layer.speed, material };
            scene.add(particles);
            
            if (!this.particleLayers) this.particleLayers = [];
            this.particleLayers.push(particles);
        });
    }

    createAdvancedFloatingElements(scene) {
        const group = new THREE.Group();
        
        // Create various geometric shapes with advanced materials
        const shapes = [
            { geo: new THREE.DodecahedronGeometry(2, 2), count: 5 },
            { geo: new THREE.IcosahedronGeometry(1.5, 3), count: 4 },
            { geo: new THREE.OctahedronGeometry(1.8, 2), count: 6 },
            { geo: new THREE.TetrahedronGeometry(2.2, 1), count: 3 }
        ];

        shapes.forEach(({ geo, count }) => {
            for (let i = 0; i < count; i++) {
                const material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
                    metalness: 0.8,
                    roughness: 0.2,
                    transmission: 0.9,
                    thickness: 0.5,
                    transparent: true,
                    opacity: 0.8,
                    envMapIntensity: 1.5
                });

                const mesh = new THREE.Mesh(geo, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 40
                );
                
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                
                mesh.userData = {
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    },
                    floatSpeed: Math.random() * 0.01 + 0.005,
                    floatRange: Math.random() * 3 + 2,
                    initialY: mesh.position.y
                };

                group.add(mesh);
            }
        });

        scene.add(group);
        this.floatingElements = group;
    }

    // Enhanced Project Visualizations
    setupRealisticProjectScenes() {
        const projectCanvases = document.querySelectorAll('.project-canvas');
        
        projectCanvases.forEach((canvas, index) => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ 
                canvas, 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            
            const container = canvas.parentElement;
            const rect = container.getBoundingClientRect();
            renderer.setSize(rect.width, rect.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Enhanced project visualization
            this.createRealisticProjectVisualization(scene, index);
            
            // Advanced lighting for projects
            this.setupProjectLighting(scene, index);

            camera.position.z = 12;

            this.scenes.projects[index] = scene;
            this.cameras.projects[index] = camera;
            this.renderers.projects[index] = renderer;
        });
    }

    setupProjectLighting(scene, projectIndex) {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight);

        // Project-specific accent lighting
        const accentColors = [0xf59e0b, 0x10b981, 0x6366f1, 0x9945ff, 0xffd700];
        const accentLight = new THREE.PointLight(accentColors[projectIndex % accentColors.length], 2, 20);
        accentLight.position.set(-5, 3, 5);
        scene.add(accentLight);
    }

    createRealisticProjectVisualization(scene, projectIndex) {
        const group = new THREE.Group();
        
        switch(projectIndex) {
            case 0: // Smart Contract Lottery
                this.createRealisticLotteryVisualization(group);
                break;
            case 1: // Cross-Chain NFT
                this.createRealisticCrossChainVisualization(group);
                break;
            case 2: // Aegis Circuit Breaker
                this.createRealisticAegisVisualization(group);
                break;
            case 3: // Solana Lending
                this.createRealisticSolanaLendingVisualization(group);
                break;
            case 4: // ZK Stablecoin
                this.createRealisticZKStablecoinVisualization(group);
                break;
        }
        
        scene.add(group);
    }

    createRealisticLotteryVisualization(group) {
        // Create a realistic lottery machine
        const machineGeometry = new THREE.CylinderGeometry(3, 3, 2, 32);
        const machineMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2c2c54,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        });
        const machine = new THREE.Mesh(machineGeometry, machineMaterial);
        machine.castShadow = true;
        machine.receiveShadow = true;

        // Glass dome
        const domeGeometry = new THREE.SphereGeometry(2.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 0.95,
            thickness: 0.1,
            transparent: true,
            opacity: 0.8
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.y = 1.5;

        // Lottery balls with physics simulation
        const ballGroup = new THREE.Group();
        const ballCount = 12;
        const ballGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        
        for (let i = 0; i < ballCount; i++) {
            const ballMaterial = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color().setHSL(i / ballCount, 0.8, 0.6),
                metalness: 0.1,
                roughness: 0.2,
                clearcoat: 1,
                clearcoatRoughness: 0.1
            });
            
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.set(
                (Math.random() - 0.5) * 4,
                Math.random() * 2 + 1,
                (Math.random() - 0.5) * 4
            );
            ball.castShadow = true;
            ball.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    Math.random() * 0.01,
                    (Math.random() - 0.5) * 0.02
                ),
                bounceSpeed: Math.random() * 0.02 + 0.01
            };
            
            ballGroup.add(ball);
        }

        // Winning number display
        this.createWinningNumberDisplay(group);
        
        group.add(machine, dome, ballGroup);
        group.userData = { machine, dome, ballGroup };
    }

    createRealisticCrossChainVisualization(group) {
        // Create two realistic blockchain representations
        const blockchain1 = this.createDetailedBlockchain(0x6366f1, -4, 'Ethereum');
        const blockchain2 = this.createDetailedBlockchain(0xf59e0b, 4, 'Polygon');
        
        // Bridge with animated data packets
        this.createAdvancedBridge(group, blockchain1, blockchain2);
        
        // Cross-chain transaction visualization
        this.createTransactionFlow(group);
        
        group.add(blockchain1, blockchain2);
    }

    createDetailedBlockchain(color, xOffset, chainName) {
        const chainGroup = new THREE.Group();
        
        // Create block structure
        for (let i = 0; i < 5; i++) {
            const blockGeometry = new THREE.BoxGeometry(1.5, 1, 1.5);
            const blockMaterial = new THREE.MeshPhysicalMaterial({
                color: color,
                metalness: 0.7,
                roughness: 0.3,
                emissive: color,
                emissiveIntensity: 0.1
            });
            
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(xOffset, (i - 2) * 1.2, 0);
            block.castShadow = true;
            block.receiveShadow = true;
            
            // Add transaction data visualization
            this.addTransactionData(block, i);
            
            chainGroup.add(block);
        }
        
        // Add chain label
        this.createChainLabel(chainGroup, chainName, xOffset);
        
        return chainGroup;
    }

    createRealisticAegisVisualization(group) {
        // Create a sophisticated circuit breaker panel
        const panelGeometry = new THREE.BoxGeometry(4, 5, 0.5);
        const panelMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a2e,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.castShadow = true;
        panel.receiveShadow = true;

        // Aegis Labs branding
        const logoGeometry = new THREE.RingGeometry(0.8, 1, 32);
        const logoMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x6366f1,
            emissiveIntensity: 0.5
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, 1.5, 0.26);

        // Circuit breaker switches
        this.createAdvancedSwitches(group);
        
        // Status indicators with realistic LED simulation
        this.createStatusLEDs(group);
        
        // Circuit pathways
        this.createCircuitPathways(group);

        group.add(panel, logo);
        group.userData = { panel, logo };
    }

    createRealisticSolanaLendingVisualization(group) {
        // Create a futuristic lending platform interface
        const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 32);
        const platformMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x14f195,
            metalness: 0.8,
            roughness: 0.2,
            transmission: 0.1,
            thickness: 0.5,
            emissive: 0x14f195,
            emissiveIntensity: 0.1
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.castShadow = true;
        platform.receiveShadow = true;

        // Lending pools as holographic displays
        this.createHolographicPools(group);
        
        // Interest rate visualization
        this.createAdvancedInterestRates(group);
        
        // User connection nodes
        this.createUserNodes(group);
        
        // Real-time transaction flow
        this.createLendingTransactions(group);

        group.add(platform);
    }

    createRealisticZKStablecoinVisualization(group) {
        // Create a premium stablecoin with privacy features
        const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.4, 64);
        const coinMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.95,
            roughness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            emissive: 0xffd700,
            emissiveIntensity: 0.1
        });
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.castShadow = true;
        coin.receiveShadow = true;

        // ZK-proof visualization as mysterious energy fields
        this.createZKProofFields(group);
        
        // Privacy shield effects
        this.createPrivacyShields(group);
        
        // Stability mechanism visualization
        this.createStabilityMechanism(group);

        group.add(coin);
        group.userData = { coin };
    }

    // Enhanced animation loop with advanced effects
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = this.clock.getElapsedTime();
        const deltaTime = this.clock.getDelta();

        // Update background shader
        if (this.backgroundMaterial) {
            this.backgroundMaterial.uniforms.time.value = time;
        }

        // Animate blockchain nodes
        if (this.blockchainNodes) {
            this.blockchainNodes.forEach(node => {
                node.userData.material.uniforms.time.value = time;
            });
        }

        // Animate energy particles
        if (this.energyParticles) {
            this.energyParticles.material.uniforms.time.value = time;
            
            const positions = this.energyParticles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + i * 0.01) * 0.002;
            }
            this.energyParticles.geometry.attributes.position.needsUpdate = true;
        }

        // Animate particle layers
        if (this.particleLayers) {
            this.particleLayers.forEach(layer => {
                layer.material.uniforms.time.value = time;
                layer.rotation.y += layer.userData.speed;
            });
        }

        // Animate floating elements
        if (this.floatingElements) {
            this.floatingElements.children.forEach(mesh => {
                const userData = mesh.userData;
                mesh.rotation.x += userData.rotationSpeed.x;
                mesh.rotation.y += userData.rotationSpeed.y;
                mesh.rotation.z += userData.rotationSpeed.z;
                mesh.position.y = userData.initialY + Math.sin(time * userData.floatSpeed) * userData.floatRange;
            });
        }

        // Animate lights
        if (this.lights) {
            this.lights.accentLight1.intensity = 2 + Math.sin(time * 0.7) * 0.5;
            this.lights.accentLight2.intensity = 1.5 + Math.sin(time * 0.5 + Math.PI) * 0.3;
            this.lights.rimLight.intensity = 3 + Math.sin(time * 0.3) * 1;
        }

        // Render all scenes
        this.renderAllScenes();
    }

    renderAllScenes() {
        if (this.renderers.hero && this.scenes.hero && this.cameras.hero) {
            this.renderers.hero.render(this.scenes.hero, this.cameras.hero);
        }
        
        this.scenes.projects.forEach((scene, index) => {
            if (scene && this.cameras.projects[index] && this.renderers.projects[index]) {
                this.renderers.projects[index].render(scene, this.cameras.projects[index]);
            }
        });
    }

    // Utility methods for creating complex elements
    createWinningNumberDisplay(group) {
        // Create LED-style number displays
        for (let i = 0; i < 3; i++) {
            const displayGeometry = new THREE.PlaneGeometry(0.5, 0.8);
            const displayMaterial = new THREE.MeshBasicMaterial({
                color: 0xff4444,
                emissive: 0xff0000,
                emissiveIntensity: 0.8
            });
            const display = new THREE.Mesh(displayGeometry, displayMaterial);
            display.position.set(-1 + i * 1, -2.5, 3.1);
            group.add(display);
        }
    }

    createAdvancedBridge(group, chain1, chain2) {
        const bridgeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 16);
        const bridgeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x10b981,
            emissiveIntensity: 0.3,
            transmission: 0.2,
            thickness: 0.1
        });
        const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
        bridge.rotation.z = Math.PI / 2;
        bridge.castShadow = true;
        
        group.add(bridge);
    }

    // Additional utility methods would continue here...
    setupAdvancedScrollAnimations() {
        // Enhanced scroll animations with complex camera movements
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
            this.updateAdvancedScrollEffects();
        });
    }

    updateAdvancedScrollEffects() {
        const scrollProgress = this.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Advanced camera movements
        if (this.cameras.hero) {
            this.cameras.hero.position.x = Math.sin(scrollProgress * Math.PI * 4) * 10;
            this.cameras.hero.position.y = 5 + scrollProgress * 15;
            this.cameras.hero.position.z = 25 - scrollProgress * 5;
            this.cameras.hero.lookAt(0, 0, 0);
        }

        // Dynamic lighting based on scroll
        if (this.lights) {
            this.lights.mainLight.intensity = 1.5 + Math.sin(scrollProgress * Math.PI * 2) * 0.5;
            this.lights.mainLight.color.setHSL(0.6 + scrollProgress * 0.2, 0.8, 0.6);
        }
    }

    setupEnhancedMouseInteractions() {
        // Enhanced mouse interactions with 3D space
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            this.updateAdvancedMouseEffects();
        });
    }

    updateAdvancedMouseEffects() {
        // Advanced mouse parallax effects
        if (this.blockchainGroup) {
            gsap.to(this.blockchainGroup.rotation, {
                duration: 2,
                x: this.mouse.y * 0.3,
                y: this.mouse.x * 0.3,
                ease: "power2.out"
            });
        }

        // Mouse-influenced lighting
        if (this.lights) {
            this.lights.accentLight1.position.x = -15 + this.mouse.x * 10;
            this.lights.accentLight1.position.y = 10 + this.mouse.y * 5;
        }
    }

    setupResponsiveHandling() {
        window.addEventListener('resize', () => {
            this.handleAdvancedResize();
        });
    }

    handleAdvancedResize() {
        // Enhanced responsive handling
        if (this.cameras.hero && this.renderers.hero) {
            this.cameras.hero.aspect = window.innerWidth / window.innerHeight;
            this.cameras.hero.updateProjectionMatrix();
            this.renderers.hero.setSize(window.innerWidth, window.innerHeight);
        }

        // Update project scenes
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

    // Advanced Post-Processing Effects
    setupPostProcessing() {
        // Create post-processing for enhanced visual quality
        if (typeof THREE.EffectComposer !== 'undefined') {
            this.postProcessing.composer = new THREE.EffectComposer(this.renderers.hero);
            
            // Render pass
            const renderPass = new THREE.RenderPass(this.scenes.hero, this.cameras.hero);
            this.postProcessing.composer.addPass(renderPass);
            
            // Bloom effect
            const bloomPass = new THREE.UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                1.5, // strength
                0.4, // radius
                0.85 // threshold
            );
            this.postProcessing.composer.addPass(bloomPass);
            
            // Film grain effect
            const filmPass = new THREE.FilmPass(
                0.35, // noise intensity
                0.025, // scanline intensity
                648, // scanline count
                false // grayscale
            );
            this.postProcessing.composer.addPass(filmPass);
            
            // Final output pass
            filmPass.renderToScreen = true;
        }
    }

    // Dynamic Material Updates
    updateShaderUniforms() {
        const time = this.clock.getElapsedTime();
        
        // Update all shader materials with time-based animations
        if (this.scenes.hero) {
            this.scenes.hero.traverse((child) => {
                if (child.material && child.material.uniforms) {
                    if (child.material.uniforms.time) {
                        child.material.uniforms.time.value = time;
                    }
                    if (child.material.uniforms.mouse) {
                        child.material.uniforms.mouse.value = this.mouse;
                    }
                }
            });
        }
    }

    // Enhanced Animation Loop
    enhancedAnimate() {
        this.updateShaderUniforms();
        
        // Use post-processing if available
        if (this.postProcessing.composer) {
            this.postProcessing.composer.render();
        }
        
        // Update animation mixers
        const delta = this.clock.getDelta();
        this.animationMixers.forEach(mixer => {
            mixer.update(delta);
        });
    }
}

