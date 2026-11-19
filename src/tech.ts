import {
  siBurpsuite, siCisco, siCss, siFlask, siGit, siGnubash, siHtml5, siJavascript, siKalilinux, siLinux, siMysql, siNextdotjs, siPhp,
  siPython, siReact, siScikitlearn, siTailwindcss, siVirtualbox,
} from 'simple-icons'

// Brand logos for technologies used in the projects and labs on this page.
export const tech = [
  { name: 'Python', icon: siPython },
  { name: 'PHP', icon: siPhp },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'HTML', icon: siHtml5 },
  { name: 'CSS', icon: siCss },
  { name: 'Bash', icon: siGnubash },
  { name: 'MySQL', icon: siMysql },
  { name: 'Flask', icon: siFlask },
  { name: 'scikit-learn', icon: siScikitlearn },
  { name: 'Git', icon: siGit },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Tailwind', icon: siTailwindcss },
  { name: 'Kali Linux', icon: siKalilinux },
  { name: 'Burp Suite', icon: siBurpsuite },
  { name: 'Cisco', icon: siCisco },
  { name: 'VirtualBox', icon: siVirtualbox },
  { name: 'Linux', icon: siLinux },
]

export { siCisco }

/** Brand colours that are too dark for a dark page fall back to white. */
export function brandColor(hex: string) {
  const n = parseInt(hex, 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return lum < 0.35 ? '#f2f5f9' : `#${hex}`
}
