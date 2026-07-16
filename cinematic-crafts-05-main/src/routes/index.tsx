import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import profileImage from "../assets/profile.jpg";
import profileImage2 from "../assets/profile2.png";
import seatBookingImage from "../assets/seatbooking.png";
import {
  ArrowUpRight,
  Download,
  Github,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Heart,
  ArrowUp,
  Sun,
  Moon,
} from "lucide-react";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ParticlesBG } from "@/components/portfolio/ParticlesBG";
import {
  profile,
  socials,
  navLinks,
  skillGroups,
  education,
  experience,
  projects,
  creative,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

/* ---------------- animation presets ---------------- */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------------- root ---------------- */
function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    // Light theme is applied via .dark class in this design system (see styles.css comment).
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "light");
    if (typeof localStorage !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SmoothScroll />
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="relative min-h-dvh bg-background text-foreground selection:bg-primary/30">
        <Navbar theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <CreativeWorks />
          <Contact />
        </main>

        <Footer />

        <AnimatePresence>
          {showTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full glass soft-shadow hover:scale-110 transition-transform"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ---------------- loading ---------------- */
function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative h-20 w-20">

    {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-accent blur-xl opacity-70"></div>

    {/* Profile Image */}
        <img
        src={profileImage}
        alt="Fahim"
        className="relative h-full w-full rounded-full border-2 border-primary object-cover shadow-2xl"
      />
      
</div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- navbar ---------------- */
function Navbar({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 200], [1, 0.96]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ scale }}
      className="fixed left-1/2 top-4 z-50 w-[min(94%,1100px)] -translate-x-1/2"
    >
      <div className="glass soft-shadow flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <a href="#home" className="flex items-center gap-2">
          <img
        src={profileImage}
        alt="Fahim"
        className="h-9 w-9 rounded-full border border-primary/50 object-cover shadow-md"
/>
          <span className="hidden font-display text-sm font-semibold sm:inline">Fahim</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/70 transition-colors hover:bg-muted"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-border/70"
          >
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-foreground" />
              <span className="block h-0.5 w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass soft-shadow mt-2 grid gap-1 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------- hero ---------------- */
function Hero() {
  const line1 = `Hi, I'm ${profile.name}.`;
  const line2 = `Creative Developer`;
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [phase, setPhase] = useState<"first" | "second" | "done">("first");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped1(line1.slice(0, i));
      if (i >= line1.length) {
        clearInterval(id);
        setTimeout(() => setPhase("second"), 350);
      }
    }, 60);
    return () => clearInterval(id);
  }, [line1]);
  useEffect(() => {
    if (phase !== "second") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped2(line2.slice(0, i));
      if (i >= line2.length) {
        clearInterval(id);
        setPhase("done");
      }
    }, 70);
    return () => clearInterval(id);
  }, [phase, line2]);

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden pt-28">
      <ParticlesBG />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block min-h-[1.2em] text-muted-foreground">
              {typed1}
              {phase === "first" && (
                <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-primary" />
              )}
            </span>
            <span className="mt-2 block min-h-[1.2em] gradient-text">
              {typed2}
              {phase !== "done" && phase === "second" && (
                <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-primary" />
              )}
            </span>
          </h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="font-button group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground soft-shadow transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cvUrl}
              className="font-button inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        <DevCard />
      </div>
    </section>
  );
}

function DevCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="relative mx-auto w-full max-w-sm animate-float"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary opacity-60 blur-xl" />
      <div className="relative rounded-3xl border border-border/70 bg-card/80 p-6 soft-shadow backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-destructive/70" />
            <span className="h-2 w-2 rounded-full bg-chart-4/70" />
            <span className="h-2 w-2 rounded-full bg-success/70" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            developer.card
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">

  <div className="relative h-16 w-16">

    {/* Glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-accent blur-md opacity-60"></div>

    {/* Profile Image */}
    <img
      src={profileImage2}
      alt={profile.name}
      className="relative h-full w-full rounded-2xl border border-primary/40 object-cover shadow-xl"
    />

  </div>

  <div>
    <div className="font-display text-lg font-semibold">
      {profile.name}
    </div>

    <div className="text-sm text-muted-foreground">
      {profile.role}
    </div>
  </div>

</div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <InfoRow label="Location" value={profile.location} />
          <InfoRow label="Status" value="Online" accent />
          <InfoRow label="Focus" value="Web · Motion" />
          <InfoRow label="Stack" value="React · TS" />
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Crafting cinematic web experiences.
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={`mt-1 truncate font-medium ${accent ? "text-success" : "text-foreground"}`}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------------- section shell ---------------- */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-14 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {eyebrow}
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-5xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ---------------- about ---------------- */
function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Building web experiences <span className="gradient-text">cinematically.</span></>}>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div {...fadeUp} className="relative aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 blur-2xl" />
          <div className="relative grid h-full w-full place-items-center rounded-[2rem] border border-border/70 bg-card/60 backdrop-blur">
            <div className="relative h-52 w-52 animate-float">

  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-accent blur-xl opacity-60 animate-pulse"></div>

  <img
    src={profileImage}
    alt="Fahim"
    className="relative h-full w-full rounded-full border-4 border-primary object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
  />

