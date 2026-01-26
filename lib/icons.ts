import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaCode,
  FaChartLine,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiVercel,
  SiGit,
} from "react-icons/si";
import { IconType } from "react-icons";

export const SocialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  email: FaEnvelope,
  external: FaExternalLinkAlt,
};

export const TechIcons: Record<string, IconType> = {
  react: FaReact,
  nextjs: SiNextdotjs,
  nodejs: FaNodeJs,
  tailwind: SiTailwindcss,
  firebase: SiFirebase,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss3,
  database: FaDatabase,
  server: FaServer,
  code: FaCode,
  vercel: SiVercel,
  git: SiGit,
};

export const UIIcons = {
  download: FaDownload,
  chart: FaChartLine,
};
