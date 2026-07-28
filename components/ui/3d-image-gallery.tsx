"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html as DreiHtml,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

/**
 * Single-file Stellar Card Gallery
 * - Context, Starfield, Galaxy, FloatingCard, Modal, and Page in one.
 */

/* =========================
   Card Context (inlined)
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
  scrollYProgress: any
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children, scrollYProgress }: { children: React.ReactNode; scrollYProgress: any }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop", alt: "Elegant Invitation", title: "Elegant Invitation" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", alt: "Modern Design", title: "Modern Design" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", alt: "Vintage Style", title: "Vintage Style" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop", alt: "Minimalist", title: "Minimalist" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop", alt: "Floral Design", title: "Floral Design" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop", alt: "Geometric", title: "Geometric" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&auto=format&fit=crop", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop", alt: "Rustic Style", title: "Rustic Style" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", alt: "Dark Modern", title: "Dark Modern" },
    { id: "10", imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop", alt: "Colorful Party", title: "Colorful Party" },
    { id: "11", imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop", alt: "Organic Forms", title: "Organic Forms" },
    { id: "12", imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=600&auto=format&fit=crop", alt: "Minimal Architecture", title: "Minimal Architecture" },
    { id: "13", imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop", alt: "Wilderness", title: "Wilderness" },
    { id: "14", imageUrl: "https://images.unsplash.com/photo-1472214222541-d510753a4707?q=80&w=600&auto=format&fit=crop", alt: "Ethereal Valley", title: "Ethereal Valley" },
    { id: "15", imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop", alt: "Primeval Forest", title: "Primeval Forest" },
    { id: "16", imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop", alt: "Sylvan Light", title: "Sylvan Light" },
    { id: "17", imageUrl: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=600&auto=format&fit=crop", alt: "Aesthetic Sculpture", title: "Aesthetic Sculpture" },
    { id: "18", imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=600&auto=format&fit=crop", alt: "Sublime Mountain", title: "Sublime Mountain" },
    { id: "19", imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop", alt: "Alpine Peaks", title: "Alpine Peaks" },
    { id: "20", imageUrl: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?q=80&w=600&auto=format&fit=crop", alt: "Vibrant Horizon", title: "Vibrant Horizon" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards, scrollYProgress }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background (inlined)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // Transparent to show parent page background
    currentMount.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 3000 // Reduced for stellar performance
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = ((((i * 17.135) % 1)) - 0.5) * 1200
      positions[i * 3 + 1] = ((((i * 31.789) % 1)) - 0.5) * 1200
      positions[i * 3 + 2] = ((((i * 43.321) % 1)) - 0.5) * 1200
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.00015
      stars.rotation.x += 0.00008
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!currentMount) return
      const width = currentMount.clientWidth
      const height = currentMount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-transparent pointer-events-none" />
}

/* =========================
   Floating Card (inlined)
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)

      // Always target full scale 1 for constant visibility without blank dead zones
      const currentScale = groupRef.current.scale.x
      const targetScale = 1.0
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08)
      groupRef.current.scale.setScalar(lerpedScale)

      groupRef.current.position.set(
        position.x,
        position.y,
        position.z
      )
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <DreiHtml
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-36 h-48 rounded-xl overflow-hidden shadow-2xl bg-[#0F0F0F] p-2.5 select-none border border-white/5"
          style={{
            boxShadow: hovered
              ? "0 20px 40px rgba(255, 62, 0, 0.35), 0 0 20px rgba(255, 62, 0, 0.15)"
              : "0 10px 25px rgba(0, 0, 0, 0.7)",
            borderColor: hovered ? "rgba(255, 62, 0, 0.4)" : "rgba(255, 255, 255, 0.05)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-36 object-cover rounded-lg pointer-events-none"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-2 text-center">
            <p className="text-white/90 text-[10px] font-mono tracking-wider font-semibold truncate uppercase">{card.title}</p>
          </div>
        </div>
      </DreiHtml>
    </group>
  )
}

/* =========================
   Card Modal (inlined)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={handleBackdropClick}>
      <div className="relative max-w-sm w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-2xl bg-[#0F0F0F] p-4 transition-all duration-500 ease-out w-full border border-white/10"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255, 62, 0, 0.1)",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-xl bg-black object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.5)", opacity: 1 }}
              />
            </div>

            <h3 className="text-white font-display font-black text-center text-lg mb-4 tracking-tight uppercase">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg text-xs font-mono font-bold tracking-widest text-white outline-none transition duration-300 ease-out hover:bg-[#FF3E00]/20 bg-transparent border border-[#FF3E00]/40 active:scale-[0.97]"
              >
                <div className="flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#FF3E00] outline-none transition duration-300 ease-out hover:bg-[#FF3E00]/25 bg-[#FF3E00]/10 border border-[#FF3E00]/20 active:scale-[0.97]"
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy (inlined)
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 14 + (i % 3) * 3.5

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (((i * 123.456) % 1) - 0.5) * 0.15,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF3E00" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[12, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF3E00" transparent opacity={0.015} wireframe />
      </Sphere>
      <Sphere args={[16, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF3E00" transparent opacity={0.008} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <CardProvider scrollYProgress={scrollYProgress}>
      <div className="w-full h-full relative overflow-hidden bg-transparent">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 16], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            <CardGalaxy />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={6}
              maxDistance={35}
              autoRotate={true}
              autoRotateSpeed={0.4}
              rotateSpeed={0.6}
              zoomSpeed={1.0}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-6 left-6 z-20 text-white pointer-events-none select-none max-w-xs md:max-w-md">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FF3E00] font-bold">Stellar 3D Orbit</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black mb-1 text-white tracking-tight uppercase leading-none">THE SHOWCASE GALAXY</h3>
          <p className="text-[9px] font-mono text-neutral-400 tracking-wider">Drag to rotate orbit • Scroll to zoom • Click cards to inspect</p>
        </div>
      </div>
    </CardProvider>
  )
}
