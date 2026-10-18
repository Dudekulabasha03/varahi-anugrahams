export interface ProjectContact {
  promoter: string;
  firm: string;
  address: string;
  pincode: string;
  town: string;
  phones: string[];
  whatsapp: string;
  email: string;
  officeHours: string;
}

export interface Amenity {
  id: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  image: string;
  features: string[];
}

export interface FloorPlanDetail {
  id: "ground" | "first";
  name: string;
  title: string;
  sqft: string;
  highlights: string[];
  image: string;
  fullOverviewImage?: string;
  rooms: {
    name: string;
    description: string;
    tourSceneId?: string;
  }[];
}

export interface TourRoom {
  id: string;
  name: string;
  floor: "Ground Floor" | "First Floor" | "Terrace Level";
  headline: string;
  description: string;
  architecturalHighlights: string[];
  dimensions?: string;
  image: string;
  panoramaImage?: string;
  hotspots?: {
    label: string;
    targetRoomId: string;
    position: { x: number; y: number };
  }[];
}

export const PROJECT_CONFIG = {
  brand: {
    name: "VARAHI ANUGRAHAMS",
    tagline: "A Gated Community",
    subheading: "BRINGING NATURE TO EVERY HOME",
    blessing: "శ్రీ ఆలూరు కోన రంగనాథస్వామి ప్రసన్నం",
    blessingSubtitle: "Sri Aluru Kona Ranganatha Swamy Blessings",
    pillars: ["Peace", "Prosperity", "Togetherness"],
    description:
      "A serene sanctuary crafted with timeless architectural elegance, lush biophilic landscaping, and contemporary luxury. Built for families who appreciate fine craftsmanship, expansive greenery, and mindful living.",
    location: "R.F. Road, Tadipatri — 515411",
  },

  specs: {
    plotSize: "23 ft × 47 ft Individual Villa Plot",
    roadWidth: "30 FT Wide Central Avenue Road",
    villaType: "Signature 3-Level Luxury Contemporary Villa",
    structure: "Ground Floor + First Floor + Rooftop Sky Terrace",
    bedrooms: "2 BHK: Master Bedroom (GF) + Master Bedroom & Child Room (FF)",
    amenitiesCount: "Premium Lifestyle Amenities & Private Terrace",
    greenCover: "Biophilic Landscaped Balconies & Terraces",
    terraceSize: "23 ft × 30 ft Private Rooftop Terrace Garden",
  },

  contact: {
    promoter: "RANGAIAH KOTRA",
    firm: "Sri Murali Cotton Press",
    address: "R.F. Road, Tadipatri",
    pincode: "515411",
    town: "Tadipatri, Andhra Pradesh",
    phones: ["9492854666", "8328144746"],
    whatsapp: "919492854666",
    email: "enquiry@varahianugrahams.com",
    officeHours: "9:00 AM – 7:30 PM (All Days)",
  } as ProjectContact,

  amenities: [
    {
      id: "pergola",
      title: "Pergola To Spend Happy Evenings",
      tagline: "Private Outdoor Living Lounge",
      badge: "Optional / Included on Terrace",
      description:
        "Handcrafted timber pergola integrated with lush vertical greenery and comfortable resort-grade seating designed to host friends and unwind during tranquil golden hours.",
      image: "/assets/terrace/terrace-garden-panel.jpg",
      features: [
        "Weatherproof treated timber structure",
        "Concealed warm mood lighting",
        "Resort lounge seating space",
        "Surrounded by potted succulents & planters",
      ],
    },
    {
      id: "anti-termite",
      title: "Anti-Termite Reticulation Piping System",
      tagline: "Structural Foundation Defense",
      badge: "Base Level Construction",
      description:
        "Every single home (23 ft × 47 ft plot) is equipped with a precision-engineered anti-termite reticulation piping system with brick supports, built into the foundation soil for permanent structural longevity and hassle-free protection.",
      image: "/assets/amenities/anti-termite-piping.jpg",
      features: [
        "Full 23 ft × 47 ft grid reticulation network",
        "Pipe with brick support at every junction",
        "Easy exterior recharge valve points",
        "Zero drilling or disruption to interior flooring",
        "Long-term structural peace of mind",
      ],
    },
    {
      id: "moonlight-bedroom",
      title: "Cooled Moonlight Terrace Bedroom",
      tagline: "Starlit Retreat",
      badge: "Optional Feature",
      description:
        "An exclusive elevated bedroom sanctuary opening out to starlit night skies and gentle cool breezes, designed to beat the summer heat and offer unmatched serenity under the moonlight.",
      image: "/assets/amenities/attractive-facilities-panel.jpg",
      features: [
        "Floor-to-ceiling panoramic glass facade",
        "Unobstructed starry sky vistas",
        "Cross-ventilation thermal cooling design",
        "Direct access to 23x30 ft open sky terrace",
      ],
    },
    {
      id: "avenue-security",
      title: "30 FT Central Avenue & 24/7 Security",
      tagline: "Grand Community Living",
      badge: "Infrastructure",
      description:
        "Expansive 30-foot paved central boulevard framed by Royal Palms, architectural bollard luminaires, and an imposing entry portal secured with round-the-clock CCTV and gate monitoring.",
      image: "/assets/streets/tree-lined-streets-day-panel.jpg",
      features: [
        "30 FT wide heavy-duty paved roadway",
        "Aesthetic underground electrical cabling",
        "Continuous pedestrian curb landscaping",
        "Grand V-Emblem illuminated entrance portal",
      ],
    },
  ] as Amenity[],

  floorPlans: [
    {
      id: "ground",
      name: "Ground Floor Plan",
      title: "Parking, Living, Kitchen, Dining & Master Bedroom",
      sqft: "23 ft × 47 ft Plot (West Road Facing)",
      image: "/assets/floorplans/ground-floor-3d.jpg",
      fullOverviewImage: "/assets/floorplans/smart-floor-plans-panel.jpg",
      highlights: [
        "Covered Car Parking with Gate (West Road)",
        "Formal Living Room — 10'-1½\" × 7'-0\"",
        "Main Living Hall — 16'-1½\" × 12'-3\"",
        "Dedicated Sacred Pooja Room — 4'-0\" × 6'-0\"",
        "Dining Area — 9'-4\" × 13'-0\"",
        "Kitchen — 8'-0\" × 6'-1½\" with Utility — 9'-0\" × 4'-0\"",
        "Master Bedroom — 14'-0\" × 16'-4½\" with Attached Toilet — 9'-0\" × 7'-0\"",
        "Private Residential Elevator (Lift) — 4'-6\" × 4'-6\"",
      ],
      rooms: [
        { name: "Parking & Gate", description: "Covered car parking with gate facing West Road", tourSceneId: "porch" },
        { name: "Formal Living", description: "10'-1½\" × 7'-0\" — Cozy formal sitting area at the entrance", tourSceneId: "foyer" },
        { name: "Living Hall", description: "16'-1½\" × 12'-3\" — Spacious main living area", tourSceneId: "living" },
        { name: "Dining", description: "9'-4\" × 13'-0\" — Open dining adjacent to kitchen", tourSceneId: "dining" },
        { name: "Kitchen & Utility", description: "Kitchen 8'-0\" × 6'-1½\" with Utility 9'-0\" × 4'-0\"", tourSceneId: "kitchen" },
        { name: "Pooja Room", description: "4'-0\" × 6'-0\" — Dedicated sacred prayer room", tourSceneId: "pooja" },
        { name: "Master Bedroom", description: "14'-0\" × 16'-4½\" — Ground floor master suite", tourSceneId: "master" },
        { name: "Toilet (Ground)", description: "9'-0\" × 7'-0\" — Attached toilet for master bedroom", tourSceneId: "bath" },
        { name: "Lift", description: "4'-6\" × 4'-6\" — Private residential elevator connecting all levels" },
      ],
    },
    {
      id: "first",
      name: "First Floor Plan",
      title: "Master Bedroom, Child Room, Lounge & Balcony",
      sqft: "23 ft × 47 ft Plot (First Floor)",
      image: "/assets/floorplans/first-floor-3d.jpg",
      fullOverviewImage: "/assets/floorplans/smart-floor-plans-panel.jpg",
      highlights: [
        "Master Bedroom — 13'-0\" × 20'-0\" with Dressing — 5'-0\" × 4'-1½\"",
        "Attached Toilet — 6'-0\" × 18'-0\" (Ensuite Bath)",
        "Child Room — 13'-0\" × 13'-0\" with Attached Toilet — 6'-6\" × 4'-0\"",
        "Dressing Room — 6'-6\" × 7'-½\"",
        "Family Lounge — 16'-1½\" × 10'-3\"",
        "Balcony — 6'-0\" × 17'-0\"",
        "Private Residential Elevator (Lift) — 4'-6\" × 4'-6\"",
      ],
      rooms: [
        { name: "Master Bedroom", description: "13'-0\" × 20'-0\" — Expansive primary suite", tourSceneId: "master" },
        { name: "Master Dressing", description: "5'-0\" × 4'-1½\" — Walk-in dressing area", tourSceneId: "master" },
        { name: "Master Toilet", description: "6'-0\" × 18'-0\" — Spacious ensuite bathroom", tourSceneId: "bath" },
        { name: "Child Room", description: "13'-0\" × 13'-0\" — Dedicated children's bedroom", tourSceneId: "bed-two" },
        { name: "Child Room Toilet", description: "6'-6\" × 4'-0\" — Attached toilet for child room" },
        { name: "Dressing Room", description: "6'-6\" × 7'-½\" — Additional dressing/wardrobe room" },
        { name: "Family Lounge", description: "16'-1½\" × 10'-3\" — Upper-level family relaxation lounge", tourSceneId: "living" },
        { name: "Balcony", description: "6'-0\" × 17'-0\" — Private front-facing balcony", tourSceneId: "balcony" },
        { name: "Lift", description: "4'-6\" × 4'-6\" — Private residential elevator" },
      ],
    },
  ] as FloorPlanDetail[],

  tourRooms: [
    {
      id: "porch",
      name: "Car Porch & Front Entrance",
      floor: "Ground Floor",
      headline: "The Grand Arrival",
      description:
        "The journey begins at the sculptured ground-floor entry. A clean arched car porch accommodates premium vehicles under warm recessed illumination, framed by architectural agaves and the signature porthole window.",
      architecturalHighlights: [
        "Curved concrete archway with recessed LED strip glow",
        "Circular architectural porthole window looking into the foyer",
        "Solid teak entrance portal with black metal slatted gate",
        "Textured stone facade with bronze wall sconces",
      ],
      image: "/assets/exterior/signature-villa-facade.jpg",
      hotspots: [
        { label: "Enter Foyer", targetRoomId: "foyer", position: { x: 30, y: 70 } },
        { label: "View Facade", targetRoomId: "balcony", position: { x: 40, y: 35 } },
      ],
    },
    {
      id: "foyer",
      name: "Entrance Foyer",
      floor: "Ground Floor",
      headline: "Warm Threshold & Welcome",
      description:
        "Step through the teak pivot door into an inviting foyer paved in warm travertine stone, lit by champagne gold accents and featuring a glimpse of the serene pooja sanctum.",
      architecturalHighlights: [
        "Travertine stone tile flooring with brass inlays",
        "Bespoke console with warm backlighting",
        "Architectural porthole window streaming filtered sunlight",
        "Direct sightline into the double-height living pavilion",
      ],
      image: "/assets/interiors/foyer.jpg",
      hotspots: [
        { label: "Living Room", targetRoomId: "living", position: { x: 65, y: 55 } },
        { label: "Pooja Room", targetRoomId: "pooja", position: { x: 25, y: 50 } },
      ],
    },
    {
      id: "living",
      name: "Double-Height Living Room",
      floor: "Ground Floor",
      headline: "Architecture of Light and Volume",
      description:
        "The centerpiece of the home. Soaring ceilings, vertical fluted timber wall panels, and expansive floor-to-ceiling glazing capture gentle ambient daylight while maintaining complete family privacy.",
      architecturalHighlights: [
        "Double-height ceiling with custom brass ring pendant luminaire",
        "Fluted timber accent paneling echoing the exterior fins",
        "Plush low-slung seating in organic linen and warm leather",
        "Seamless visual link to the central landscape courtyard",
      ],
      image: "/assets/interiors/living-room.jpg",
      hotspots: [
        { label: "Dining Area", targetRoomId: "dining", position: { x: 75, y: 55 } },
        { label: "Elevator & Stairs", targetRoomId: "master", position: { x: 20, y: 40 } },
      ],
    },
    {
      id: "dining",
      name: "Fine Dining Lounge",
      floor: "Ground Floor",
      headline: "Togetherness Over Banquets",
      description:
        "A dedicated 8-seater dining space with custom marble tabletop, framed by soft mood lighting and direct access to both the open-plan gourmet kitchen and internal greenery.",
      architecturalHighlights: [
        "Monolithic Calacatta gold marble dining table",
        "Champagne gold suspended linear lighting fixture",
        "Sliding glass panels opening to the sit-out garden",
        "Open dialogue with the breakfast counter and kitchen",
      ],
      image: "/assets/interiors/dining.jpg",
      hotspots: [
        { label: "Kitchen", targetRoomId: "kitchen", position: { x: 78, y: 52 } },
        { label: "Living Room", targetRoomId: "living", position: { x: 25, y: 55 } },
      ],
    },
    {
      id: "kitchen",
      name: "Gourmet Modular Kitchen",
      floor: "Ground Floor",
      headline: "Culinary Precision & Elegance",
      description:
        "Ergonomically planned modular kitchen featuring seamless handle-less cabinetry, quartz countertops, built-in German appliances, and an adjoining private utility space.",
      architecturalHighlights: [
        "Matte forest green & brushed brass cabinetry finish",
        "Durable quartz stone waterfall island and worktops",
        "Concealed anti-fingerprint storage with Blum fittings",
        "Dedicated utility and washing yard with anti-termite piping",
      ],
      image: "/assets/interiors/kitchen.jpg",
      hotspots: [
        { label: "Dining Area", targetRoomId: "dining", position: { x: 25, y: 55 } },
        { label: "Pooja Room", targetRoomId: "pooja", position: { x: 80, y: 50 } },
      ],
    },
    {
      id: "pooja",
      name: "Sacred Pooja Mandir",
      floor: "Ground Floor",
      headline: "Sanctuary of Devotion",
      description:
        "Blessed by Sri Aluru Kona Ranganatha Swamy, the dedicated pooja sanctum is positioned with perfect Vaastu orientation, carved brass jaali screens, and pure white Makrana marble sanctum base.",
      architecturalHighlights: [
        "Makrana marble pedestal with brass lotus iconography",
        "Intricate CNC brass jaali doors filtering soft temple glow",
        "Integrated brass bell hanging points & traditional diya alcoves",
        "Acoustically peaceful zone filled with tranquility",
      ],
      image: "/assets/interiors/pooja.jpg",
      hotspots: [
        { label: "Living Room", targetRoomId: "living", position: { x: 30, y: 55 } },
        { label: "Foyer", targetRoomId: "foyer", position: { x: 70, y: 55 } },
      ],
    },
    {
      id: "master",
      name: "Primary Master Suite",
      floor: "First Floor",
      headline: "The Curved Private Haven",
      description:
        "Located on the first floor behind the signature curved facade. Features panoramic corner glazing, warm herringbone hardwood floors, and direct access to the landscaped balcony.",
      architecturalHighlights: [
        "Curved architectural bay window with automated privacy sheers",
        "Natural white oak herringbone timber flooring",
        "Integrated reading nook overlooking the community palms",
        "Direct passage to walk-in dressing and spa ensuite",
      ],
      image: "/assets/interiors/master-bedroom.jpg",
      hotspots: [
        { label: "Master Bath", targetRoomId: "bath", position: { x: 82, y: 55 } },
        { label: "Garden Balcony", targetRoomId: "balcony", position: { x: 20, y: 50 } },
        { label: "Terrace Garden", targetRoomId: "terrace", position: { x: 50, y: 25 } },
      ],
    },
    {
      id: "bath",
      name: "Spa Ensuite Bathroom",
      floor: "First Floor",
      headline: "Private Wellness Retreat",
      description:
        "Draped in bookmatched stone tiles, featuring a freestanding soaking tub, ceiling rain shower, wall-hung sanitaryware, and warm backlit mirrors.",
      architecturalHighlights: [
        "Freestanding stone bathtub with floor-mounted brass spout",
        "Walk-in frameless glass rain shower with concealed thermostatic mixer",
        "Custom oak double vanity with brushed champagne gold hardware",
        "Lush frosted window overlooking private bamboo greenery",
      ],
      image: "/assets/interiors/bathroom.jpg",
      hotspots: [
        { label: "Master Suite", targetRoomId: "master", position: { x: 25, y: 55 } },
      ],
    },
    {
      id: "balcony",
      name: "Landscaped Balcony",
      floor: "First Floor",
      headline: "Living with Nature",
      description:
        "The iconic curved cantilevered balcony seen on the front facade. Integrated planter boxes with cascading greenery, vertical timber fins for shaded privacy, and views over the 30 FT avenue.",
      architecturalHighlights: [
        "Curved solid stone balustrade with built-in drip irrigation",
        "Vertical architectural timber fins filtering western sunset light",
        "Weatherproof wood-composite decking",
        "Unobstructed views down the palm-lined central avenue",
      ],
      image: "/assets/exterior/signature-villa-facade.jpg",
      hotspots: [
        { label: "Master Suite", targetRoomId: "master", position: { x: 30, y: 50 } },
        { label: "Terrace Garden", targetRoomId: "terrace", position: { x: 75, y: 25 } },
      ],
    },
    {
      id: "terrace",
      name: "23 x 30 FT Rooftop Terrace & Pergola",
      floor: "Terrace Level",
      headline: "Under the Open Sky",
      description:
        "The crowning glory of Varahi Anugrahams. An expansive 690 sq. ft. private outdoor terrace with an architectural timber pergola, lush green grass lawn, soothing water fountain, and panoramic vistas.",
      architecturalHighlights: [
        "Spacious 23 ft. x 30 ft. private rooftop footprint",
        "Weatherproof timber pergola with ambient night illumination",
        "Natural soft grass turf lawn and stone paving walkways",
        "Cascading stone water fountain creating relaxing acoustic atmosphere",
        "Option for Cooled Moonlight Terrace Bedroom to beat summer nights",
      ],
      image: "/assets/terrace/terrace-garden-panel.jpg",
      hotspots: [
        { label: "Balcony", targetRoomId: "balcony", position: { x: 30, y: 70 } },
        { label: "Ground Entrance", targetRoomId: "porch", position: { x: 70, y: 70 } },
      ],
    },
  ] as TourRoom[],
};