</div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a creative developer blending clean engineering with cinematic motion design.
            I build fast, accessible interfaces and craft short-form animation content that
            tells a story.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Currently a final-year CSE student, freelancing globally, and exploring the
            intersection of code, motion, and narrative.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------------- skills ---------------- */
function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title={<>Tools I <span className="gradient-text">craft with.</span></>}>
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <motion.div
            key={g.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: gi * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 soft-shadow ${g.span}`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
            <h3 className="font-display text-xl font-semibold">{g.title}</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {g.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center gap-2 rounded-2xl border border-border/70 bg-muted/40 px-3 py-2 text-sm transition-all hover:scale-105 hover:border-primary/50"
                >
                  <it.icon className="h-4 w-4 text-primary" />
                  {it.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- education ---------------- */
function Education() {
  return (
    <Section id="education" eyebrow="Education" title={<>Academic <span className="gradient-text">journey.</span></>}>
      <div className="relative border-l border-border/70 pl-8">
        {education.map((e, i) => (
          <motion.div key={i} {...fadeUp} className="relative pb-10">
            <span className="absolute -left-[38px] top-2 grid h-4 w-4 place-items-center rounded-full bg-background ring-2 ring-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <div className="rounded-3xl border border-border/70 bg-card/60 p-6 soft-shadow backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-semibold">{e.school}</h3>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
                  {e.status}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">{e.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">{e.period}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.courses.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- experience ---------------- */
function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title={<>Work <span className="gradient-text">experience.</span></>}>
      <div className="grid gap-4 md:grid-cols-3">
        {experience.map((x, i) => (
          <motion.div
            key={x.role}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className="group rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 soft-shadow"
          >
            <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {x.period}
            </div>
            <h3 className="font-display text-lg font-semibold">{x.role}</h3>
            <div className="mt-1 text-sm text-primary">{x.org}</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.summary}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- projects ---------------- */
function Projects() {
  return (
    <Section id="projects" eyebrow="Featured Work" title={<>Selected <span className="gradient-text">projects.</span></>}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
          key={p.name}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 soft-shadow"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/70">
        <img
        src={p.name === "Online-Seat-Booking-System" ? seatBookingImage : p.image}
        alt={p.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
            <div className="relative mt-6 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
<a
  href={p.demo}
  target="_blank"
  rel="noopener noreferrer"
>
  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform hover:-translate-y-1 hover:translate-x-1" />
</a>            </div>
            <p className="relative mt-2 text-sm text-muted-foreground">{p.description}</p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="relative mt-5 flex items-center gap-2">

  <a
    href={p.demo}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs text-primary hover:bg-primary hover:text-white transition"
  >
    <ExternalLink className="h-3 w-3" />
    Live
  </a>

  <a
    href={p.repo}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-white transition"
  >
    <Github className="h-3 w-3" />
    Code
  </a>

</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- creative works ---------------- */
function CreativeWorks() {
  return (
    <Section id="creative" eyebrow="Creative Works" title={<>Motion & <span className="gradient-text">storytelling.</span></>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {creative.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.url}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            className="group rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 soft-shadow"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Explore <ArrowUpRight className="h-3 w-3" />
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact" eyebrow="Contact" title={<>Let's build something <span className="gradient-text">great.</span></>}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <motion.div {...fadeUp} className="grid gap-4">
          <ContactCard icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} />
          <ContactCard icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} />
          <ContactCard
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={profile.location}
          />
          <div className="rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur soft-shadow">
            <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-muted/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          onSubmit={onSubmit}
          className="rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur soft-shadow"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Your name" required />
            <Field name="email" label="Email" placeholder="Write your email account" type="email" required />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project…"
              className="w-full resize-none rounded-2xl border border-border/70 bg-background/60 p-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="font-button group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground soft-shadow transition-transform hover:scale-[1.03]"
          >
            {sent ? "Opening mail…" : "Send Message"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function ContactCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border/70 bg-card/60 p-5 backdrop-blur soft-shadow">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate text-sm">{value}</div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border/70 bg-background/60 p-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

/* ---------------- footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-sm text-muted-foreground">© 2026 {profile.name}.</div>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          Built with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
          </motion.span>
          React · Vite · Tailwind
        </div>
      </div>
    </footer>
  );
}
