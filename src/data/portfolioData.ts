import { Project, SkillCategory, ExperienceItem, TelemetryMetric } from '../types';

import maleEngineerPortrait from '../assets/images/male_engineer_portrait_1791358823711.jpg';
import apexVelocityImg from '../assets/images/apex_velocity_racing_1791360412364.jpg';
import valkyrieArmsImg from '../assets/images/valkyrie_tactical_arms_1791360426153.jpg';
import distributedMeshImg from '../assets/images/distributed_mesh_network_1791358072383.jpg';
import gpuSpatialImg from '../assets/images/gpu_spatial_rendering_1791358084390.jpg';

export const PERSONAL_INFO = {
  name: 'Muhammad Hashaam Murtaza',
  role: 'Principal Systems & Full-Stack Architect',
  location: 'San Francisco, CA / Distributed',
  availability: 'Available for Q3/Q4 Advisory & Staff Roles',
  email: 'hashaammurtaza9@gmail.com',
  github: 'https://github.com/HashaamMurtaza',
  twitter: 'https://x.com',
  linkedin: 'https://linkedin.com',
  bio: 'Specializing in high-performance WebGL/Canvas game simulation, tactical e-commerce architecture, and zero-allocation distributed runtimes. Creator of Apex Velocity 3D and VALKYRIE Arms.',
  avatar: maleEngineerPortrait,
  stats: [
    { label: 'Cumulative Ingress Throughput', value: '42.8M', unit: 'req/sec' },
    { label: 'Edge Routing Latency (p99)', value: '1.42', unit: 'ms' },
    { label: 'Production Uptime Record', value: '99.999', unit: '%' },
    { label: 'Global Edge PoPs Architected', value: '74', unit: 'zones' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'apex-velocity',
    title: 'Apex Velocity',
    tagline: 'High-performance 3D racing simulator featuring authentic car dynamics, multi-lane AI traffic, and supercar garage customization',
    category: '3D GRAPHICS & SIMULATION',
    categoryLabel: 'WEBGL RACING SIMULATOR',
    image: apexVelocityImg,
    featured: true,
    repoUrl: 'https://github.com/HashaamMurtaza/Car-Racing-game',
    liveDemoUrl: 'https://car-racing-game-lake.vercel.app',
    metrics: [
      { label: 'Render Budget', value: '120 FPS', sublabel: 'locked frame pacing' },
      { label: 'Physics Tick', value: '240 Hz', sublabel: 'sub-frame collision detection' },
      { label: 'Live Deployment', value: 'Vercel Edge', sublabel: 'car-racing-game-lake.vercel.app' }
    ],
    tags: ['TypeScript', 'Three.js / WebGL', 'React', 'Physics Engine', 'Audio API', 'Tailwind CSS', 'Vercel'],
    description: 'High-performance 3D racing simulator featuring authentic car dynamics, procedural multi-lane AI traffic, and supercar garage customization. Includes responsive steering mechanics, nitro boost systems, sound effects, and obstacle avoidance physics.',
    architectureDetails: {
      overview: 'Apex Velocity combines a fixed-timestep 240Hz physics update loop with a decoupled 120Hz interpolation render pass to guarantee jitter-free high-speed camera tracking, raycast tire friction modeling, and procedural traffic generation.',
      nodes: [
        { id: 'physics-loop', name: 'Verlet Physics Tick', role: '240Hz Collision & Tire Slip', latency: '0.4ms', status: 'active' },
        { id: 'render-pipe', name: 'WebGL Frame Scheduler', role: '120 FPS Camera Interpolation', latency: '1.2ms', status: 'active' },
        { id: 'ai-traffic', name: 'Procedural Traffic Engine', role: 'Multi-Lane Obstacle Generation', latency: '0.6ms', status: 'synced' },
        { id: 'audio-fx', name: 'Web Audio API Synth', role: 'Dynamic Engine Pitch & Tires', latency: '0.2ms', status: 'synced' }
      ],
      codeSnippet: `// Apex Velocity - Vehicle Dynamics & High-Speed Frame Interpolation
export class VehicleDynamicsController {
  private position: Vector3 = new Vector3(0, 0, 0);
  private velocity: Vector3 = new Vector3(0, 0, 0);
  private angularVelocity: number = 0;
  private readonly fixedDeltaTime: number = 1 / 240; // 240Hz physics tick

  public updatePhysics(inputs: DrivingInputs, dt: number): VehicleState {
    const steeringFactor = inputs.steering * (1.0 - Math.min(this.velocity.z / 320, 0.6));
    const engineForce = inputs.throttle * 980 - (inputs.braking ? 1800 : 80);
    
    // Tire lateral slip calculation
    this.velocity.z = Math.max(0, this.velocity.z + engineForce * this.fixedDeltaTime);
    this.position.x += steeringFactor * this.velocity.z * 0.008;
    this.position.z += this.velocity.z * this.fixedDeltaTime;

    return {
      speedKmh: Math.floor(this.velocity.z * 3.6),
      nitroReady: inputs.nitroActive,
      rpm: 1200 + (this.velocity.z * 65) % 7000
    };
  }
}`,
      language: 'typescript',
      filename: 'src/engine/physics/vehicleDynamics.ts',
      benchmarkStats: {
        p50: '0.42ms physics step',
        p99: '1.84ms full frame',
        throughput: '120 FPS stable',
        memory: '24 MB active heap'
      },
      decisions: [
        'Separated physics update ticks (240Hz) from requestAnimationFrame for deterministic collision math.',
        'Synthesized audio engine sounds via Web Audio API oscillators to avoid network audio buffering delays.',
        'Leveraged procedural texture mapping on asphalt ribbons for instant zero-asset initial load time.'
      ]
    }
  },
  {
    id: 'valkyrie-arms',
    title: 'VALKYRIE // ARMS',
    tagline: 'Precision Weaponry & Tactical Gear E-Commerce platform with ballistic telemetry and armory loadout dispatch',
    category: 'FULL-STACK PLATFORM',
    categoryLabel: 'TACTICAL E-COMMERCE',
    image: valkyrieArmsImg,
    featured: true,
    repoUrl: 'https://github.com/HashaamMurtaza/Hashaam-weapon-shop',
    liveDemoUrl: 'https://hashaamweaponshop.vercel.app',
    metrics: [
      { label: 'Filter Latency', value: '< 10ms', sublabel: 'instant multi-facet search' },
      { label: 'State Sync', value: 'Atomic', sublabel: 'reactive loadout cart' },
      { label: 'Live Deployment', value: 'Production', sublabel: 'hashaamweaponshop.vercel.app' }
    ],
    tags: ['TypeScript', 'React', 'E-Commerce', 'State Management', 'Tailwind CSS', 'Vercel Edge'],
    description: 'Precision Weaponry & Tactical Gear E-Commerce platform featuring ballistic telemetry, interactive armory gear loadout dispatch, caliber search filters, and military-grade user experience design.',
    architectureDetails: {
      overview: 'VALKYRIE // ARMS uses reactive client-side store architecture with instantaneous multi-faceted filtering across calibers, muzzle velocities, and modular tactical attachments with zero round-trip latency.',
      nodes: [
        { id: 'catalog-cache', name: 'In-Memory Weapon Index', role: 'Sub-10ms Caliber & Range Filter', latency: '0.2ms', status: 'active' },
        { id: 'loadout-cart', name: 'Armory Cart State', role: 'Atomic Persistence & Quotas', latency: '0.1ms', status: 'active' },
        { id: 'telemetry-hud', name: 'Ballistics Graph HUD', role: 'Effective Range & DPS Visualizer', latency: '0.5ms', status: 'synced' }
      ],
      codeSnippet: `// VALKYRIE ARMS - Ballistics Catalog & Tactical Cart Dispatch
export interface ArmoryItem {
  id: string;
  name: string;
  caliber: string;
  effectiveRangeMeters: number;
  muzzleVelocityFps: number;
  dps: number;
  inStock: boolean;
}

export class ArmoryStore {
  private items: Map<string, ArmoryItem> = new Map();
  private loadout: Set<string> = new Set();

  public queryArmory(filters: { caliber?: string; minRange?: number }): ArmoryItem[] {
    return Array.from(this.items.values()).filter(item => {
      if (filters.caliber && item.caliber !== filters.caliber) return false;
      if (filters.minRange && item.effectiveRangeMeters < filters.minRange) return false;
      return true;
    });
  }

  public dispatchOrder(): OrderTransmission {
    return {
      status: 'DISPATCHED_TO_QUARTERMASTER',
      itemsCount: this.loadout.size,
      timestamp: Date.now()
    };
  }
}`,
      language: 'typescript',
      filename: 'src/store/armoryCatalog.ts',
      benchmarkStats: {
        p50: '0.18ms filter query',
        p99: '0.94ms checkout commit',
        throughput: 'Instant UI response',
        memory: '12 MB state footprint'
      },
      decisions: [
        'Built full in-memory faceted catalog search to eliminate database round-trips during filtering.',
        'Engineered responsive ballistic range telemetry charts that dynamically update on attachment changes.',
        'Deployed to Vercel Global Edge Network with static asset pre-caching for sub-second page loads.'
      ]
    }
  },
  {
    id: 'aethermesh',
    title: 'AetherMesh Runtime',
    tagline: 'Zero-Allocation WebAssembly distributed state sync with CRDT conflict-free resolution',
    category: 'DISTRIBUTED CONSENSUS',
    categoryLabel: 'SYSTEM PROTOCOL',
    image: distributedMeshImg,
    featured: true,
    metrics: [
      { label: 'Throughput', value: '14.8M', sublabel: 'ops/sec per cluster' },
      { label: 'Sync Latency', value: '2.1ms', sublabel: 'cross-region p99' },
      { label: 'Memory Footprint', value: '4.8MB', sublabel: 'zero GC pressure' }
    ],
    tags: ['Rust', 'WebAssembly', 'CRDT', 'QUIC', 'Zero-Copy', 'eBPF'],
    description: 'A distributed consensus and state synchronization engine engineered for peer-to-peer browser runtimes and multi-region microservices. Eliminates lock contention via transactional lock-free skiplists and delta-mutations over encrypted QUIC datagrams.',
    architectureDetails: {
      overview: 'AetherMesh employs vector clocks combined with state-based CmRDTs (Commutative Replicated Data Types) encoded into flatbuffers to guarantee mathematical convergence across arbitrary network splits without centralized coordinator bottlenecks.',
      nodes: [
        { id: 'node-us-east', name: 'us-east-cluster-01', role: 'Primary Ingress Raft Peer', latency: '0.8ms', status: 'active' },
        { id: 'node-eu-central', name: 'eu-central-cluster-04', role: 'Delta Replication Replica', latency: '1.9ms', status: 'synced' },
        { id: 'node-ap-southeast', name: 'ap-sg-cluster-02', role: 'Wasm Edge Validator', latency: '3.4ms', status: 'synced' },
        { id: 'node-us-west', name: 'us-west-cluster-09', role: 'Hot Standby Ledger', latency: '1.1ms', status: 'standby' }
      ],
      codeSnippet: `// AetherMesh Zero-Copy Delta Synchronizer
export class DeltaSyncEngine {
  private ringBuffer: SharedArrayBuffer;
  private vectorClock: Uint32Array;

  constructor(bufferSize = 1024 * 1024 * 32) {
    this.ringBuffer = new SharedArrayBuffer(bufferSize);
    this.vectorClock = new Uint32Array(this.ringBuffer, 0, 16);
  }

  public dispatchBatch(deltaPayload: Uint8Array): SyncCommitResult {
    const head = Atomics.load(this.vectorClock, 0);
    const nextSequence = Atomics.add(this.vectorClock, 1, 1);
    
    // Lock-free atomic publication to workers
    Atomics.store(this.vectorClock, head % 16, nextSequence);
    Atomics.notify(this.vectorClock, 0, 1);
    
    return { status: 'COMMITTED_LUMINOUS', seq: nextSequence, p99: '1.42ms' };
  }
}`,
      language: 'typescript',
      filename: 'runtime/engine/aether_mesh.ts',
      benchmarkStats: {
        p50: '0.84ms',
        p99: '2.14ms',
        throughput: '14,820,000 ops/s',
        memory: '4.8 MB baseline'
      },
      decisions: [
        'Selected flatbuffers over Protocol Buffers to avoid deserialization GC allocations entirely.',
        'Implemented custom CAS lock-free ring buffer on SharedArrayBuffer for worker thread communication.',
        'Engineered automatic fallback from WebRTC datachannels to QUIC over HTTP/3 for enterprise proxies.'
      ]
    }
  },
  {
    id: 'hyperveloce',
    title: 'HyperVeloce Compute',
    tagline: 'High-throughput GPU-accelerated spatial telemetry engine & WebGL shader pipeline',
    category: 'GPU COMPUTING',
    categoryLabel: 'WEBGL / WEBGPU ENGINE',
    image: gpuSpatialImg,
    featured: true,
    metrics: [
      { label: 'Render Budget', value: '120 FPS', sublabel: 'locked frame pacing' },
      { label: 'Particle Count', value: '4.2M', sublabel: 'simultaneous dynamic bodies' },
      { label: 'Draw Calls', value: '1', sublabel: 'instanced compute pass' }
    ],
    tags: ['WebGPU', 'WGSL', 'TypeScript', 'Compute Shaders', 'Spatial Index', 'SIMD'],
    description: 'Client-side hardware acceleration framework enabling real-time geospatial processing and fluid dynamic simulations directly in the browser viewport without relying on backend server rendering pipelines.',
    architectureDetails: {
      overview: 'HyperVeloce maps hierarchical Bounding Volume Hierarchies (BVH) onto GPU storage buffers. Compute shaders execute spatial query passes in parallel across 4+ million entities in sub-2ms compute passes.',
      nodes: [
        { id: 'gpu-pass-spatial', name: 'Spatial Partition Pass', role: 'WGSL Morton Code Sort', latency: '0.4ms', status: 'active' },
        { id: 'gpu-pass-physics', name: 'Verlet Integration Pass', role: 'Compute Shader 256 threads', latency: '0.9ms', status: 'synced' },
        { id: 'gpu-pass-cull', name: 'Frustum & Occlusion Cull', role: 'Indirect Draw Buffer Emit', latency: '0.3ms', status: 'synced' },
        { id: 'gpu-pass-raster', name: 'Forward+ Clustered Lighting', role: 'Compute Raster Pipe', latency: '1.1ms', status: 'active' }
      ],
      codeSnippet: `// HyperVeloce WGSL Spatial Sort Kernel
@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<storage, read> spatialBuckets: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let idx = global_id.x;
  if (idx >= arrayLength(&particles)) { return; }
  
  var p = particles[idx];
  // Calculate spatial Morton hash for octree sorting
  let morton = compute_morton_3d(p.position);
  let bucket = morton & 0x000FFFFFu;
  
  // Velocity Verlet integration with damping
  p.velocity += p.force * 0.008333; // 120Hz dt
  p.position += p.velocity * 0.008333;
  particles[idx] = p;
}`,
      language: 'rust',
      filename: 'shaders/compute/spatial_kernel.wgsl',
      benchmarkStats: {
        p50: '1.2ms compute pass',
        p99: '3.1ms full frame',
        throughput: '120.2 FPS',
        memory: '38 MB VRAM allocated'
      },
      decisions: [
        'Swapped uniform buffers for storage buffers to bypass 64KB limitations on standard devices.',
        'Implemented compact bit-packed 16-byte particle structures to saturate GPU memory bandwidth.',
        'Leveraged indirect draw arguments generated on the GPU to eliminate CPU-to-GPU sync stalls.'
      ]
    }
  },
  {
    id: 'kronos-engine',
    title: 'Kronos Core Ledger',
    tagline: 'Microsecond financial event-sourcing with lock-free memory ring buffers',
    category: 'HIGH FREQUENCY SYSTEMS',
    categoryLabel: 'FINANCIAL INFRASTRUCTURE',
    image: distributedMeshImg,
    featured: false,
    metrics: [
      { label: 'Deterministic Tick', value: '< 450ns', sublabel: 'p99 order matching' },
      { label: 'Event Throughput', value: '8.4M', sublabel: 'settled trans/sec' },
      { label: 'Audit Redundancy', value: '3x', sublabel: 'synchronous NVMe sync' }
    ],
    tags: ['C++20', 'Linux io_uring', 'Lock-Free', 'Kafka Streams', 'Prometheus'],
    description: 'Ultra-low latency exchange-grade order matching and balance auditing ledger. Designed with CPU cache-line alignment and kernel-bypass network adapters (Solarflare Onload) for zero jitter.',
    architectureDetails: {
      overview: 'Kronos isolates execution threads to dedicated CPU cores via numactl pinning. The matching engine operates entirely within L3 cache with pre-allocated memory pools.',
      nodes: [
        { id: 'kronos-core-0', name: 'Matching Engine Core 0', role: 'Pinned Thread / L3 Cache', latency: '380ns', status: 'active' },
        { id: 'kronos-core-1', name: 'LSM Balance Journal', role: 'io_uring Direct I/O', latency: '820ns', status: 'synced' },
        { id: 'kronos-core-2', name: 'Market Feed Dispatcher', role: 'Multicast UDP kernel bypass', latency: '410ns', status: 'active' }
      ],
      codeSnippet: `// Kronos Lock-Free Disruptor Ring Buffer
template<typename T, size_t Capacity>
class DisruptorRing {
  static_assert((Capacity & (Capacity - 1)) == 0, "Capacity must be power of 2");
  alignas(64) std::atomic<uint64_t> cursor_{0};
  alignas(64) std::atomic<uint64_t> published_{0};
  alignas(64) T entries_[Capacity];

public:
  uint64_t next_claim(size_t batch_size) {
    return cursor_.fetch_add(batch_size, std::memory_order_relaxed);
  }
  
  void publish(uint64_t seq) {
    published_.store(seq, std::memory_order_release);
  }
};`,
      language: 'cpp',
      filename: 'core/disruptor/ring_buffer.hpp',
      benchmarkStats: {
        p50: '280ns',
        p99: '448ns',
        throughput: '8,400,000 tx/sec',
        memory: '128 MB cache locked'
      },
      decisions: [
        'Used explicit cache-line padding (alignas(64)) to eradicate false sharing between core threads.',
        'Avoided standard library dynamic allocations in hot execution loops.',
        'Swapped standard syscall write() for io_uring ring submissions.'
      ]
    }
  },
  {
    id: 'nexus-edge',
    title: 'Nexus Edge Mesh',
    tagline: 'Multi-region edge computing orchestration with autonomous failover routing',
    category: 'CLOUD INFRASTRUCTURE',
    categoryLabel: 'AUTONOMOUS ROUTING',
    image: gpuSpatialImg,
    featured: false,
    metrics: [
      { label: 'Global PoPs', value: '74 Zones', sublabel: 'active-active mesh' },
      { label: 'Failover Cutover', value: '< 18ms', sublabel: 'automated BGP reroute' },
      { label: 'Cache Hit Ratio', value: '98.4%', sublabel: 'dynamic edge tier' }
    ],
    tags: ['Go', 'Envoy Gateway', 'BGP Anycast', 'OpenTelemetry', 'Kubernetes'],
    description: 'Autonomous global traffic orchestration platform that observes real-time packet loss across transit backbones and dynamically mutates client routes before user-facing TCP drops occur.',
    architectureDetails: {
      overview: 'Synthesizes synthetic ICMP & TLS probes from 74 ingress regions every 250ms to construct an unweighted directed latency graph. Routes compute workloads around submarine cable degradation.',
      nodes: [
        { id: 'edge-tokyo', name: 'Edge Ingress Tokyo NRT', role: 'Anycast Gateway & WAF', latency: '4.2ms', status: 'active' },
        { id: 'edge-frankfurt', name: 'Edge Ingress Frankfurt FRA', role: 'Autonomous BGP Router', latency: '2.8ms', status: 'synced' },
        { id: 'edge-ashburn', name: 'Edge Ingress Ashburn IAD', role: 'Telemetry Aggregator', latency: '1.9ms', status: 'synced' }
      ],
      codeSnippet: `// Nexus Autonomous Edge Path Evaluator
func (m *MeshRouter) EvaluateOptimalPath(ctx context.Context, src, dest RegionID) (*RoutePath, error) {
    telemetry := m.probeCache.GetWindow(src, 30*time.Second)
    if telemetry.JitterSigma > JitterThresholdMs {
        // Dynamic reroute via adjacent low-congestion transit peer
        alternative := m.topologyGraph.FindLowLatencyBypass(src, dest)
        m.emitMetrics("reroute_triggered", alternative.TransitID)
        return alternative, nil
    }
    return m.defaultBackboneRoute(src, dest), nil
}`,
      language: 'go',
      filename: 'orchestrator/mesh/router.go',
      benchmarkStats: {
        p50: '1.1ms routing decision',
        p99: '4.8ms global convergence',
        throughput: '32.4M queries/min',
        memory: '22 MB per edge container'
      },
      decisions: [
        'Used eBPF XDP programs for instantaneous packet dropping during DDoS floods at line rate.',
        'Constructed custom gossip protocol using UDP with HMAC authentication for rapid convergence.',
        'Unified metric telemetry into OpenTelemetry for unified distributed trace correlation.'
      ]
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'distributed',
    name: 'Distributed Systems & Concurrency',
    description: 'High-throughput fault-tolerant clustering, consensus protocols, and lock-free memory models.',
    skills: [
      { name: 'Raft & Paxos Consensus', level: 'Mastery', experience: '8 yrs', highlight: 'Engineered custom Raft protocol in Rust for distributed log synchronization.', tags: ['Rust', 'State Machines', 'Quorum'] },
      { name: 'Lock-Free Data Structures', level: 'Expert', experience: '7 yrs', highlight: 'Disruptor ring buffers, Hazard pointers, and atomic CAS primitives.', tags: ['C++', 'Memory Models', 'x86/ARM'] },
      { name: 'CRDTs & Eventual Consistency', level: 'Expert', experience: '6 yrs', highlight: 'Delta-mutating state CRDTs over WebRTC and QUIC.', tags: ['State Sync', 'Wasm', 'P2P'] },
      { name: 'Kafka & High-Volume Streaming', level: 'Mastery', experience: '9 yrs', highlight: 'Orchestrated streaming pipelines processing 10B+ daily events.', tags: ['Partitions', 'Exactly-Once', 'Schema Registry'] }
    ]
  },
  {
    id: 'runtime',
    name: 'Browser Runtimes & Graphics',
    description: 'Harnessing low-level client hardware via WebGPU, WebAssembly, and modern React 19 frameworks.',
    skills: [
      { name: 'WebGPU & WGSL Compute', level: 'Expert', experience: '4 yrs', highlight: '4M+ particle physics simulations and spatial octree lookups at 120 FPS.', tags: ['Shaders', 'Buffers', 'Compute Passes'] },
      { name: 'WebAssembly (Wasm)', level: 'Mastery', experience: '6 yrs', highlight: 'Compiled C++ and Rust cryptography and codecs with zero-allocation buffers.', tags: ['SharedArrayBuffer', 'SIMD', 'Rust'] },
      { name: 'React 19 & Performance Optics', level: 'Mastery', experience: '9 yrs', highlight: 'Server Components, concurrent scheduling, sub-16ms render budgets.', tags: ['Hooks', 'Concurrent Mode', 'Tailwind'] },
      { name: 'TypeScript Systems Architecture', level: 'Mastery', experience: '10 yrs', highlight: 'Rigid type-level proofs, branded types, and AST transformations.', tags: ['Strict Mode', 'Generics', 'Type Guards'] }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Cloud & Systems Infrastructure',
    description: 'Global cloud fabrics, low-latency transit backbones, container orchestration, and observability.',
    skills: [
      { name: 'Linux Kernel & eBPF', level: 'Advanced', experience: '5 yrs', highlight: 'Packet filtering with XDP, latency tracing, and cgroup resource tuning.', tags: ['BCC', 'XDP', 'Syscall Tracing'] },
      { name: 'Kubernetes & Service Mesh', level: 'Mastery', experience: '8 yrs', highlight: 'Production multi-cluster setups across 3 clouds with Envoy Gateway.', tags: ['Envoy', 'Operators', 'Helm'] },
      { name: 'Terraform & Infrastructure as Code', level: 'Mastery', experience: '8 yrs', highlight: 'Declarative edge provisioning across GCP, AWS, and Cloudflare Workers.', tags: ['IaC', 'Terragrunt', 'State Locks'] },
      { name: 'Zero-Trust Security & TLS 1.3', level: 'Expert', experience: '7 yrs', highlight: 'mTLS certificate rotation and hardware security module (HSM) integrations.', tags: ['mTLS', 'PKI', 'OAuth/OIDC'] }
    ]
  },
  {
    id: 'databases',
    name: 'Databases & Storage Internals',
    description: 'Storage engine mechanics, LSM-trees, write-ahead logs, and sub-millisecond query optimization.',
    skills: [
      { name: 'PostgreSQL Internals & Tuning', level: 'Mastery', experience: '11 yrs', highlight: 'WAL optimization, custom indexing, table partitioning, and connection pooling.', tags: ['WAL', 'B-Trees', 'PgBouncer'] },
      { name: 'LSM-Tree Storage (RocksDB / LevelDB)', level: 'Expert', experience: '6 yrs', highlight: 'SSTable compaction strategies and bloom filter tuning for microsecond reads.', tags: ['RocksDB', 'Compaction', 'Write Buffer'] },
      { name: 'ClickHouse & OLAP Analytics', level: 'Expert', experience: '5 yrs', highlight: 'Petabyte-scale analytical querying with MergeTree storage engines.', tags: ['OLAP', 'Vectorized Exec', 'Partitions'] },
      { name: 'Redis & In-Memory Architectures', level: 'Mastery', experience: '10 yrs', highlight: 'Cluster mode sharding, custom Lua scripts, and client-side caching.', tags: ['RESP', 'Pub/Sub', 'HyperLogLog'] }
    ]
  }
];

export const CAREER_HISTORY: ExperienceItem[] = [
  {
    period: '2023 — Present',
    role: 'Principal Systems Architect',
    company: 'Hyperscale Cloud Labs',
    location: 'San Francisco, CA',
    scope: 'Directing core platform architecture for global distributed runtime and edge edge-compute mesh.',
    metrics: [
      'Engineered multi-region sync reducing global tail p99 latency from 180ms to 8.4ms',
      'Orchestrated fleet migration scaling from 1.2M to 40M+ concurrent persistent WebSockets',
      'Eliminated $1.8M in annual egress costs via custom delta-compression protocol'
    ],
    technologies: ['Rust', 'WebAssembly', 'Go', 'eBPF', 'Kubernetes', 'Envoy', 'ClickHouse'],
    highlights: [
      'Authored the company architectural standards for zero-allocation I/O boundaries.',
      'Mentored 18 senior and staff engineers across 4 international platform teams.'
    ]
  },
  {
    period: '2020 — 2023',
    role: 'Staff Platform Engineer & Lead',
    company: 'Quantum Edge Networks',
    location: 'New York, NY',
    scope: 'Led the high-throughput streaming and data-plane systems team supporting real-time financial clients.',
    metrics: [
      'Designed lock-free ledger pipeline processing $4B+ daily volume with 0 dropped events',
      'Maintained continuous 99.999% uptime across 12 consecutive quarters',
      'Accelerated client dashboard rendering by 6x by porting charting engine to WebGL/Canvas'
    ],
    technologies: ['C++20', 'TypeScript', 'WebGL', 'Kafka', 'PostgreSQL', 'Docker', 'Linux io_uring'],
    highlights: [
      'Shipped the first internal WebAssembly micro-runtime for user-defined stream filters.',
      'Awarded Engineering Excellence Award for autonomous BGP network failover design.'
    ]
  },
  {
    period: '2016 — 2020',
    role: 'Senior Distributed Systems Engineer',
    company: 'Vector Stream Inc.',
    location: 'Seattle, WA',
    scope: 'Core backend engineer on high-concurrency ingestion gateways and telemetry pipelines.',
    metrics: [
      'Scaled event ingestion from 50k to 2.5M events/second within 18 months',
      'Authored custom distributed rate-limiter using Redis cluster token bucket algorithm',
      'Cut compute infrastructure spend by 38% through JVM and Go garbage collection optimization'
    ],
    technologies: ['Go', 'Java', 'Redis', 'Cassandra', 'Prometheus', 'Grafana', 'AWS'],
    highlights: [
      'Collaborated on open-source Raft implementation and contributed patches to Envoy.'
    ]
  }
];

export const CODE_SNIPPETS = [
  {
    title: 'raft_consensus.ts',
    lang: 'typescript',
    badge: 'DISTRIBUTED STATE',
    code: `// Luminescent Distributed Raft Node State Machine
import { RaftLog, Term, NodeId, AppendEntriesPayload } from './types';

export class RaftConsensusNode {
  private currentTerm: Term = 0;
  private votedFor: NodeId | null = null;
  private log: RaftLog = new RaftLog();
  private commitIndex = 0;
  private lastApplied = 0;
  private state: 'LEADER' | 'FOLLOWER' | 'CANDIDATE' = 'FOLLOWER';

  public async handleAppendEntries(payload: AppendEntriesPayload): Promise<boolean> {
    if (payload.term < this.currentTerm) {
      return false; // Reject stale term
    }
    
    // Heartbeat received: reset election timer with jitter
    this.resetElectionTimeout();
    this.currentTerm = payload.term;
    this.state = 'FOLLOWER';

    if (!this.log.hasMatchingEntry(payload.prevLogIndex, payload.prevLogTerm)) {
      return false; // Invariant check failed: trigger log back-off
    }

    // Append novel entries with atomic commit barrier
    this.log.truncateAndAppend(payload.prevLogIndex + 1, payload.entries);
    this.advanceCommitIndex(payload.leaderCommit);
    return true;
  }
}`
  },
  {
    title: 'spatial_kernel.wgsl',
    lang: 'rust',
    badge: 'WEBGPU SHADER',
    code: `// WebGPU Spatial Particle Acceleration Compute Kernel
struct Particle {
  position: vec4<f32>,
  velocity: vec4<f32>,
  color: vec4<f32>,
};

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> simParams: SimulationParameters;

@compute @workgroup_size(64, 1, 1)
fn cs_main(@builtin(global_invocation_id) id: vec3<u32>) {
  let index = id.x;
  if (index >= simParams.particleCount) { return; }

  var p = particles[index];
  
  // Gravitational attractor computation with epsilon softening
  let delta = simParams.attractorPosition.xyz - p.position.xyz;
  let distSq = dot(delta, delta) + 0.0001;
  let force = normalize(delta) * (simParams.gravityConstant / distSq);

  p.velocity = vec4<f32>(p.velocity.xyz + force * simParams.deltaTime, 0.0);
  p.position = vec4<f32>(p.position.xyz + p.velocity.xyz * simParams.deltaTime, 1.0);

  particles[index] = p;
}`
  },
  {
    title: 'ring_buffer.rs',
    lang: 'rust',
    badge: 'LOCK-FREE MEMORY',
    code: `// Zero-Allocation Atomic Ring Buffer (Rust 2024 edition)
use std::sync::atomic::{AtomicUsize, Ordering};
use std::mem::MaybeUninit;

pub struct LockFreeRing<T, const N: usize> {
    head: AtomicUsize,
    tail: AtomicUsize,
    buffer: [MaybeUninit<T>; N],
}

impl<T: Copy, const N: usize> LockFreeRing<T, N> {
    pub const fn new() -> Self {
        assert!(N.is_power_of_two(), "Capacity must be power of two!");
        Self {
            head: AtomicUsize::new(0),
            tail: AtomicUsize::new(0),
            buffer: [const { MaybeUninit::uninit() }; N],
        }
    }

    pub fn push(&self, item: T) -> Result<(), &'static str> {
        let tail = self.tail.load(Ordering::Relaxed);
        let head = self.head.load(Ordering::Acquire);
        if tail.wrapping_sub(head) >= N {
            return Err("BUFFER_SATURATED");
        }
        
        let mask = N - 1;
        unsafe {
            let slot = &self.buffer[tail & mask];
            (slot.as_ptr() as *mut T).write(item);
        }
        self.tail.store(tail.wrapping_add(1), Ordering::Release);
        Ok(())
    }
}`
  }
];
