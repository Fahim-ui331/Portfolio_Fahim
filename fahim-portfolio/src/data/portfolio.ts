import { Bot } from "lucide-react";
import type { IconType } from "react-icons";
import seatBooking from "../assets/seatbooking.png";
import hospital from "../assets/hospital.png";
import { Clapperboard } from "lucide-react";

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiPython,
  SiGithub,
  SiFigma,
  SiBootstrap,
  SiTypescript,
  SiNodedotjs,
  SiVite,  
} from "react-icons/si";
import { FaFilm, FaVideo } from "react-icons/fa";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,

} from "react-icons/fa";

export const profile = {
  name: "Fahim",
  role: "Creative Developer",
  location: "Dhaka, Bangladesh",
  status: "Available for Freelance",
  bio: "Crafting cinematic web experiences.",
  email: "rjfahim75@gmail.com",
  phone: "+880 1972997381",
  cvUrl: "/cv/Md Fahim Hosen - CV.pdf",
};

export const socials: { name: string; url: string; icon: IconType }[] = [
  { name: "GitHub", url: "https://github.com/Fahim-ui331", icon: FaGithub 
    
  },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/md-fahim-hosen-b35723227/", icon: FaLinkedin },
  { name: "Facebook", url: "https://www.facebook.com/fahim.hosen.9678", icon: FaFacebook },
  { name: "Instagram", url: "https://www.instagram.com/anim.elover5374/", icon: FaInstagram },
  { name: "YouTube", url: "https://www.youtube.com/@DarkRepository", icon: FaYoutube },
  { name: "Email", url: "mailto:rjfahim75@gmail.com", icon: FaEnvelope },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups: {
  title: string;
  span: string;
  items: { name: string; icon: IconType }[];
}[] = [
  {
    title: "Frontend",
    span: "md:col-span-2",
    items: [
      { name: "React", icon: SiReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    title: "Backend",
    span: "md:col-span-1",
    items: [
      { name: "PHP", icon: SiPhp },
      { name: "SQL", icon: SiMysql },
      { name: "Python", icon: SiPython },
      { name: "Node.js", icon: SiNodedotjs },
    ],
  },
  {
    title: "Tools & Craft",
    span: "md:col-span-3",
    items: [
      { name: "GitHub", icon: SiGithub },
      { name: "After Effects", icon: FaFilm },
      { name: "Canva", icon: FaVideo },
      { name: "Figma", icon: SiFigma },
      { name: "ChatGPT (AI)", icon: Bot },
      { name: "CapCut", icon: Clapperboard },
    ],
  },
];

export const education = [
  {
    school: "United International University",
    url: "https://www.uiu.ac.bd/",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "2021 – 2026",
    status: "Final Year",
    courses: ["OOP", "Data Structures & Algorithms", "Database Systems", "Software Engineering"],
  },
];

export const experience = [
  {
    role: "Freelance Web Developer",
    org: "Independent",
    period: "2023 — Present",
    summary:
      "Designing and shipping premium marketing sites, dashboards, and interactive brand experiences for clients worldwide.",
  },
  {
    role: "Junior Web Developer",
    org: "Contract",
    period: "2022 — 2023",
    summary:
      "Built responsive product pages and internal tools with React and modern tooling; owned components end-to-end.",
  },
  {
    role: "Independent Technical Specialist",
    org: "Consulting",
    period: "2021 — 2022",
    summary:
      "Consulted on frontend architecture, performance, and motion design for startups and creators.",
  },
];

export const projects = [
  {
    name: "Online-Seat-Booking-System",
    description:
      "Constraint-solving scheduler that generates conflict-free university timetables in seconds.",
    stack: ["React", "Express", "Node.js" ,"MySQL", "bootstrap"],
    image: seatBooking,
    demo: "https://online-seat-booking.vercel.app/",
    repo: "https://github.com/Fahim-ui331/Online-Seat-booking",
  },
  {
  name: "Hospital Management System",
  description:
    "A full-featured Hospital Management System designed to simplify patient registration, appointment scheduling, doctor management, and medical record tracking with a secure Firebase backend and responsive interface.",
  stack: ["React", "Express", "Node.js", "MySQL", "Bootstrap"],
  image: hospital,
  demo: "https://hospital-management-system-lyart.vercel.app/",
  repo: "https://github.com/Fahim-ui331/hospital-management-system",
},
  {
    name: "Cinematic Portfolio Engine",
    description:
      "Reusable motion-first portfolio system with smooth scroll, magnetic UI, and cinematic reveals.",
    stack: ["React", "Framer Motion", "Lenis"],
    demo: "#",
    repo: "#",
  },
];

export const creative = [
  {
    title: "2D Animation",
    description: "Character-driven short animations with a cinematic tone.",
    icon: FaYoutube,
    url: "#",
  },
  {
    title: "Anime Content",
    description: "Curated edits and story recaps for anime communities.",
    icon: FaInstagram,
    url: "#",
  },
  {
    title: "Motion Graphics",
    description: "Kinetic type, logo stings, and brand motion systems.",
    icon: FaFacebook,
    url: "#",
  },
  {
    title: "Video Editing",
    description: "Long and short-form edits with premium pacing and sound design.",
    icon: FaYoutube,
    url: "#",
  },
];