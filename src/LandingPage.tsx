import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// ─── Ingredient pattern items ─────────────────────────────────────────────
const INGREDIENTS = [
  '🌿', '🍃', '🌶️', '🧄', '🫒', '🍋', '🌰', '🧅',
  '🌱', '🍂', '🫚', '🧂', '🌿', '🍃', '🫑', '🍅',
  '🌶️', '🧄', '🫒', '🍋', '🌰', '🧅', '🌱', '🍂',
];

interface Echo {
  id: number;
  x: number;
  y: number;
  size: number;
}

const SPOTLIGHT_RADIUS = 190;

function LandingPage() {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -500, y: -500 });
  const smoothPos = useRef({ x: -500, y: -500 });
  const prevPos = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);
  const echoIdCounter = useRef(0);

  const [echoes, setEchoes] = useState<Echo[]>([]);
  const [ingredientOffsets, setIngredientOffsets] = useState<
    { x: number; y: number; baseX: number; baseY: number; emoji: string; delay: number }[]
  >([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Inversion state for UI elements
  const [brandInverted, setBrandInverted] = useState(false);
  const [navInverted, setNavInverted] = useState(false);
  const [ctaInverted, setCtaInverted] = useState(false);
  const [socialInverted, setSocialInverted] = useState(false);
  const [ctaGlowing, setCtaGlowing] = useState(false);

  // Refs for UI element positions
  const brandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // Preload images
  const foodImgRef = useRef<HTMLImageElement | null>(null);
  const coverImgRef = useRef<HTMLImageElement | null>(null);
  const imagesLoaded = useRef(0);
  const [ready, setReady] = useState(false);

  // ─── Initialize ingredient positions ───────────────────────────────────
  useEffect(() => {
    const items = INGREDIENTS.map((emoji, i) => {
      const cols = 6;
      const rows = Math.ceil(INGREDIENTS.length / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseX = (col / cols) * 100 + (Math.random() * 10 - 5);
      const baseY = (row / rows) * 100 + (Math.random() * 10 - 5);
      return {
        emoji,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        delay: Math.random() * 0.4,
      };
    });
    setIngredientOffsets(items);
  }, []);

  // ─── Preload images ────────────────────────────────────────────────────
  useEffect(() => {
    const onLoad = () => {
      imagesLoaded.current++;
      if (imagesLoaded.current >= 2) setReady(true);
    };

    const food = new Image();
    food.src = '/food.jpg';
    food.onload = onLoad;
    foodImgRef.current = food;

    const cover = new Image();
    cover.src = '/foodcover.png';
    cover.onload = onLoad;
    coverImgRef.current = cover;
  }, []);

  // ─── Check if spotlight overlaps an element ────────────────────────────
  const isOverlapping = useCallback(
    (elRef: React.RefObject<HTMLElement | null>, cx: number, cy: number, radius: number) => {
      if (!elRef.current) return false;
      const rect = elRef.current.getBoundingClientRect();
      // Find closest point on rect to circle center
      const closestX = Math.max(rect.left, Math.min(cx, rect.right));
      const closestY = Math.max(rect.top, Math.min(cy, rect.bottom));
      const dx = cx - closestX;
      const dy = cy - closestY;
      return dx * dx + dy * dy < radius * radius;
    },
    [],
  );

  // ─── Draw canvas (spotlight reveal) ────────────────────────────────────
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !foodImgRef.current || !coverImgRef.current) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, w, h);

    // Calculate cover image dimensions (cover fit)
    const drawCover = (img: HTMLImageElement) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgRatio > canvasRatio) {
        dh = h;
        dw = h * imgRatio;
        dx = (w - dw) / 2;
        dy = 0;
      } else {
        dw = w;
        dh = w / imgRatio;
        dx = 0;
        dy = (h - dh) / 2;
      }
      return { dx, dy, dw, dh };
    };

    // Draw the food image (revealed layer)
    const foodDims = drawCover(foodImgRef.current);
    ctx.drawImage(foodImgRef.current, foodDims.dx, foodDims.dy, foodDims.dw, foodDims.dh);

    // Create the cover layer with a circular hole
    ctx.save();

    const coverDims = drawCover(coverImgRef.current);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d')!;

    // Draw cover image on temp canvas
    tempCtx.drawImage(coverImgRef.current, coverDims.dx, coverDims.dy, coverDims.dw, coverDims.dh);

    // Cut out the spotlight circle
    tempCtx.globalCompositeOperation = 'destination-out';
    const gradient = tempCtx.createRadialGradient(
      smoothPos.current.x * dpr,
      smoothPos.current.y * dpr,
      0,
      smoothPos.current.x * dpr,
      smoothPos.current.y * dpr,
      SPOTLIGHT_RADIUS * dpr,
    );
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.95)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    tempCtx.fillStyle = gradient;
    tempCtx.beginPath();
    tempCtx.arc(
      smoothPos.current.x * dpr,
      smoothPos.current.y * dpr,
      SPOTLIGHT_RADIUS * dpr,
      0,
      Math.PI * 2,
    );
    tempCtx.fill();

    // Draw the masked cover on top of food
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
  }, []);

  // ─── Animation loop ────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawCanvas();
    };

    resize();
    window.addEventListener('resize', resize);

    let lastEchoTime = 0;

    const animate = () => {
      // Smooth cursor following with easing
      const ease = 0.22;
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * ease;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * ease;

      // Update custom cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${smoothPos.current.x}px`;
        cursorRef.current.style.top = `${smoothPos.current.y}px`;
      }

      // Calculate velocity
      const dx = smoothPos.current.x - prevPos.current.x;
      const dy = smoothPos.current.y - prevPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Spawn echoes on fast movement
      const now = Date.now();
      if (velocity > 4 && now - lastEchoTime > 60) {
        lastEchoTime = now;
        const id = echoIdCounter.current++;
        setEchoes((prev) => [
          ...prev.slice(-8),
          {
            id,
            x: smoothPos.current.x,
            y: smoothPos.current.y,
            size: SPOTLIGHT_RADIUS * 2 * (0.5 + Math.min(velocity / 30, 0.5)),
          },
        ]);
        // Auto-remove after animation
        setTimeout(() => {
          setEchoes((prev) => prev.filter((e) => e.id !== id));
        }, 800);
      }

      prevPos.current = { ...smoothPos.current };

      // Check element inversions
      const cx = smoothPos.current.x;
      const cy = smoothPos.current.y;
      const r = SPOTLIGHT_RADIUS;

      setBrandInverted(isOverlapping(brandRef, cx, cy, r));
      setNavInverted(isOverlapping(navRef, cx, cy, r));
      setCtaInverted(isOverlapping(ctaRef, cx, cy, r));
      setSocialInverted(isOverlapping(socialRef, cx, cy, r));
      setCtaGlowing(isOverlapping(ctaRef, cx, cy, r * 1.3));

      // Update parallax
      const px = ((mousePos.current.x / window.innerWidth) - 0.5) * -8;
      const py = ((mousePos.current.y / window.innerHeight) - 0.5) * -8;
      setParallax({ x: px, y: py });

      // Update ingredient offsets
      setIngredientOffsets((prev) =>
        prev.map((item) => {
          const elX = (item.baseX / 100) * window.innerWidth;
          const elY = (item.baseY / 100) * window.innerHeight;
          const distX = mousePos.current.x - elX;
          const distY = mousePos.current.y - elY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const maxDist = 300;
          const influence = Math.max(0, 1 - dist / maxDist);
          const pushX = -distX * influence * 0.03;
          const pushY = -distY * influence * 0.03;
          return {
            ...item,
            x: item.baseX + pushX,
            y: item.baseY + pushY,
          };
        }),
      );

      // Draw canvas
      drawCanvas();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, drawCanvas, isOverlapping]);

  // ─── Mouse tracking ────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: -500, y: -500 };
  }, []);

  const handleStartCooking = () => {
    navigate('/home');
  };

  return (
    <div
      ref={containerRef}
      className="landing-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ingredient pattern background */}
      <div className="ingredient-pattern">
        {ingredientOffsets.map((item, i) => (
          <span
            key={i}
            className="ingredient-item"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transitionDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Canvas for image reveal */}
      <canvas
        ref={canvasRef}
        className="bg-layer"
        style={{ zIndex: 2 }}
      />

      {/* Echo trails */}
      {echoes.map((echo) => (
        <div
          key={echo.id}
          className="echo-trail"
          style={{
            left: echo.x - echo.size / 2,
            top: echo.y - echo.size / 2,
            width: echo.size,
            height: echo.size,
          }}
        />
      ))}

      {/* UI Overlay with parallax */}
      <div className="ui-overlay">
        {/* Brand - top left */}
        <div
          ref={brandRef}
          className="brand parallax-wrapper"
          style={{
            transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
          }}
        >
          <div className={`brand-name ${brandInverted ? 'inverted' : ''}`}>
            RecipeStash
          </div>
          <div className={`brand-tagline ${brandInverted ? 'inverted' : ''}`}>
            Discover. Share. Cook.
          </div>
        </div>

        {/* Navigation - top right */}
        <nav
          ref={navRef}
          className="nav-links parallax-wrapper"
          style={{
            transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
          }}
        >
          <button
            type="button"
            className={`nav-link ${navInverted ? 'inverted' : ''}`}
            onClick={() => navigate('/home#explore')}
          >
            Explore Recipes
          </button>
          <button
            type="button"
            className={`nav-link ${navInverted ? 'inverted' : ''}`}
            onClick={() => navigate('/home#signin')}
          >
            Sign In
          </button>
        </nav>

        {/* CTA Button - center bottom */}
        <div
          ref={ctaRef}
          className="cta-wrapper parallax-wrapper"
          style={{
            transform: `translateX(-50%) translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
          }}
        >
          <button
            type="button"
            onClick={handleStartCooking}
            className={`cta-button ${ctaInverted ? 'inverted' : ''} ${ctaGlowing ? 'glowing' : ''}`}
          >
            Start Cooking
          </button>
        </div>

        {/* Social links - bottom right */}
        <div
          ref={socialRef}
          className="social-links parallax-wrapper"
          style={{
            transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
          }}
        >
          {/* Instagram */}
          <a
            href="https://instagram.com/recipestash"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link ${socialInverted ? 'inverted' : ''}`}
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/recipestash"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link ${socialInverted ? 'inverted' : ''}`}
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@recipestash"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link ${socialInverted ? 'inverted' : ''}`}
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/recipestash"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link ${socialInverted ? 'inverted' : ''}`}
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        {/* Scroll hint */}
        <div className={`scroll-hint ${ctaInverted ? 'inverted' : ''}`}>
          Move your cursor to reveal
        </div>
      </div>

      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor" />
    </div>
  );
}

export default LandingPage;

