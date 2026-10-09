"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Clock,
  Copy,
  ExternalLink,
  Film,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Palette,
  Phone,
  Send,
  SlidersHorizontal,
  Sparkles,
  Star,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

const portfolioCategories = [
  "All",
  "Video Editing",
  "Photography",
] as const;
type PortfolioCategory = (typeof portfolioCategories)[number];

interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  client: string;
  image: string;
  description: string;
  story: string;
  tools: string[];
  year: string;
  featured?: boolean;
}

interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
  accent: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatar: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Monsoon Stories",
    category: "Photography",
    client: "Verve Editorial",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Editorial portrait series capturing motion, texture, and raw emotion in monsoon rain.",
    story:
      "Shot on location during Mumbai monsoons using high-speed prime lenses to preserve natural raindrops and moody dusk tones without artificial flash distortion.",
    tools: ["Sony A7 IV", "50mm f/1.2 GM", "Lightroom Classic"],
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Urban Pulse",
    category: "Video Editing",
    client: "Soundscape Records",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    description:
      "High-octane music video edit designed for immersive storytelling and dynamic pacing.",
    story:
      "Over 8 hours of multi-cam concert and street footage distilled into a 3-minute visual rush with custom speed ramps, kinetic typography, and synchronized sound design.",
    tools: ["Adobe Premiere Pro", "After Effects", "Film Convert Nitrate"],
    year: "2025",
    featured: true,
  },
  {
    id: 3,
    title: "Golden Hour Frames",
    category: "Photography",
    client: "Komorebi Lifestyle",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cinematic lifestyle portrait session centered on warm natural backlighting and depth.",
    story:
      "Captured purely during sunset window across coastal backdrops with soft contrast framing and organic color rendering.",
    tools: ["Sony FX3", "85mm f/1.4 GM", "Capture One"],
    year: "2024",
  },
  {
    id: 4,
    title: "Aura Chrono — Commercial",
    category: "Video Editing",
    client: "Aura Timepieces",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    description:
      "Luxury watch commercial cut highlighting macro textures, precision gear motion, and light play.",
    story:
      "Combining macro camera passes with 3D product integration, bespoke sound Foley, and subtle color grading to convey craftsmanship and timeless luxury.",
    tools: ["DaVinci Resolve Studio", "Sony FX3", "24-70mm f/2.8 GM"],
    year: "2024",
    featured: true,
  },
  {
    id: 5,
    title: "Midnight Tokyo — Visual Cut",
    category: "Video Editing",
    client: "NeoFilm Studio",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    description:
      "Neon noir cinematic cut with balanced pacing under high-contrast cyberpunk lighting.",
    story:
      "Indie short film sequence cut with speed shifts, ACES color space, and selective hue isolation for vivid neon reflections.",
    tools: ["DaVinci Resolve Studio", "Premiere Pro", "Colorist Panel"],
    year: "2025",
  },
  {
    id: 6,
    title: "Everyday Rituals",
    category: "Photography",
    client: "Heritage Crafts Guild",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
    description:
      "Documentary portrait series built around artisan patience, workshop mood, and human detail.",
    story:
      "An observational visual essay following traditional textile dyers and potters, showcasing candid human moments in natural ambient window light.",
    tools: ["Sony A7 IV", "35mm f/1.4 GM", "Photoshop"],
    year: "2024",
  },
  {
    id: 7,
    title: "Velocity Trail — Automotive Cut",
    category: "Video Editing",
    client: "Apex Drive",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Fast-paced automotive commercial edit with heavy sound design and rhythmic track cuts.",
    story:
      "Synchronized engine revs, gear shifts, and exhaust pops with sub-bass audio hits to create visceral spectator excitement.",
    tools: ["Premiere Pro", "DaVinci Resolve", "iZotope RX"],
    year: "2025",
  },
  {
    id: 8,
    title: "Silk & Shadow — Fashion Portraits",
    category: "Photography",
    client: "Maison Blanc",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    description:
      "Editorial fashion portrait session emphasizing smooth skin roll-off and atmospheric highlights.",
    story:
      "Preserving silk fabric texture while lifting muted shadows for a high-end European magazine aesthetic.",
    tools: ["Sony A7 IV", "85mm f/1.4 GM", "Lightroom Classic"],
    year: "2024",
  },
  {
    id: 9,
    title: "Reverb Sound Session",
    category: "Video Editing",
    client: "Indie Beats Festival",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    description:
      "Festival documentary trailer featuring energetic crowd reaction shots and stage performance lighting.",
    story:
      "Multi-angle event highlights delivered within 48 hours for immediate social marketing and sponsor recap reports.",
    tools: ["Sony FX3", "Premiere Pro", "DJI RS 3 Pro"],
    year: "2025",
  },
];

