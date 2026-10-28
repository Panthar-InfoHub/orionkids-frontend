const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'public', 'printables-images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const svgs = {
  // Card 19: Mirror Magic (Bilateral Symmetry Butterfly)
  'card-19-mirror-magic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg19" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F0FDFA"/>
        <stop offset="100%" stop-color="#CCFBF1"/>
      </linearGradient>
      <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0D9488"/>
        <stop offset="50%" stop-color="#2DD4BF"/>
        <stop offset="100%" stop-color="#14B8A6"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBBF24"/>
        <stop offset="100%" stop-color="#F59E0B"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg19)" rx="32"/>
    <!-- Grid overlay on right half -->
    <g opacity="0.25" stroke="#0D9488" stroke-width="1.5">
      <line x1="400" y1="50" x2="400" y2="550"/>
      <line x1="450" y1="50" x2="450" y2="550" stroke-dasharray="4 4"/>
      <line x1="500" y1="50" x2="500" y2="550" stroke-dasharray="4 4"/>
      <line x1="550" y1="50" x2="550" y2="550" stroke-dasharray="4 4"/>
      <line x1="600" y1="50" x2="600" y2="550" stroke-dasharray="4 4"/>
      <line x1="650" y1="50" x2="650" y2="550" stroke-dasharray="4 4"/>
      <line x1="700" y1="50" x2="700" y2="550" stroke-dasharray="4 4"/>
      <line x1="400" y1="100" x2="750" y2="100" stroke-dasharray="4 4"/>
      <line x1="400" y1="150" x2="750" y2="150" stroke-dasharray="4 4"/>
      <line x1="400" y1="200" x2="750" y2="200" stroke-dasharray="4 4"/>
      <line x1="400" y1="250" x2="750" y2="250" stroke-dasharray="4 4"/>
      <line x1="400" y1="300" x2="750" y2="300" stroke-dasharray="4 4"/>
      <line x1="400" y1="350" x2="750" y2="350" stroke-dasharray="4 4"/>
      <line x1="400" y1="400" x2="750" y2="400" stroke-dasharray="4 4"/>
      <line x1="400" y1="450" x2="750" y2="450" stroke-dasharray="4 4"/>
      <line x1="400" y1="500" x2="750" y2="500" stroke-dasharray="4 4"/>
    </g>
    <!-- Symmetry Axis line -->
    <line x1="400" y1="40" x2="400" y2="560" stroke="#0F766E" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="400" y="32" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#0F766E" letter-spacing="3">LINE OF SYMMETRY</text>
    
    <!-- Left Wing (Drawn) -->
    <path d="M 400 300 C 340 180 200 120 120 200 C 60 260 120 380 240 370 C 140 420 160 520 260 510 C 330 500 380 400 400 320 Z" fill="url(#wingGrad)" stroke="#0F766E" stroke-width="6"/>
    <circle cx="200" cy="240" r="35" fill="url(#goldGrad)"/>
    <circle cx="200" cy="240" r="18" fill="#FFF"/>
    <circle cx="230" cy="440" r="24" fill="#F43F5E"/>
    <circle cx="230" cy="440" r="10" fill="#FFF"/>

    <!-- Right Wing (Dotted / Incomplete for user to finish) -->
    <path d="M 400 300 C 460 180 600 120 680 200 C 740 260 680 380 560 370 C 660 420 640 520 540 510 C 470 500 420 400 400 320 Z" fill="none" stroke="#0D9488" stroke-width="5" stroke-dasharray="10 8" opacity="0.75"/>
    <circle cx="600" cy="240" r="35" fill="none" stroke="#F59E0B" stroke-width="4" stroke-dasharray="6 6"/>
    <circle cx="570" cy="440" r="24" fill="none" stroke="#F43F5E" stroke-width="4" stroke-dasharray="6 6"/>
    
    <!-- Butterfly Body -->
    <ellipse cx="400" cy="310" rx="18" ry="110" fill="#0A1D3D"/>
    <!-- Head -->
    <circle cx="400" cy="180" r="28" fill="#0A1D3D"/>
    <!-- Antennae -->
    <path d="M 390 160 Q 340 100 330 110" fill="none" stroke="#0A1D3D" stroke-width="5" stroke-linecap="round"/>
    <circle cx="330" cy="110" r="8" fill="#FFC72C"/>
    <path d="M 410 160 Q 460 100 470 110" fill="none" stroke="#0A1D3D" stroke-width="5" stroke-linecap="round"/>
    <circle cx="470" cy="110" r="8" fill="#FFC72C"/>

    <!-- Friendly Cartoon Eyes -->
    <circle cx="392" cy="175" r="7" fill="#FFF"/>
    <circle cx="408" cy="175" r="7" fill="#FFF"/>
    <circle cx="394" cy="175" r="3.5" fill="#0A1D3D"/>
    <circle cx="410" cy="175" r="3.5" fill="#0A1D3D"/>
    <!-- Smile -->
    <path d="M 394 192 Q 400 198 406 192" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Magic Sparkles & Pencil -->
    <g transform="translate(680, 480) rotate(-45)">
      <rect x="0" y="0" width="30" height="120" rx="8" fill="#FFC72C" stroke="#0A1D3D" stroke-width="3"/>
      <polygon points="0,0 30,0 15,-30" fill="#F87171" stroke="#0A1D3D" stroke-width="3"/>
      <circle cx="15" cy="-28" r="4" fill="#0A1D3D"/>
    </g>
    <text x="400" y="575" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#0A1D3D">MIRROR MAGIC: DRAW THE OTHER HALF</text>
  </svg>`,

  // Card 20: Grid Drawing Rocket
  'card-20-grid-rocket.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg20" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="100%" stop-color="#1C2541"/>
      </linearGradient>
      <linearGradient id="flame" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FBBF24"/>
        <stop offset="50%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#EF4444"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg20)" rx="32"/>
    <!-- Blueprint Grid -->
    <g opacity="0.3" stroke="#38BDF8" stroke-width="1.5">
      <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#38BDF8" stroke-width="1"/>
      </pattern>
      <rect x="80" y="60" width="640" height="480" fill="url(#gridPattern)" stroke="#38BDF8" stroke-width="3" rx="16"/>
    </g>
    <!-- Coordinate letters & numbers -->
    <g font-family="monospace" font-size="14" font-weight="bold" fill="#38BDF8" opacity="0.8">
      <text x="105" y="50">A</text><text x="155" y="50">B</text><text x="205" y="50">C</text>
      <text x="255" y="50">D</text><text x="305" y="50">E</text><text x="355" y="50">F</text>
      <text x="405" y="50">G</text><text x="455" y="50">H</text><text x="505" y="50">I</text>
      <text x="555" y="50">J</text><text x="605" y="50">K</text><text x="655" y="50">L</text>
      <text x="60" y="85">1</text><text x="60" y="135">2</text><text x="60" y="185">3</text>
      <text x="60" y="235">4</text><text x="60" y="285">5</text><text x="60" y="335">6</text>
      <text x="60" y="385">7</text><text x="60" y="435">8</text><text x="60" y="485">9</text>
    </g>
    <!-- Stars -->
    <circle cx="150" cy="180" r="3" fill="#FFF" opacity="0.8"/>
    <circle cx="280" cy="120" r="4" fill="#FFD700" opacity="0.9"/>
    <circle cx="680" cy="140" r="3" fill="#FFF"/>
    <circle cx="620" cy="400" r="3" fill="#FFF" opacity="0.7"/>
    <!-- Saturn Planet in corner -->
    <circle cx="650" cy="180" r="35" fill="#F59E0B"/>
    <ellipse cx="650" cy="180" rx="55" ry="12" fill="none" stroke="#FDE68A" stroke-width="6" transform="rotate(-20 650 180)"/>
    <!-- The Rocket on the Grid -->
    <!-- Blast Thruster Flame -->
    <polygon points="400,420 350,540 380,470 400,560 420,470 450,540" fill="url(#flame)"/>
    <!-- Rocket Body -->
    <path d="M 400 120 C 450 200 460 360 450 420 L 350 420 C 340 360 350 200 400 120 Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="6"/>
    <!-- Nose Cone -->
    <path d="M 400 120 C 430 170 440 210 440 210 L 360 210 C 360 210 370 170 400 120 Z" fill="#EF4444"/>
    <!-- Porthole Window with Smiling Astronaut -->
    <circle cx="400" cy="270" r="42" fill="#0284C7"/>
    <circle cx="400" cy="270" r="34" fill="#E0F2FE"/>
    <circle cx="400" cy="270" r="22" fill="#0A1D3D"/>
    <!-- Astronaut visor shine -->
    <path d="M 390 255 A 15 15 0 0 1 410 255" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
    <!-- Wings/Fins -->
    <path d="M 350 360 L 280 430 L 350 420 Z" fill="#EF4444" stroke="#0284C7" stroke-width="4"/>
    <path d="M 450 360 L 520 430 L 450 420 Z" fill="#EF4444" stroke="#0284C7" stroke-width="4"/>
    <!-- Center Fin -->
    <rect x="395" y="360" width="10" height="60" fill="#0284C7"/>
    <text x="400" y="580" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#38BDF8" letter-spacing="2">GRID DRAWING: ROCKET SCALE</text>
  </svg>`,

  // Card 21: Grid Drawing Cool Cat
  'card-21-grid-cat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="bg21" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FAF5FF"/>
        <stop offset="100%" stop-color="#F3E8FF"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg21)" rx="32"/>
    <!-- Grid Canvas -->
    <pattern id="catGrid" width="45" height="45" patternUnits="userSpaceOnUse">
      <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#C084FC" stroke-width="1.2" opacity="0.35"/>
    </pattern>
    <rect x="70" y="50" width="660" height="490" fill="url(#catGrid)" stroke="#8B5CF6" stroke-width="3" rx="16"/>
    <!-- Coordinate numbers -->
    <text x="80" y="80" font-family="monospace" font-size="14" font-weight="bold" fill="#7C3AED">BOX: C-4</text>
    
    <!-- Big Cool Orange Tabby Cat Head -->
    <circle cx="400" cy="310" r="150" fill="#FB923C" stroke="#7C3AED" stroke-width="6"/>
    <!-- Ears -->
    <polygon points="290,210 250,90 350,170" fill="#FB923C" stroke="#7C3AED" stroke-width="6"/>
    <polygon points="300,190 270,110 340,165" fill="#F472B6"/>
    <polygon points="510,210 550,90 450,170" fill="#FB923C" stroke="#7C3AED" stroke-width="6"/>
    <polygon points="500,190 530,110 460,165" fill="#F472B6"/>
    <!-- Tiger Stripes -->
    <path d="M 400 160 L 400 210 M 380 170 L 390 205 M 420 170 L 410 205" stroke="#EA580C" stroke-width="8" stroke-linecap="round"/>
    <path d="M 260 300 L 290 305 M 260 325 L 295 325" stroke="#EA580C" stroke-width="8" stroke-linecap="round"/>
    <path d="M 540 300 L 510 305 M 540 325 L 505 325" stroke="#EA580C" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Cool Sunglasses -->
    <path d="M 290 270 C 290 250 330 250 380 250 L 420 250 C 470 250 510 250 510 270 C 510 320 460 330 420 330 C 405 330 395 320 395 320 C 395 320 385 330 370 330 C 330 330 290 320 290 270 Z" fill="#0A1D3D"/>
    <!-- Sunglasses reflection bars -->
    <polygon points="320,265 350,265 330,315 300,315" fill="#38BDF8" opacity="0.8"/>
    <polygon points="430,265 460,265 440,315 410,315" fill="#38BDF8" opacity="0.8"/>
    
    <!-- Cute pink nose & mouth -->
    <polygon points="390,345 410,345 400,360" fill="#EC4899"/>
    <path d="M 400 360 L 400 380 M 400 380 Q 380 395 365 385 M 400 380 Q 420 395 435 385" fill="none" stroke="#0A1D3D" stroke-width="4" stroke-linecap="round"/>
    <!-- Whiskers -->
    <line x1="280" y1="360" x2="210" y2="350" stroke="#0A1D3D" stroke-width="3" stroke-linecap="round"/>
    <line x1="280" y1="375" x2="200" y2="380" stroke="#0A1D3D" stroke-width="3" stroke-linecap="round"/>
    <line x1="520" y1="360" x2="590" y2="350" stroke="#0A1D3D" stroke-width="3" stroke-linecap="round"/>
    <line x1="520" y1="375" x2="600" y2="380" stroke="#0A1D3D" stroke-width="3" stroke-linecap="round"/>
    <text x="400" y="580" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#7C3AED">GRID ART: COOL CAT PROPORTIONS</text>
  </svg>`,

  // Card 22: Scribble Magic
  'card-22-scribble-magic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FFF1F2" rx="32"/>
    <!-- Big Wild Scribble in rainbow colors -->
    <path d="M 220 300 C 150 180 280 120 400 150 C 520 180 620 140 600 280 C 580 400 650 480 500 500 C 350 520 250 460 220 380 C 200 320 280 260 380 270 C 480 280 500 380 420 420 C 340 450 300 360 340 320 C 380 280 460 310 440 360" fill="none" stroke="#F43F5E" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 260 280 C 200 200 310 160 410 180 C 510 200 580 180 560 300 C 540 400 600 450 480 470 C 360 490 280 430 250 350" fill="none" stroke="#8B5CF6" stroke-width="8" stroke-linecap="round"/>
    <path d="M 280 320 C 230 240 330 200 420 210 C 510 220 540 300 500 380 C 460 430 380 410 320 350" fill="none" stroke="#06B6D4" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Monster Transformation: Eyes, Horns, Wings added to the scribble! -->
    <!-- Googly Eyes -->
    <circle cx="360" cy="220" r="34" fill="#FFFFFF" stroke="#0A1D3D" stroke-width="5"/>
    <circle cx="365" cy="220" r="14" fill="#0A1D3D"/>
    <circle cx="362" cy="216" r="5" fill="#FFFFFF"/>
    
    <circle cx="440" cy="220" r="34" fill="#FFFFFF" stroke="#0A1D3D" stroke-width="5"/>
    <circle cx="435" cy="220" r="14" fill="#0A1D3D"/>
    <circle cx="432" cy="216" r="5" fill="#FFFFFF"/>

    <!-- Monster Antennae -->
    <path d="M 380 180 Q 360 120 340 130" stroke="#0A1D3D" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="340" cy="130" r="12" fill="#FBBF24" stroke="#0A1D3D" stroke-width="3"/>
    <path d="M 420 180 Q 440 120 460 130" stroke="#0A1D3D" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="460" cy="130" r="12" fill="#FBBF24" stroke="#0A1D3D" stroke-width="3"/>

    <!-- Happy Monster Smile with 2 fangs -->
    <path d="M 360 290 Q 400 340 440 290" fill="#0A1D3D" stroke="#0A1D3D" stroke-width="4"/>
    <polygon points="380,290 390,305 400,290" fill="#FFF"/>
    <polygon points="405,290 415,305 425,290" fill="#FFF"/>

    <!-- Cartoon Crayon Drawing the scribble -->
    <g transform="translate(620, 180) rotate(35)">
      <rect x="0" y="0" width="35" height="130" rx="6" fill="#F43F5E" stroke="#0A1D3D" stroke-width="3"/>
      <polygon points="0,0 35,0 17.5,-35" fill="#E11D48" stroke="#0A1D3D" stroke-width="3"/>
      <text x="18" y="70" font-family="sans-serif" font-weight="900" font-size="12" fill="#FFF" transform="rotate(-90 18 70)">CRAYON</text>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#E11D48">SCRIBBLE MAGIC: DIVERGENT CREATIVITY</text>
  </svg>`,

  // Card 23: Shape Surprise
  'card-23-shape-surprise.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FFFBEB" rx="32"/>
    <!-- Geometric animals built from circles, squares, triangles -->
    <!-- Geometric Fox: Big orange triangle body -->
    <polygon points="400,200 260,420 540,420" fill="#F97316" stroke="#0A1D3D" stroke-width="6"/>
    <!-- White triangle chest -->
    <polygon points="400,280 340,420 460,420" fill="#FFFFFF"/>
    <!-- Triangle Ears -->
    <polygon points="310,240 260,110 370,180" fill="#EA580C" stroke="#0A1D3D" stroke-width="5"/>
    <polygon points="300,210 280,140 340,180" fill="#FEF08A"/>
    <polygon points="490,240 540,110 430,180" fill="#EA580C" stroke="#0A1D3D" stroke-width="5"/>
    <polygon points="500,210 520,140 460,180" fill="#FEF08A"/>
    <!-- Head circle -->
    <circle cx="400" cy="220" r="65" fill="#F97316" stroke="#0A1D3D" stroke-width="5"/>
    <!-- Cheek triangles -->
    <polygon points="340,240 310,220 345,200" fill="#FFF"/>
    <polygon points="460,240 490,220 455,200" fill="#FFF"/>
    <!-- Eyes (circles) -->
    <circle cx="375" cy="210" r="10" fill="#0A1D3D"/>
    <circle cx="425" cy="210" r="10" fill="#0A1D3D"/>
    <circle cx="377" cy="208" r="3.5" fill="#FFF"/>
    <circle cx="427" cy="208" r="3.5" fill="#FFF"/>
    <!-- Nose (black inverted triangle) -->
    <polygon points="390,235 410,235 400,248" fill="#0A1D3D"/>
    <!-- Fluffy Fox Tail (geometric polygon with white tip) -->
    <path d="M 520 400 C 600 370 680 300 660 220 C 620 260 580 320 500 360 Z" fill="#F97316" stroke="#0A1D3D" stroke-width="5"/>
    <path d="M 660 220 C 650 250 630 265 615 275 L 660 220 Z" fill="#FFF"/>
    <!-- Floating geometric shape building blocks -->
    <circle cx="150" cy="180" r="45" fill="#06B6D4" stroke="#0A1D3D" stroke-width="4"/>
    <rect x="110" y="320" width="80" height="80" fill="#8B5CF6" stroke="#0A1D3D" stroke-width="4" transform="rotate(15 150 360)"/>
    <polygon points="680,440 620,520 740,520" fill="#10B981" stroke="#0A1D3D" stroke-width="4"/>
    <text x="400" y="550" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#D97706">SHAPE SURPRISE: GEOMETRIC ANIMALS</text>
  </svg>`,

  // Card 24: Doodle Patterns (Zentangle)
  'card-24-doodle-patterns.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#ECFDF5" rx="32"/>
    <!-- Mandala-like pattern square partitioned in quadrants -->
    <rect x="150" y="60" width="500" height="440" rx="24" fill="#FFFFFF" stroke="#059669" stroke-width="6"/>
    <line x1="400" y1="60" x2="400" y2="500" stroke="#059669" stroke-width="4"/>
    <line x1="150" y1="280" x2="650" y2="280" stroke="#059669" stroke-width="4"/>
    
    <!-- Quadrant 1: Concentric Waves -->
    <path d="M 150 120 Q 275 80 400 120 M 150 160 Q 275 120 400 160 M 150 200 Q 275 160 400 200 M 150 240 Q 275 200 400 240" fill="none" stroke="#0D9488" stroke-width="4"/>
    <circle cx="275" cy="180" r="25" fill="#FBBF24"/>
    
    <!-- Quadrant 2: Fish Scales / Arcs -->
    <g fill="none" stroke="#0284C7" stroke-width="3.5">
      <path d="M 400 100 A 30 30 0 0 1 460 100 A 30 30 0 0 1 520 100 A 30 30 0 0 1 580 100 A 30 30 0 0 1 640 100"/>
      <path d="M 430 140 A 30 30 0 0 1 490 140 A 30 30 0 0 1 550 140 A 30 30 0 0 1 610 140"/>
      <path d="M 400 180 A 30 30 0 0 1 460 180 A 30 30 0 0 1 520 180 A 30 30 0 0 1 580 180 A 30 30 0 0 1 640 180"/>
      <path d="M 430 220 A 30 30 0 0 1 490 220 A 30 30 0 0 1 550 220 A 30 30 0 0 1 610 220"/>
    </g>
    
    <!-- Quadrant 3: Geometric Checkerboard & Chevrons -->
    <g stroke="#8B5CF6" stroke-width="4" fill="none">
      <path d="M 170 300 L 220 350 L 170 400 L 220 450 M 230 300 L 280 350 L 230 400 L 280 450 M 290 300 L 340 350 L 290 400 L 340 450 M 350 300 L 400 350 L 350 400 L 400 450"/>
    </g>

    <!-- Quadrant 4: Spiral Zentangle -->
    <path d="M 525 390 A 20 20 0 0 1 525 410 A 35 35 0 0 1 505 380 A 55 55 0 0 1 550 360 A 80 80 0 0 1 565 440 A 105 105 0 0 1 475 445" fill="none" stroke="#EC4899" stroke-width="5" stroke-linecap="round"/>
    
    <!-- Fine-line pen resting on top -->
    <g transform="translate(660, 360) rotate(-60)">
      <rect x="0" y="0" width="16" height="140" rx="4" fill="#0A1D3D"/>
      <polygon points="0,0 16,0 8,-25" fill="#94A3B8"/>
      <circle cx="8" cy="-24" r="2.5" fill="#0A1D3D"/>
    </g>
    <text x="400" y="555" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#059669">DOODLE PATTERNS: MINDFUL FOCUS MAT</text>
  </svg>`,

  // Card 25: Mandala Magic
  'card-25-mandala-magic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FAF5FF" rx="32"/>
    <!-- Outer concentric rings -->
    <g transform="translate(400, 280)">
      <circle cx="0" cy="0" r="220" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="4"/>
      <circle cx="0" cy="0" r="180" fill="#DDD6FE" stroke="#7C3AED" stroke-width="3"/>
      <circle cx="0" cy="0" r="140" fill="#C4B5FD" stroke="#6D28D9" stroke-width="3"/>
      <circle cx="0" cy="0" r="90" fill="#A78BFA" stroke="#5B21B6" stroke-width="3"/>
      <circle cx="0" cy="0" r="45" fill="#FFC72C" stroke="#D97706" stroke-width="3"/>
      
      <!-- 12 Petals around outer ring -->
      ${Array.from({length: 12}).map((_, i) => `
        <g transform="rotate(${i * 30})">
          <path d="M 0 -180 C -35 -220 -20 -250 0 -260 C 20 -250 35 -220 0 -180 Z" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
          <circle cx="0" cy="-220" r="8" fill="#FFF"/>
          <path d="M 0 -140 C -25 -165 -15 -185 0 -195 C 15 -185 25 -165 0 -140 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
          <circle cx="0" cy="-160" r="6" fill="#FFD700"/>
          <path d="M 0 -90 C -18 -110 -10 -125 0 -135 C 10 -125 18 -110 0 -90 Z" fill="#34D399" stroke="#059669" stroke-width="2"/>
        </g>
      `).join('')}
      <circle cx="0" cy="0" r="20" fill="#EF4444"/>
      <circle cx="0" cy="0" r="8" fill="#FFF"/>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#7C3AED">MANDALA MAGIC: RADIAL SYMMETRY</text>
  </svg>`,

  // Card 26: Maze Astronaut to the Star
  'card-26-astronaut-maze.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#0B132B" rx="32"/>
    <!-- Deep Space background with nebulae -->
    <circle cx="650" cy="120" r="100" fill="#8B5CF6" opacity="0.2"/>
    <circle cx="150" cy="450" r="80" fill="#06B6D4" opacity="0.2"/>
    
    <!-- Concentric Circular Space Maze -->
    <g transform="translate(400, 270)" fill="none" stroke="#38BDF8" stroke-width="5" stroke-linecap="round">
      <!-- Ring 1 (Outer) -->
      <path d="M -220 0 A 220 220 0 1 1 220 0 A 220 220 0 0 1 -180 126"/>
      <!-- Ring 2 -->
      <path d="M -170 0 A 170 170 0 0 1 147 85 M 100 137 A 170 170 0 0 1 -170 0"/>
      <!-- Ring 3 -->
      <path d="M 0 -120 A 120 120 0 1 1 -120 0 M -84 -84 A 120 120 0 0 1 0 -120"/>
      <!-- Ring 4 -->
      <path d="M -70 0 A 70 70 0 1 1 0 70 M 50 50 A 70 70 0 0 1 -70 0"/>
      <!-- Maze internal dividing barriers -->
      <line x1="0" y1="-220" x2="0" y2="-170"/>
      <line x1="170" y1="0" x2="120" y2="0"/>
      <line x1="-120" y1="0" x2="-70" y2="0"/>
      <line x1="0" y1="120" x2="0" y2="170"/>
    </g>
    
    <!-- Giant Golden Star Goal at Maze Center! -->
    <g transform="translate(400, 270)">
      <polygon points="0,-40 12,-12 40,-12 18,6 26,35 0,18 -26,35 -18,6 -40,-12 -12,-12" fill="#FFC72C" stroke="#F59E0B" stroke-width="4"/>
      <circle cx="0" cy="0" r="10" fill="#FFF" opacity="0.8"/>
    </g>

    <!-- Astronaut Starting Point at top left -->
    <g transform="translate(140, 120)">
      <!-- Space Helmet -->
      <circle cx="40" cy="40" r="35" fill="#E2E8F0" stroke="#0284C7" stroke-width="4"/>
      <!-- Golden Visor -->
      <ellipse cx="45" cy="40" rx="22" ry="18" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
      <!-- White shine on visor -->
      <path d="M 35 32 Q 45 28 55 35" stroke="#FFF" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Suit Body -->
      <rect x="20" y="70" width="40" height="45" rx="10" fill="#F8FAFC" stroke="#0284C7" stroke-width="4"/>
      <!-- Oxygen tank -->
      <rect x="8" y="75" width="12" height="35" rx="5" fill="#94A3B8"/>
      <!-- Flag badge -->
      <rect x="35" y="80" width="12" height="8" fill="#EF4444"/>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#38BDF8">MAZE: ASTRONAUT'S PATH TO THE STAR</text>
  </svg>`,

  // Card 27: Treasure Island Map
  'card-27-treasure-island.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FEF3C7"/>
        <stop offset="100%" stop-color="#FDE68A"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="#0284C7" rx="32"/>
    <!-- Antique Parchment Island -->
    <path d="M 120 180 C 180 80 340 70 450 110 C 560 140 700 120 720 250 C 740 380 660 520 500 520 C 360 520 220 540 140 450 C 70 370 70 260 120 180 Z" fill="url(#parchment)" stroke="#B45309" stroke-width="6"/>
    
    <!-- Compass Rose at Top Right -->
    <g transform="translate(640, 160)">
      <circle cx="0" cy="0" r="45" fill="none" stroke="#B45309" stroke-width="3" stroke-dasharray="4 3"/>
      <polygon points="0,-45 10,-10 45,0 10,10 0,45 -10,10 -45,0 -10,-10" fill="#DC2626"/>
      <polygon points="0,-45 0,0 45,0" fill="#991B1B"/>
      <polygon points="0,45 0,0 -45,0" fill="#991B1B"/>
      <text x="0" y="-52" text-anchor="middle" font-family="serif" font-weight="bold" font-size="16" fill="#B45309">N</text>
    </g>

    <!-- Pirate Skull Rock -->
    <g transform="translate(240, 220)">
      <circle cx="30" cy="30" r="30" fill="#78350F" opacity="0.3"/>
      <path d="M 15 25 C 15 10 45 10 45 25 C 45 35 40 40 30 40 C 20 40 15 35 15 25 Z" fill="#FFF" stroke="#0A1D3D" stroke-width="3"/>
      <circle cx="24" cy="24" r="4" fill="#0A1D3D"/>
      <circle cx="36" cy="24" r="4" fill="#0A1D3D"/>
      <text x="30" y="55" text-anchor="middle" font-family="serif" font-size="12" font-weight="bold" fill="#78350F">SKULL COVE</text>
    </g>

    <!-- Palm Trees -->
    <g transform="translate(380, 200)">
      <path d="M 20 60 Q 30 20 40 0" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 40 0 Q 10 -20 0 -10 M 40 0 Q 50 -30 65 -15 M 40 0 Q 75 0 70 20" stroke="#15803D" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Dotted Trail leading to X -->
    <path d="M 200 360 C 260 420 340 340 420 380 C 480 410 520 340 540 370" fill="none" stroke="#DC2626" stroke-width="5" stroke-dasharray="10 8"/>
    
    <!-- Red X marks the spot! -->
    <g transform="translate(540, 370)">
      <line x1="-20" y1="-20" x2="20" y2="20" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      <line x1="20" y1="-20" x2="-20" y2="20" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
      <!-- Treasure Chest -->
      <rect x="25" y="-15" width="45" height="30" rx="6" fill="#F59E0B" stroke="#78350F" stroke-width="3"/>
      <circle cx="47" cy="0" r="4" fill="#FEF08A"/>
    </g>

    <!-- Sea Monster tentacles in water -->
    <path d="M 660 480 Q 690 420 720 470" stroke="#047857" stroke-width="6" fill="none" stroke-linecap="round"/>
    <text x="400" y="565" text-anchor="middle" font-family="serif" font-weight="900" font-size="22" fill="#FEF3C7" letter-spacing="2">TREASURE ISLAND: CARTOGRAPHY &amp; COMPASS</text>
  </svg>`,

  // Card 28: Map of My Neighbourhood
  'card-28-neighbourhood-map.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#E2E8F0" rx="32"/>
    <!-- Green parks and lawns -->
    <rect x="80" y="80" width="280" height="180" rx="16" fill="#86EFAC"/>
    <rect x="440" y="80" width="280" height="180" rx="16" fill="#BBF7D0"/>
    <rect x="80" y="340" width="280" height="180" rx="16" fill="#BBF7D0"/>
    <rect x="440" y="340" width="280" height="180" rx="16" fill="#86EFAC"/>
    
    <!-- Crossroads Asphalt Roads -->
    <rect x="0" y="260" width="800" height="80" fill="#475569"/>
    <rect x="360" y="0" width="80" height="600" fill="#475569"/>
    <!-- Yellow dashed road center lines -->
    <line x1="0" y1="300" x2="360" y2="300" stroke="#FDE047" stroke-width="5" stroke-dasharray="15 15"/>
    <line x1="440" y1="300" x2="800" y2="300" stroke="#FDE047" stroke-width="5" stroke-dasharray="15 15"/>
    <line x1="400" y1="0" x2="400" y2="260" stroke="#FDE047" stroke-width="5" stroke-dasharray="15 15"/>
    <line x1="400" y1="340" x2="400" y2="600" stroke="#FDE047" stroke-width="5" stroke-dasharray="15 15"/>
    
    <!-- Cute Red House (My Home) -->
    <g transform="translate(140, 110)">
      <rect x="20" y="40" width="80" height="60" fill="#F87171" stroke="#0A1D3D" stroke-width="4"/>
      <polygon points="10,40 60,0 110,40" fill="#DC2626" stroke="#0A1D3D" stroke-width="4"/>
      <rect x="45" y="65" width="20" height="35" fill="#FEF08A" stroke="#0A1D3D" stroke-width="3"/>
      <text x="60" y="125" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">MY HOME</text>
    </g>

    <!-- Schoolhouse with Bell Tower -->
    <g transform="translate(500, 100)">
      <rect x="20" y="50" width="110" height="70" fill="#60A5FA" stroke="#0A1D3D" stroke-width="4"/>
      <polygon points="10,50 75,10 140,50" fill="#2563EB" stroke="#0A1D3D" stroke-width="4"/>
      <rect x="60" y="85" width="30" height="35" fill="#FFFFFF"/>
      <text x="75" y="140" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">SCHOOL</text>
    </g>

    <!-- Playground Park with Slide -->
    <g transform="translate(160, 370)">
      <circle cx="50" cy="50" r="45" fill="#FEF08A"/>
      <path d="M 20 80 L 50 30 L 80 80" stroke="#F97316" stroke-width="6" fill="none"/>
      <text x="50" y="115" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">PLAYGROUND</text>
    </g>

    <!-- Bakery / Library -->
    <g transform="translate(520, 370)">
      <rect x="20" y="40" width="90" height="60" fill="#F472B6" stroke="#0A1D3D" stroke-width="4"/>
      <polygon points="10,40 65,10 120,40" fill="#DB2777" stroke="#0A1D3D" stroke-width="4"/>
      <text x="65" y="120" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">LIBRARY</text>
    </g>
    <text x="400" y="575" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#0A1D3D">MY NEIGHBOURHOOD: SPATIAL LANDMARKS</text>
  </svg>`,

  // Card 29: Feelings Faces
  'card-29-feelings-faces.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FFF1F2" rx="32"/>
    <!-- 4 Expressive Emotional Face Circles -->
    <!-- 1. Happy / Excited (Yellow) -->
    <g transform="translate(240, 180)">
      <circle cx="0" cy="0" r="75" fill="#FDE047" stroke="#CA8A04" stroke-width="6"/>
      <!-- Star Eyes -->
      <polygon points="-30,-15 -25,-5 -15,-5 -22,2 -18,12 -30,6 -42,12 -38,2 -45,-5 -35,-5" fill="#854D0E"/>
      <polygon points="30,-15 35,-5 45,-5 38,2 42,12 30,6 18,12 22,2 15,-5 25,-5" fill="#854D0E"/>
      <path d="M -35 25 Q 0 65 35 25 Z" fill="#E11D48"/>
      <path d="M -15 42 Q 0 35 15 42" fill="#FDA4AF"/>
      <text x="0" y="110" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#854D0E">EXCITED</text>
    </g>

    <!-- 2. Curious / Inquisitive (Blue) -->
    <g transform="translate(560, 180)">
      <circle cx="0" cy="0" r="75" fill="#93C5FD" stroke="#2563EB" stroke-width="6"/>
      <!-- One eye bigger than other -->
      <circle cx="-30" cy="-10" r="14" fill="#1E3A8A"/>
      <circle cx="-32" cy="-13" r="5" fill="#FFF"/>
      <circle cx="30" cy="-10" r="22" fill="#1E3A8A"/>
      <circle cx="28" cy="-14" r="7" fill="#FFF"/>
      <!-- Raised eyebrow -->
      <path d="M 12 -42 Q 30 -55 48 -42" stroke="#1E3A8A" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- O-shaped mouth -->
      <circle cx="0" cy="35" r="14" fill="#1E3A8A"/>
      <text x="0" y="110" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1E3A8A">CURIOUS</text>
    </g>

    <!-- 3. Proud / Confident (Green) -->
    <g transform="translate(240, 400)">
      <circle cx="0" cy="0" r="75" fill="#86EFAC" stroke="#16A34A" stroke-width="6"/>
      <!-- Happy squint eyes -->
      <path d="M -45 -10 Q -30 -25 -15 -10" stroke="#14532D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 15 -10 Q 30 -25 45 -10" stroke="#14532D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Big confident grin with rosy cheeks -->
      <path d="M -30 20 Q 0 45 30 20" stroke="#14532D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="-45" cy="15" r="10" fill="#F472B6" opacity="0.6"/>
      <circle cx="45" cy="15" r="10" fill="#F472B6" opacity="0.6"/>
      <text x="0" y="110" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#14532D">PROUD</text>
    </g>

    <!-- 4. Calm / Mindful (Lavender) -->
    <g transform="translate(560, 400)">
      <circle cx="0" cy="0" r="75" fill="#DDD6FE" stroke="#7C3AED" stroke-width="6"/>
      <!-- Peaceful sleeping curved eyes -->
      <path d="M -45 -5 Q -30 10 -15 -5" stroke="#5B21B6" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 15 -5 Q 30 10 45 -5" stroke="#5B21B6" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Gentle serene smile -->
      <path d="M -20 25 Q 0 38 20 25" stroke="#5B21B6" stroke-width="5" fill="none" stroke-linecap="round"/>
      <text x="0" y="110" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#5B21B6">CALM</text>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#E11D48">FEELINGS FACES: EMOTIONAL LITERACY</text>
  </svg>`,

  // Card 30: Postcard from Dream Holiday
  'card-30-dream-postcard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FEF3C7" rx="32"/>
    <!-- Postcard Paper with Airmail Border -->
    <rect x="70" y="50" width="660" height="480" rx="16" fill="#FFFFFF" stroke="#0A1D3D" stroke-width="5"/>
    <!-- Airmail striped top border -->
    <g transform="translate(70, 50)">
      <rect x="0" y="0" width="660" height="18" fill="#EF4444"/>
      <polygon points="0,0 20,0 10,18 0,18" fill="#3B82F6"/>
      <polygon points="40,0 60,0 50,18 30,18" fill="#3B82F6"/>
      <polygon points="80,0 100,0 90,18 70,18" fill="#3B82F6"/>
      <polygon points="120,0 140,0 130,18 110,18" fill="#3B82F6"/>
      <polygon points="160,0 180,0 170,18 150,18" fill="#3B82F6"/>
    </g>
    
    <!-- Dividing line down center -->
    <line x1="400" y1="80" x2="400" y2="500" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="8 6"/>
    
    <!-- Left Side: Dream Holiday Picture (Tropical Island with Rainbow) -->
    <g transform="translate(100, 100)">
      <rect x="0" y="0" width="270" height="230" rx="12" fill="#E0F2FE" stroke="#0A1D3D" stroke-width="4"/>
      <!-- Sun -->
      <circle cx="210" cy="50" r="28" fill="#FBBF24"/>
      <!-- Rainbow -->
      <path d="M 40 200 A 100 100 0 0 1 230 200" fill="none" stroke="#F43F5E" stroke-width="8"/>
      <path d="M 50 200 A 90 90 0 0 1 220 200" fill="none" stroke="#FBBF24" stroke-width="8"/>
      <path d="M 60 200 A 80 80 0 0 1 210 200" fill="none" stroke="#34D399" stroke-width="8"/>
      <path d="M 70 200 A 70 70 0 0 1 200 200" fill="none" stroke="#38BDF8" stroke-width="8"/>
      <!-- Tropical Island Sand -->
      <path d="M 0 190 Q 130 160 270 190 L 270 230 L 0 230 Z" fill="#FDE68A"/>
      <!-- Palm Tree -->
      <path d="M 120 190 Q 130 130 140 100" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 140 100 Q 100 80 80 100 M 140 100 Q 150 70 180 80 M 140 100 Q 180 110 170 130" stroke="#15803D" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Text Lines for handwritten message -->
      <line x1="10" y1="270" x2="260" y2="270" stroke="#94A3B8" stroke-width="2"/>
      <line x1="10" y1="310" x2="260" y2="310" stroke="#94A3B8" stroke-width="2"/>
      <line x1="10" y1="350" x2="260" y2="350" stroke="#94A3B8" stroke-width="2"/>
    </g>

    <!-- Right Side: Stamp & Address -->
    <g transform="translate(430, 90)">
      <!-- Postage Stamp -->
      <g transform="translate(190, 10)">
        <rect x="0" y="0" width="85" height="100" fill="#FEF08A" stroke="#B45309" stroke-width="3" stroke-dasharray="6 3"/>
        <circle cx="42" cy="45" r="26" fill="#F97316"/>
        <text x="42" y="52" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFF">AIR</text>
        <text x="42" y="85" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="11" fill="#78350F">ORION 2026</text>
      </g>
      <!-- Postmark wavy lines -->
      <circle cx="160" cy="60" r="30" fill="none" stroke="#475569" stroke-width="2"/>
      <path d="M 90 50 Q 120 40 150 50 Q 180 60 210 50" fill="none" stroke="#475569" stroke-width="2"/>
      <!-- Address Lines -->
      <line x1="30" y1="180" x2="250" y2="180" stroke="#64748B" stroke-width="3"/>
      <line x1="30" y1="230" x2="250" y2="230" stroke="#64748B" stroke-width="3"/>
      <line x1="30" y1="280" x2="250" y2="280" stroke="#64748B" stroke-width="3"/>
      <line x1="30" y1="330" x2="250" y2="330" stroke="#64748B" stroke-width="3"/>
      <text x="30" y="160" font-family="monospace" font-weight="bold" font-size="12" fill="#94A3B8">DELIVER TO:</text>
    </g>
    <text x="400" y="570" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#0A1D3D">POSTCARD FROM MY DREAM HOLIDAY</text>
  </svg>`,

  // Card 31: A Letter to Future Me
  'card-31-future-letter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#F0FDF4" rx="32"/>
    <!-- Time Capsule Cylinder & Memories -->
    <!-- Vintage Brass/Golden Time Capsule Vault -->
    <g transform="translate(400, 260)">
      <ellipse cx="0" cy="130" rx="160" ry="40" fill="#CA8A04"/>
      <rect x="-160" y="-30" width="320" height="160" fill="#EAB308" stroke="#A16207" stroke-width="6"/>
      <ellipse cx="0" cy="-30" rx="160" ry="40" fill="#FEF08A" stroke="#A16207" stroke-width="6"/>
      <!-- Metal bands & rivets -->
      <line x1="-160" y1="40" x2="160" y2="40" stroke="#A16207" stroke-width="5"/>
      <circle cx="-120" cy="40" r="5" fill="#713F12"/>
      <circle cx="-60" cy="40" r="5" fill="#713F12"/>
      <circle cx="0" cy="40" r="5" fill="#713F12"/>
      <circle cx="60" cy="40" r="5" fill="#713F12"/>
      <circle cx="120" cy="40" r="5" fill="#713F12"/>
      <text x="0" y="95" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="20" fill="#713F12" letter-spacing="4">TIME CAPSULE: 2035</text>
    </g>
    
    <!-- Rolled Parchment Scroll with Red Ribbon -->
    <g transform="translate(240, 150) rotate(-20)">
      <rect x="0" y="0" width="160" height="70" rx="12" fill="#FEF3C7" stroke="#B45309" stroke-width="4"/>
      <!-- Red Ribbon Tie -->
      <rect x="70" y="-4" width="20" height="78" fill="#EF4444"/>
      <circle cx="80" cy="35" r="10" fill="#DC2626"/>
    </g>

    <!-- Future Dreams: Graduation Cap & Stars -->
    <g transform="translate(560, 140)">
      <!-- Black Graduation Cap -->
      <polygon points="0,0 50,20 0,40 -50,20" fill="#0A1D3D"/>
      <rect x="-20" y="30" width="40" height="20" rx="5" fill="#0A1D3D"/>
      <!-- Yellow Tassel -->
      <line x1="0" y1="20" x2="35" y2="45" stroke="#FBBF24" stroke-width="4"/>
      <circle cx="35" cy="48" r="6" fill="#F59E0B"/>
    </g>

    <!-- Flying Golden Stars of Ambition -->
    <polygon points="160,340 167,358 185,358 171,370 176,388 160,378 144,388 149,370 135,358 153,358" fill="#FBBF24"/>
    <polygon points="630,340 637,358 655,358 641,370 646,388 630,378 614,388 619,370 605,358 623,358" fill="#FBBF24"/>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#059669">A LETTER TO FUTURE ME: TIME CAPSULE</text>
  </svg>`,

  // Card 32: Design a Book Cover
  'card-32-book-cover.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#EEF2FF" rx="32"/>
    <!-- Hardcover Book Frame -->
    <g transform="translate(250, 60)">
      <!-- Book spine shadow -->
      <rect x="-20" y="10" width="340" height="450" rx="16" fill="#1E1B4B" opacity="0.3"/>
      <!-- Book Cover -->
      <rect x="0" y="0" width="320" height="440" rx="16" fill="#4F46E5" stroke="#312E81" stroke-width="6"/>
      <!-- Gold Foil Border -->
      <rect x="18" y="18" width="284" height="404" rx="10" fill="none" stroke="#FBBF24" stroke-width="4"/>
      
      <!-- Book Title Banner -->
      <rect x="35" y="50" width="250" height="70" rx="8" fill="#FFFFFF"/>
      <text x="160" y="85" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#1E1B4B">THE SECRET OF</text>
      <text x="160" y="108" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="20" fill="#4F46E5">STAR MOUNTAIN</text>
      
      <!-- Central Fantasy Art: Glowing Key & Dragon Silhouette -->
      <circle cx="160" cy="240" r="70" fill="#312E81"/>
      <circle cx="160" cy="240" r="60" fill="#4338CA"/>
      <!-- Magical Golden Key -->
      <g transform="translate(160, 240)">
        <circle cx="0" cy="-30" r="16" fill="none" stroke="#FFD700" stroke-width="6"/>
        <line x1="0" y1="-14" x2="0" y2="35" stroke="#FFD700" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="15" x2="15" y2="15" stroke="#FFD700" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="30" x2="20" y2="30" stroke="#FFD700" stroke-width="6" stroke-linecap="round"/>
      </g>
      
      <!-- Author Ribbon Badge -->
      <rect x="60" y="360" width="200" height="35" rx="6" fill="#FBBF24"/>
      <text x="160" y="383" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#78350F">WRITTEN &amp; DRAWN BY ME</text>
    </g>
    <!-- Illustrator Pens flanking the book -->
    <g transform="translate(140, 280) rotate(-25)">
      <rect x="0" y="0" width="24" height="130" rx="6" fill="#EC4899" stroke="#0A1D3D" stroke-width="3"/>
      <polygon points="0,0 24,0 12,-25" fill="#BE185D"/>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#4338CA">DESIGN A BESTSELLER BOOK COVER</text>
  </svg>`,

  // Card 33: My Mini Story Book (Foldable)
  'card-33-mini-storybook.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FDF2F8" rx="32"/>
    <!-- Folded 8-Page Booklet Spread -->
    <g transform="translate(150, 100)">
      <!-- Left Page -->
      <path d="M 0 30 C 50 10 180 15 240 25 L 240 375 C 180 365 50 360 0 380 Z" fill="#FFFFFF" stroke="#EC4899" stroke-width="5"/>
      <!-- Right Page -->
      <path d="M 260 25 C 320 15 450 10 500 30 L 500 380 C 450 360 320 365 260 375 Z" fill="#FFFFFF" stroke="#EC4899" stroke-width="5"/>
      <!-- Center Book Binding Spine -->
      <rect x="240" y="22" width="20" height="355" fill="#DB2777"/>
      
      <!-- Chapter 1 (Left): Little Bear character sketch -->
      <text x="120" y="80" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#DB2777">CHAPTER 1: THE MAP</text>
      <circle cx="120" cy="160" r="40" fill="#FDE047" stroke="#0A1D3D" stroke-width="3"/>
      <circle cx="108" cy="155" r="5" fill="#0A1D3D"/>
      <circle cx="132" cy="155" r="5" fill="#0A1D3D"/>
      <path d="M 112 175 Q 120 185 128 175" stroke="#0A1D3D" stroke-width="3" fill="none"/>
      <!-- Hand-drawn story lines -->
      <line x1="40" y1="230" x2="200" y2="230" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="260" x2="200" y2="260" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="290" x2="180" y2="290" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>

      <!-- Chapter 2 (Right): Little Boat on sea -->
      <text x="380" y="80" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="16" fill="#DB2777">CHAPTER 2: VOYAGE</text>
      <!-- Origami Paper Boat -->
      <polygon points="340,180 420,180 400,205 360,205" fill="#38BDF8" stroke="#0A1D3D" stroke-width="3"/>
      <polygon points="380,120 380,180 415,180" fill="#EF4444"/>
      <!-- Sea waves -->
      <path d="M 320 215 Q 350 205 380 215 Q 410 225 440 215" stroke="#0284C7" stroke-width="3" fill="none"/>
      <line x1="300" y1="260" x2="460" y2="260" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <line x1="300" y1="290" x2="460" y2="290" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <line x1="300" y1="320" x2="430" y2="320" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
    </g>
    <!-- Origami Scissors icon -->
    <g transform="translate(100, 120)">
      <circle cx="20" cy="20" r="12" fill="none" stroke="#DB2777" stroke-width="4"/>
      <circle cx="45" cy="20" r="12" fill="none" stroke="#DB2777" stroke-width="4"/>
      <line x1="28" y1="28" x2="55" y2="65" stroke="#DB2777" stroke-width="4"/>
      <line x1="38" y1="28" x2="15" y2="65" stroke="#DB2777" stroke-width="4"/>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#DB2777">MY MINI STORY BOOK: 8-PAGE FOLDABLE</text>
  </svg>`,

  // Card 34: Grown-Up Interview
  'card-34-grownup-interview.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FEF3C7" rx="32"/>
    <!-- Grandparent and Kid Interview scene -->
    <!-- Vintage Microphone in center -->
    <g transform="translate(400, 260)">
      <rect x="-18" y="-40" width="36" height="70" rx="18" fill="#94A3B8" stroke="#0A1D3D" stroke-width="4"/>
      <line x1="-12" y1="-20" x2="12" y2="-20" stroke="#0A1D3D" stroke-width="2"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#0A1D3D" stroke-width="2"/>
      <!-- Mic stand -->
      <path d="M -25 0 C -25 35 25 35 25 0" fill="none" stroke="#0A1D3D" stroke-width="4"/>
      <line x1="0" y1="35" x2="0" y2="80" stroke="#0A1D3D" stroke-width="6"/>
      <ellipse cx="0" cy="85" rx="35" ry="12" fill="#0A1D3D"/>
      <!-- Audio waves -->
      <path d="M -45 -10 A 30 30 0 0 0 -45 30" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
      <path d="M 45 -10 A 30 30 0 0 1 45 30" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- Kid Journalist on Left (with reporter press badge) -->
    <g transform="translate(180, 220)">
      <circle cx="50" cy="50" r="45" fill="#FDE047" stroke="#0A1D3D" stroke-width="4"/>
      <!-- Eyes & big eager smile -->
      <circle cx="38" cy="45" r="5" fill="#0A1D3D"/>
      <circle cx="62" cy="45" r="5" fill="#0A1D3D"/>
      <path d="M 42 62 Q 50 72 58 62" stroke="#0A1D3D" stroke-width="3" fill="none"/>
      <!-- Reporter Notepad -->
      <rect x="25" y="110" width="55" height="70" rx="6" fill="#FFFFFF" stroke="#0A1D3D" stroke-width="3"/>
      <line x1="35" y1="130" x2="70" y2="130" stroke="#0284C7" stroke-width="2"/>
      <line x1="35" y1="145" x2="70" y2="145" stroke="#0284C7" stroke-width="2"/>
      <line x1="35" y1="160" x2="60" y2="160" stroke="#0284C7" stroke-width="2"/>
      <text x="50" y="200" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">KID REPORTER</text>
    </g>

    <!-- Smiling Grandparent on Right -->
    <g transform="translate(520, 210)">
      <circle cx="50" cy="55" r="48" fill="#FED7AA" stroke="#0A1D3D" stroke-width="4"/>
      <!-- Kind Glasses -->
      <circle cx="35" cy="52" r="15" fill="none" stroke="#78350F" stroke-width="3"/>
      <circle cx="65" cy="52" r="15" fill="none" stroke="#78350F" stroke-width="3"/>
      <line x1="50" y1="52" x2="50" y2="52" stroke="#78350F" stroke-width="3"/>
      <circle cx="35" cy="52" r="4" fill="#0A1D3D"/>
      <circle cx="65" cy="52" r="4" fill="#0A1D3D"/>
      <path d="M 40 78 Q 50 88 60 78" stroke="#0A1D3D" stroke-width="3" fill="none"/>
      <!-- White fluffy hair -->
      <circle cx="20" cy="25" r="18" fill="#F1F5F9"/>
      <circle cx="50" cy="15" r="20" fill="#F1F5F9"/>
      <circle cx="80" cy="25" r="18" fill="#F1F5F9"/>
      <text x="50" y="210" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#0A1D3D">FAMILY STORIES</text>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#D97706">GROWN-UP INTERVIEW: ORAL INQUIRY</text>
  </svg>`,

  // Card 35: Look and Sketch
  'card-35-look-sketch.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#F0FDFA" rx="32"/>
    <!-- Artist Still Life Setup -->
    <!-- Sketchbook on desk -->
    <g transform="translate(140, 120)">
      <rect x="0" y="0" width="300" height="360" rx="16" fill="#FFFFFF" stroke="#0D9488" stroke-width="5"/>
      <!-- Spiral binder rings on left -->
      ${Array.from({length: 8}).map((_, i) => `
        <ellipse cx="0" cy="${40 + i * 40}" rx="12" ry="8" fill="#94A3B8" stroke="#0A1D3D" stroke-width="2"/>
      `).join('')}
      <!-- Sketch of a red apple on the page -->
      <circle cx="150" cy="180" r="55" fill="#EF4444" stroke="#0A1D3D" stroke-width="3"/>
      <path d="M 150 125 Q 160 100 170 95" stroke="#78350F" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="170" cy="105" rx="14" ry="7" fill="#22C55E" transform="rotate(-30 170 105)"/>
      <text x="150" y="280" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#0D9488">SKETCH #35: APPLE</text>
    </g>

    <!-- Real Still Life Objects on Right -->
    <g transform="translate(480, 160)">
      <!-- Real Apple with wooden coaster -->
      <ellipse cx="100" cy="190" rx="70" ry="25" fill="#CBD5E1"/>
      <circle cx="100" cy="150" r="50" fill="#DC2626"/>
      <circle cx="85" cy="135" r="10" fill="#F87171" opacity="0.6"/>
      
      <!-- Magnifying Glass for Observation! -->
      <g transform="translate(130, 200) rotate(45)">
        <circle cx="0" cy="0" r="45" fill="#E0F2FE" stroke="#0A1D3D" stroke-width="6" opacity="0.8"/>
        <!-- Handle -->
        <rect x="-8" y="45" width="16" height="70" rx="6" fill="#F59E0B" stroke="#0A1D3D" stroke-width="3"/>
        <line x1="-20" y1="-20" x2="20" y2="20" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#0D9488">LOOK &amp; SKETCH: OBSERVATIONAL ART</text>
  </svg>`,

  // Card 36: My Perfect Weekend
  'card-36-perfect-weekend.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <rect width="800" height="600" fill="#FAF5FF" rx="32"/>
    <!-- Weekend Schedule Calendar Board -->
    <g transform="translate(100, 70)">
      <rect x="0" y="0" width="600" height="440" rx="20" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="6"/>
      <!-- Header Bar: SATURDAY & SUNDAY -->
      <rect x="0" y="0" width="600" height="65" rx="16" fill="#8B5CF6"/>
      <text x="300" y="42" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="24" fill="#FFFFFF" letter-spacing="3">MY PERFECT WEEKEND</text>
      
      <!-- 4 Weekend Adventure Blocks -->
      <!-- 1. Morning Bike Ride -->
      <g transform="translate(30, 90)">
        <rect x="0" y="0" width="255" height="150" rx="12" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3"/>
        <circle cx="60" cy="100" r="22" fill="none" stroke="#0A1D3D" stroke-width="4"/>
        <circle cx="120" cy="100" r="22" fill="none" stroke="#0A1D3D" stroke-width="4"/>
        <polygon points="60,100 90,65 120,100" fill="none" stroke="#EF4444" stroke-width="4"/>
        <text x="170" y="65" font-family="sans-serif" font-weight="900" font-size="15" fill="#92400E">MORNING</text>
        <text x="170" y="88" font-family="sans-serif" font-weight="bold" font-size="13" fill="#B45309">Park Bicycle</text>
      </g>

      <!-- 2. Creative Art Time -->
      <g transform="translate(315, 90)">
        <rect x="0" y="0" width="255" height="150" rx="12" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/>
        <!-- Art Palette with 4 paint dollops -->
        <ellipse cx="80" cy="75" rx="40" ry="30" fill="#F8FAFC" stroke="#0A1D3D" stroke-width="3"/>
        <circle cx="60" cy="65" r="6" fill="#EF4444"/>
        <circle cx="75" cy="58" r="6" fill="#F59E0B"/>
        <circle cx="95" cy="65" r="6" fill="#10B981"/>
        <circle cx="90" cy="85" r="6" fill="#3B82F6"/>
        <text x="155" y="65" font-family="sans-serif" font-weight="900" font-size="15" fill="#0369A1">AFTERNOON</text>
        <text x="155" y="88" font-family="sans-serif" font-weight="bold" font-size="13" fill="#0284C7">Painting &amp; Craft</text>
      </g>

      <!-- 3. Family Picnic & Treats -->
      <g transform="translate(30, 265)">
        <rect x="0" y="0" width="255" height="150" rx="12" fill="#DCFCE7" stroke="#16A34A" stroke-width="3"/>
        <!-- Picnic Basket -->
        <rect x="50" y="65" width="60" height="40" rx="6" fill="#B45309"/>
        <path d="M 60 65 Q 80 40 100 65" fill="none" stroke="#78350F" stroke-width="4"/>
        <text x="145" y="65" font-family="sans-serif" font-weight="900" font-size="15" fill="#166534">FAMILY TIME</text>
        <text x="145" y="88" font-family="sans-serif" font-weight="bold" font-size="13" fill="#15803D">Sunny Picnic</text>
      </g>

      <!-- 4. Stargazing & Storybook Night -->
      <g transform="translate(315, 265)">
        <rect x="0" y="0" width="255" height="150" rx="12" fill="#EDE9FE" stroke="#7C3AED" stroke-width="3"/>
        <!-- Crescent Moon & Stars -->
        <path d="M 70 50 A 25 25 0 0 0 95 75 A 28 28 0 1 1 70 50 Z" fill="#FBBF24"/>
        <circle cx="115" cy="55" r="3" fill="#7C3AED"/>
        <circle cx="60" cy="85" r="3" fill="#7C3AED"/>
        <text x="145" y="65" font-family="sans-serif" font-weight="900" font-size="15" fill="#5B21B6">EVENING</text>
        <text x="145" y="88" font-family="sans-serif" font-weight="bold" font-size="13" fill="#6D28D9">Bedtime Story</text>
      </g>
    </g>
    <text x="400" y="565" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="22" fill="#7C3AED">WEEKEND PLANNER: TIME &amp; GOAL SETTING</text>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  const filePath = path.join(destDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Created:', filename);
}

console.log('Successfully created all concept-specific SVGs!');