const services: ServiceItem[] = [
  {
    title: "Video Editing & Post-Production",
    subtitle: "Rhythmic pacing, narrative architecture & audio polish",
    description:
      "From YouTube long-form and high-conversion Instagram reels to brand trailers and music videos, I transform raw footage into captivating visual stories that retain audience attention.",
    deliverables: [
      "Dynamic narrative pacing & rough-to-fine cut",
      "Seamless sound design, Foley & SFX mixing",
      "Custom motion titles & subtle kinetic typography",
      "Multi-format exports (16:9, 9:16, 1:1, 4:5 4K)",
    ],
    icon: Clapperboard,
    accent: "from-red-600/25 to-rose-950/20",
  },
  {
    title: "Photography & Cinematography",
    subtitle: "Artistic framing, authentic atmosphere & depth",
    description:
      "Creating intentional visual frames that capture genuine human emotion, brand aesthetics, and lifestyle mood. Whether in studio or on-location, every shot is framed with purpose.",
    deliverables: [
      "Editorial portraits & brand lookbooks",
      "Commercial product & lifestyle campaigns",
      "On-location ambient & studio lighting setups",
      "High-resolution retouched master files",
    ],
    icon: Camera,
    accent: "from-rose-600/25 to-red-950/20",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aman Singhania",
    role: "Creative Director",
    company: "Apex Media Group",
    comment:
      "Daksh’s video editing instincts are rare. He understands musical pacing, micro-expressions, and how to build tension in a 60-second commercial. Our engagement rate doubled on the recent campaign cut.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Pooja Vora",
    role: "Brand Founder",
    company: "Komorebi Living",
    comment:
      "Working with Daksh on our lifestyle lookbook was seamless. He captured the serene, golden-hour warmth of our products with zero fuss. The final color grade felt straight out of a cinema film.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Rohan Patel",
    role: "Music Producer & Artist",
    company: "Soundscape Records",
    comment:
      "He turned our messy 3-day multi-camera music shoot into an absolute masterpiece trailer. Fast delivery, receptive to minor notes, and masterclass audio synchronization.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What is your standard turnaround time for video editing?",
    answer:
      "For short-form reels and commercial promos (under 90 seconds), the standard turnaround is 3 to 5 business days. For complex music videos, multi-cam events, or documentary edits, delivery typically takes 7 to 14 days including round-one review.",
  },
  {
    question: "Do you travel for out-of-station or destination shoots?",
    answer:
      "Yes, absolutely. While I am based in Surat, Gujarat, I frequently travel across India and internationally for commercial shoots, destination weddings, documentaries, and editorial campaigns.",
  },
  {
    question: "What color space and delivery formats do you provide?",
    answer:
      "All master videos are graded in DaVinci Resolve Studio utilizing color-managed workflows (ACES or DaVinci YRGB Color Managed). Deliverables are provided in ProRes 422 HQ / 4444 master files and high-bitrate H.264/H.265 optimized for web, Instagram (9:16), YouTube (16:9), and cinema projection.",
  },
  {
    question: "How are revisions handled during a project?",
    answer:
      "Every project package includes 2 comprehensive rounds of revisions using Frame.io timestamped review links. This ensures direct, visual feedback so adjustments are executed with precision.",
  },
  {
    question: "Can you provide raw unedited footage or project files?",
    answer:
      "Yes. Raw camera files (Sony 10-bit Log footage) and DaVinci Resolve project archives (.dra) or Premiere Pro project files can be provided upon request as an archival deliverable.",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/withhrohit_22?utm_source=qr",
    icon: InstagramIcon,
  },
  { label: "YouTube", href: "https://youtube.com", icon: Clapperboard },
  { label: "Email", href: "mailto:dakshmodekar@gmail.com", icon: Mail },
];

export function PortfolioPage() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<"phone" | "email" | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form state
  const [formStatus, setFormStatus] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Video Editing",
    message: "",
  });

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const copyToClipboard = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(
      "Thank you, your message has been received! Daksh will review your project details and get back within 24 hours."
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "Video Editing",
      message: "",
    });
  };

  return (
    <>
      {/* Intro Splash Screen */}
      <AnimatePresence>
        {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[#060709] text-white selection:bg-red-600 selection:text-white">
        {/* Background ambient red & black mesh glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-[140px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-rose-600/15 blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 -left-20 h-[32rem] w-[32rem] rounded-full bg-red-800/15 blur-[120px]"
          />
        </div>

        {/* Navigation Header */}
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero onOpenShowreel={() => setShowreelOpen(true)} />
          <About onCopy={copyToClipboard} copiedType={copiedType} />
          <PortfolioSection
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filteredItems={filteredItems}
            onSelectProject={(item) => setSelectedItem(item)}
          />
          <ServicesSection />
          <TestimonialsSection />
          <FAQSection
            openIndex={openFaqIndex}
            onToggle={(index) =>
              setOpenFaqIndex(openFaqIndex === index ? null : index)
            }
          />
          <ContactSection
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            formStatus={formStatus}
            onCopy={copyToClipboard}
            copiedType={copiedType}
          />
        </main>

        {/* Footer */}
        <Footer />

        {/* Project Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <ProjectModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>

        {/* Showreel Preview Modal */}
        <AnimatePresence>
          {showreelOpen && (
            <ShowreelModal onClose={() => setShowreelOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// -------------------------------------------------------------------------------------------------
// NAVBAR COMPONENT
// -------------------------------------------------------------------------------------------------
function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-red-950/40 bg-[#060709]/85 backdrop-blur-xl transition-all duration-300"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo with Red Glow */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-lg font-bold uppercase tracking-[0.22em] text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/40 bg-gradient-to-br from-red-600/30 via-red-950/20 to-black text-xs font-bold text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]">
            DM
          </span>
          <div className="flex flex-col text-left">
            <span className="leading-none text-white group-hover:text-red-400 transition-colors">
              Daksh Modekar
            </span>
            <span className="text-[10px] tracking-[0.28em] text-red-300/60 font-normal">
              Visual Arts
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-300 transition-colors hover:text-red-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden items-center gap-3 sm:flex">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-gradient-to-r from-red-600/20 to-rose-600/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-red-200 transition-all duration-300 hover:border-red-400 hover:bg-red-600/30 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
          >
            Book a Session
            <ArrowRight className="h-3.5 w-3.5 text-red-400" />
          </motion.a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-900/40 bg-red-950/20 text-stone-200 transition-colors hover:text-white lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-red-400" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-red-950/60 bg-[#07080c]/98 px-6 py-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-stone-300 transition-colors hover:text-red-400"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-red-950/40 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition hover:from-red-500 hover:to-rose-500"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4" />
                </a>
                <div className="flex items-center justify-center gap-4 pt-2">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/40 bg-red-950/30 text-stone-300 transition hover:text-red-400 hover:border-red-500/50"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// -------------------------------------------------------------------------------------------------
// HERO COMPONENT
// -------------------------------------------------------------------------------------------------
function Hero({ onOpenShowreel }: { onOpenShowreel: () => void }) {
  return (
    <section
      id="home"
      className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Availability pill with red ping */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Available for Worldwide Shoots & Editing
          </motion.div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.38em] text-red-400/80 font-medium">
              Based in Surat, Gujarat • Working Globally
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Daksh{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">
                Modekar
              </span>
            </h1>
            <p className="text-lg font-medium text-red-200/90 sm:text-xl">
              Photographer, Senior Video Editor & Colorist
            </p>
            <p className="max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
              Translating raw moments into cinema-grade visual storytelling.
              Specializing in high-octane video edits, DaVinci Resolve color science,
              and intentional editorial photography with dark, evocative aesthetic.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300 hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)]"
            >
              Explore Portfolio
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-stone-300 transition-colors hover:text-white hover:border-red-500/30"
            >
              Contact Me
            </a>
          </div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-red-950/40 text-stone-300">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-extrabold text-white">1+</div>
              <div className="text-xs uppercase tracking-[0.16em] text-red-400/80 mt-1">
                Years Experience
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs uppercase tracking-[0.16em] text-red-400/80 mt-1">
                Projects Completed
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs uppercase tracking-[0.16em] text-red-400/80 mt-1">
                Client Rating
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Visual Card with Red Ambient Lighting */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Ambient Red Glow behind card */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-red-600/30 via-rose-600/15 to-transparent blur-3xl opacity-80" />

          <div className="relative overflow-hidden rounded-[2rem] border border-red-500/30 bg-[#0b0c10]/70 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="group relative h-[480px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0c10] transition-all duration-700 sm:h-[540px]">
              <img
                src="/assets/IMG.jpeg"
                alt="Daksh Modekar hero visual"
                className="h-full w-full max-w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

              {/* Bottom Card Content */}
              <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 bg-gradient-to-t from-black via-black/85 to-transparent">
                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Visual Masterclass Showreel
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-950/50 bg-black/60 p-4 backdrop-blur-lg">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-red-300/70">
                      Signature Reel
                    </p>
                    <p className="text-base font-semibold text-white sm:text-lg">
                      Cinematic rhythm & emotional depth
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    type="button"
                    onClick={onOpenShowreel}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-600/20 text-red-400 transition hover:bg-red-600 hover:text-white"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// ABOUT COMPONENT
// -------------------------------------------------------------------------------------------------
function About({
  onCopy,
  copiedType,
}: {
  onCopy: (text: string, type: "phone" | "email") => void;
  copiedType: "phone" | "email" | null;
}) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Left Column / Highlight */}
        <div className="rounded-[2.25rem] border border-red-950/50 bg-[#0a0b0e]/70 p-8 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
              <BadgeCheck className="h-4 w-4 text-red-400" />
              About Me
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
              Capturing light. Sculpting stories. Polishing emotion.
            </h2>
            <p className="text-stone-300 leading-relaxed text-base">
              Every frame holds an emotional pulse. My mission is to elevate raw
              footage and stills into cinematic experiences that command
              attention, build brands, and leave lasting impressions.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-red-950/40 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="text-red-400 font-bold text-2xl">45+</div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
                Brands & Creators
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="text-red-400 font-bold text-2xl">Surat, IN</div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
                Studio Location
              </div>
            </div>
          </div>
        </div>

        {/* Right Column / Bio & Direct Details */}
        <div className="space-y-6 rounded-[2.25rem] border border-red-950/50 bg-[#0a0b0e]/80 p-8 sm:p-10 backdrop-blur-xl">
          <div className="space-y-4 text-base leading-relaxed text-stone-300">
            <p>
              I am <strong className="text-white">Daksh Modekar</strong>, a
              professional photographer and video editor based in Surat. With
              over 7 years of hands-on experience, I bridge the gap between
              high-concept cinematography and meticulous post-production.
            </p>
            <p>
              Whether directing a multi-camera commercial shoot, color grading
              indie films in DaVinci Resolve, or cutting viral reels with
              surgical pacing, I approach every project with artistic rigor and
              technical precision.
            </p>
          </div>

          {/* Quick Contact & Location Badges */}
          <div className="grid gap-4 sm:grid-cols-2 pt-4">
            {/* Location Card */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-red-500/30">
              <div className="mb-2 flex items-center gap-2.5 text-red-400">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300">
                  Studio Address
                </span>
              </div>
              <p className="text-sm font-medium text-stone-200">
                A-704, Madhav Residency, Karadva Road, Dindoli, Surat, Gujarat
              </p>
            </div>

            {/* Phone Card with Copy */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-red-500/30">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-red-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300">
                    Phone / WhatsApp
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy("+918460859770", "phone")}
                  aria-label="Copy phone number"
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                >
                  {copiedType === "phone" ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href="tel:+918460859770"
                className="text-sm font-semibold text-stone-100 hover:text-red-400 transition-colors"
              >
                +91 8460859770
              </a>
            </div>

            {/* Email Card with Copy */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 sm:col-span-2 transition hover:border-red-500/30">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-red-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300">
                    Official Email
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onCopy("dakshmodekar@gmail.com", "email")}
                  aria-label="Copy email address"
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                >
                  {copiedType === "email" ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href="mailto:dakshmodekar@gmail.com"
                className="text-sm font-semibold text-stone-100 hover:text-red-400 transition-colors"
              >
                dakshmodekar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// PORTFOLIO SHOWCASE SECTION
// -------------------------------------------------------------------------------------------------
function PortfolioSection({
  activeFilter,
  setActiveFilter,
  filteredItems,
  onSelectProject,
}: {
  activeFilter: PortfolioCategory;
  setActiveFilter: (c: PortfolioCategory) => void;
  filteredItems: PortfolioItem[];
  onSelectProject: (item: PortfolioItem) => void;
}) {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            Selected Portfolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Cinematic Frames & Visual Cuts
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Click any project to inspect creative backstory, camera gear, and color science details.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {portfolioCategories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                activeFilter === cat
                  ? "border border-red-500 bg-red-600/25 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  : "border border-white/10 bg-black/40 text-stone-400 hover:border-red-500/30 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              onClick={() => onSelectProject(item)}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-red-950/40 bg-[#0a0b0e]/75 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-400 hover:border-red-500/60 hover:shadow-[0_25px_60px_rgba(239,68,68,0.2)]"
            >
              {/* Image Frame */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full border border-red-500/40 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300 backdrop-blur-md">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/80 px-2.5 py-1 text-xs font-medium text-stone-300 backdrop-blur-md">
                    {item.year}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Project Card Body */}
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-red-400">
                    {item.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition-colors group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-400/80 font-medium">
                  Client: {item.client}
                </p>
                <p className="text-sm leading-relaxed text-stone-300 line-clamp-2">
                  {item.description}
                </p>

                {/* Tool Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-red-950/60 bg-red-950/20 px-2 py-0.5 text-[11px] text-red-300/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// SERVICES SECTION
// -------------------------------------------------------------------------------------------------
function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 mb-3">
          <Layers className="h-3.5 w-3.5 text-red-400" />
          What I Deliver
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Complete Production & Post-Production Suite
        </h2>
        <p className="mt-3 text-base text-stone-300">
          Tailored creative solutions for musicians, commercial brands, content creators, and agencies.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              key={service.title}
              className="rounded-[2.25rem] border border-red-950/50 bg-[#0a0b0e]/75 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-red-500/40"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br ${service.accent}`}
                >
                  <Icon className="h-7 w-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-red-400/80 mt-0.5">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-stone-300 mb-6">
                {service.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-red-950/40">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400 mb-3">
                  Key Deliverables
                </p>
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-stone-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 hover:text-red-300 transition"
                >
                  Inquire for this service
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


// -------------------------------------------------------------------------------------------------
// TESTIMONIALS SECTION
// -------------------------------------------------------------------------------------------------
function TestimonialsSection() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 mb-3">
          <Star className="h-3.5 w-3.5 fill-current text-red-400" />
          Client Endorsements
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Trusted by Creators & Brands
        </h2>
        <p className="mt-3 text-base text-stone-300">
          Feedback from directors, brand leads, and musicians who trusted Daksh with their visual identity.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {testimonials.map((t) => (
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            key={t.id}
            className="rounded-[2rem] border border-red-950/40 bg-[#0a0b0e]/75 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col justify-between transition duration-300 hover:border-red-500/40"
          >
            <div>
              <div className="flex items-center gap-1 text-red-500 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-stone-200 italic">
                “{t.comment}”
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-red-950/40">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-12 w-12 rounded-full object-cover border border-red-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-xs text-stone-400">
                  {t.role} • {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// FAQ ACCORDION SECTION
// -------------------------------------------------------------------------------------------------
function FAQSection({
  openIndex,
  onToggle,
}: {
  openIndex: number | null;
  onToggle: (index: number) => void;
}) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 mb-3">
          <MessageSquare className="h-3.5 w-3.5 text-red-400" />
          Clear Answers
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-red-950/40 bg-[#0a0b0e]/75 backdrop-blur-xl overflow-hidden transition-colors hover:border-red-500/30"
            >
              <button
                type="button"
                onClick={() => onToggle(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-base font-semibold text-white">
                  {faq.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-950/40 bg-red-950/20 text-red-400">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-relaxed text-stone-300 border-t border-red-950/30 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// CONTACT SECTION
// -------------------------------------------------------------------------------------------------
function ContactSection({
  formData,
  setFormData,
  onSubmit,
  formStatus,
  onCopy,
  copiedType,
}: {
  formData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formStatus: string;
  onCopy: (text: string, type: "phone" | "email") => void;
  copiedType: "phone" | "email" | null;
}) {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.25rem] border border-red-950/50 bg-[#0a0b0e]/80 p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200 mb-3">
              <Mail className="h-3.5 w-3.5 text-red-400" />
              Let’s Connect
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Your Next Visual Project
            </h2>
            <p className="mt-2 text-sm text-stone-300">
              Fill in your project scope below. I review every submission personally and respond within 24 hours.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Your Full Name *
                </span>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Email Address *
                </span>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Phone / WhatsApp
                </span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Service Category
                </span>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500"
                >
                  <option value="Video Editing">Video Editing</option>
                  <option value="Photography">Photography</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
                Project Vision & Scope *
              </span>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your footage, expected turnaround, target platform, and creative reference..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </label>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 hover:from-red-500 hover:to-rose-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]"
              >
                Submit Project Inquiry
                <Send className="h-4 w-4" />
              </motion.button>
            </div>

            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-red-500/40 bg-red-600/15 p-4 text-sm font-medium text-red-200"
              >
                {formStatus}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Right Side: Quick Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col justify-between space-y-6 rounded-[2.25rem] border border-red-500/30 bg-gradient-to-br from-red-950/40 via-[#0a0b0e] to-black p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
              <BadgeCheck className="h-3.5 w-3.5 text-red-400" />
              Direct Contacts
            </div>

            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Prefer a direct conversation?
            </h3>
            <p className="text-sm leading-relaxed text-stone-300">
              For immediate shoot inquiries, urgent same-day reel edits, or agency collaborations, you can reach out directly via phone or WhatsApp.
            </p>

            <div className="space-y-4 pt-4">
              {/* Phone Card */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-5 transition hover:border-red-500/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Call or WhatsApp
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopy("+918460859770", "phone")}
                    className="text-xs text-red-400 hover:text-red-300 transition"
                  >
                    {copiedType === "phone" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <a
                  href="https://wa.me/918460859770"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-semibold text-white hover:text-red-400 transition"
                >
                  +91 8460859770
                </a>
              </div>

              {/* Email Card */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-5 transition hover:border-red-500/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                      Email Address
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopy("dakshmodekar@gmail.com", "email")}
                    className="text-xs text-red-400 hover:text-red-300 transition"
                  >
                    {copiedType === "email" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <a
                  href="mailto:dakshmodekar@gmail.com"
                  className="text-base font-semibold text-white hover:text-red-400 transition"
                >
                  dakshmodekar@gmail.com
                </a>
              </div>

              {/* Location Card */}
              <div className="rounded-2xl border border-white/10 bg-black/60 p-5 transition hover:border-red-500/40">
                <div className="flex items-center gap-2.5 text-red-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                    Location & Travel
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-200">
                  Surat, Gujarat, India (Available globally for destination projects)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-red-950/40 text-xs text-stone-400">
            Average response time: <span className="text-red-400 font-semibold">Under 4 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------------------------
// FOOTER COMPONENT
// -------------------------------------------------------------------------------------------------
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-red-950/50 bg-[#040507]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/40 bg-red-600/10 text-xs font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                DM
              </span>
              <span className="text-lg font-bold tracking-wider text-white uppercase">
                Daksh Modekar
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm">
              Photographer & Senior Video Editor dedicated to cinematic storytelling, DaVinci Resolve color science, and dynamic visual narrative.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900/40 bg-red-950/20 text-stone-300 transition-all hover:border-red-500 hover:text-red-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              className="ml-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-200 transition hover:bg-red-600/20 hover:border-red-400"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-red-950/30 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Daksh Modekar. All rights reserved.</p>
          <p className="text-stone-400">
            Engineered with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

// -------------------------------------------------------------------------------------------------
// PROJECT DETAIL LIGHTBOX MODAL
// -------------------------------------------------------------------------------------------------
function ProjectModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-red-500/40 bg-[#0a0b0e]/95 p-6 sm:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.9)]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:bg-red-600 hover:border-red-500"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-white/10 mb-6">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="rounded-full border border-red-500/40 bg-black/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-300 backdrop-blur-md">
              {item.category}
            </span>
            <span className="rounded-full border border-white/20 bg-black/80 px-3 py-1 text-xs text-stone-300 backdrop-blur-md">
              {item.year}
            </span>
          </div>
        </div>

        {/* Modal Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {item.title}
            </h3>
            <p className="text-sm font-medium text-red-400 mt-1">
              Client / Production: {item.client}
            </p>
          </div>

          <p className="text-base leading-relaxed text-stone-200">
            {item.description}
          </p>

          <div className="rounded-2xl border border-red-950/40 bg-black/50 p-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-2">
              Behind the Scene & Creative Execution
            </h4>
            <p className="text-sm leading-relaxed text-stone-300">
              {item.story}
            </p>
          </div>

          {/* Tools & Workflow used */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-2.5">
              Cameras & Software Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-red-500/30 bg-red-600/10 px-3 py-1 text-xs font-medium text-red-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-red-950/40 flex items-center justify-between">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:from-red-500 hover:to-rose-500 transition"
            >
              Inquire for Similar Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-white transition"
            >
              Close Window
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// -------------------------------------------------------------------------------------------------
// SHOWREEL VIDEO PREVIEW MODAL
// -------------------------------------------------------------------------------------------------
function ShowreelModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-red-500/40 bg-[#060709] shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close showreel"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:bg-red-600 hover:border-red-500"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// -------------------------------------------------------------------------------------------------
// SPLASH SCREEN COMPONENT
// Full-screen cinematic intro that plays on first load, then slides away to reveal the portfolio.
// -------------------------------------------------------------------------------------------------
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Letter-by-letter animation for the name "DAKSH"
  const letters = ["D", "A", "K", "S", "H"];
  const subtitleWords = ["Photographer", "&", "Senior Video Editor"];

  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #1a0000 0%, #0a0000 50%, #000000 100%)" }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated cinematic red glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-700/30 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-rose-900/25 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-red-600/20 blur-[90px] pointer-events-none"
      />

      {/* Horizontal scan-line shimmer */}
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "200%", opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none"
      />

      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Corner bracket decorations */}
      {[
        "top-8 left-8 border-t-2 border-l-2",
        "top-8 right-8 border-t-2 border-r-2",
        "bottom-8 left-8 border-b-2 border-l-2",
        "bottom-8 right-8 border-b-2 border-r-2",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
          className={`absolute h-10 w-10 border-red-500/60 ${cls}`}
        />
      ))}

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">

        {/* "WELCOME TO" label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em", y: -12 }}
          animate={{ opacity: 0.6, letterSpacing: "0.35em", y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xs sm:text-sm uppercase font-light tracking-[0.35em] text-red-300/80"
        >
          Welcome to
        </motion.p>

        {/* Big "DAKSH" letter-by-letter */}
        <div className="flex items-center gap-1 sm:gap-2">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: 0.55 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white leading-none"
              style={{
                textShadow: "0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.3)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Red accent underline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[3px] w-40 sm:w-64 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent origin-center"
        />

        {/* Subtitle words */}
        <div className="flex items-center gap-2 sm:gap-3">
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: word === "&" ? 0.4 : 0.85, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.25 + i * 0.12,
                ease: "easeOut",
              }}
              className={`text-sm sm:text-base font-medium tracking-wider ${
                word === "&" ? "text-red-500" : "text-white/80"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Pulsing "entering..." loader dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="flex items-center gap-2 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-red-500"
            />
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 0.4 }}
            className="ml-2 text-xs tracking-[0.25em] uppercase text-red-400/60"
          >
            Entering
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}