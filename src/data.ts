// Single source of truth for the site content.
// House rule (same as the resume): no em dashes or en dashes in copy.
// Every number here comes from the project's own test output. Do not round up.

export const profile = {
  name: 'Muhamad Hakimi bin Awang',
  short: 'Hakimi',
  title: 'Cyber Security Undergraduate',
  location: 'Penang, Malaysia',
  github: 'https://github.com/familyhakimi25-bit',
  githubLabel: 'github.com/familyhakimi25-bit',
  phoneDisplay: '011-2166 7246',
  phoneTel: '+601121667246',
  whatsapp: 'https://wa.me/601121667246',
  resume: '/resume-muhamad-hakimi.pdf',
}

// To change the photo: replace public/profile-cut.webp (portrait with a transparent background).
export const photo = '/profile-cut.webp'

export const typed = ['cyber security.', 'networking.', 'log analysis.', 'web development.']

export const marquee = ['Cyber Security', 'Networking', 'Log Analysis', 'Penetration Testing', 'Digital Forensics', 'Web Development']

// Words wrapped in _underscores_ are highlighted.
export const aboutText =
  'I started in _networking,_ with a diploma and the Cisco CCNA course series. Then I moved into _security:_ I run penetration tests, read the logs, write detection rules and _build the tools myself._ I have worked part-time since 2019 to fund my own studies, and I like work that can be _checked._'

export const biodata: [string, string][] = [
  ['name', 'Muhamad Hakimi bin Awang'],
  ['based_in', 'Penang, Malaysia'],
  ['degree', 'BIT (Hons) in Cyber Security, UPTM'],
  ['cgpa', '3.23'],
  ['graduating', 'Expected 2027'],
  ['diploma', 'Computer and Networking, KPTM'],
  ['currently', 'IT Intern, Ipenet Solutions'],
  ['languages', 'Bahasa Malaysia, English'],
]

export const badge = [
  ['Location', 'Penang, MY'],
  ['CGPA', '3.23'],
  ['Degree', 'BIT (Hons) Cyber Security'],
  ['Status', 'IT Intern, Ipenet'],
]

export const stats = [
  { value: 9, label: 'projects and security labs', note: 'built and documented' },
  { value: 5, label: 'Cisco Networking Academy courses', note: 'completed 2022 to 2026' },
  { value: 2, label: 'qualifications in IT', note: 'diploma done, degree in final year' },
  { value: 6, label: 'programming and scripting languages', note: 'Python, PHP, SQL, JS, HTML/CSS, Bash' },
]

export type SkillIcon = 'shield' | 'terminal' | 'network' | 'code' | 'layers' | 'globe'
export const skills: { group: string; icon: SkillIcon; acc: string; items: string[] }[] = [
  { group: 'Security', icon: 'shield', acc: '94, 240, 255', items: ['MITRE ATT&CK mapping', 'Log analysis', 'Detection rule writing', 'Incident reporting', 'Penetration testing', 'Windows, browser and network forensics'] },
  { group: 'Security tools', icon: 'terminal', acc: '255, 122, 217', items: ['Kali Linux', 'nmap', 'Burp Suite', 'sqlmap', 'Hydra', 'Nikto', 'hping3', 'tcpdump'] },
  { group: 'Networking', icon: 'network', acc: '125, 255, 178', items: ['Routing and switching (CCNA course series)', 'Network security', 'Firewalls, switches and servers (internship)'] },
  { group: 'Programming', icon: 'code', acc: '157, 123, 255', items: ['Python', 'PHP', 'SQL', 'JavaScript', 'HTML / CSS', 'Bash'] },
  { group: 'Frameworks and tools', icon: 'layers', acc: '255, 200, 87', items: ['Flask', 'scikit-learn', 'ReportLab', 'MySQL', 'Git', 'React / Next.js', 'Tailwind CSS'] },
  { group: 'Languages', icon: 'globe', acc: '94, 240, 255', items: ['Bahasa Malaysia (native)', 'English (professional working proficiency)'] },
]

// `file` = basename in public/certs/ (.webp preview + .pdf original). No file yet = card not clickable.
export const certs: { name: string; date: string; file?: string }[] = [
  { name: 'Network Security', date: 'Jun 2026', file: 'cisco-network-security' },
  { name: 'Cybersecurity Essentials', date: 'Dec 2023', file: 'cisco-cyberess' },
  { name: 'CCNA: Enterprise Networking, Security & Automation', date: 'Aug 2023', file: 'cisco-ensa' },
  { name: 'CCNA: Switching, Routing & Wireless Essentials', date: 'Jul 2023', file: 'cisco-srwe' },
  { name: 'CCNA: Introduction to Networks', date: 'Nov 2022', file: 'cisco-itn' },
]

// Rakyat Digital (rakyatdigital.gov.my): 12 certificates, all issued 13 Nov 2026.
// Course names exactly as printed on the certificates. `key` = shown first.
export const rakyatDigital: { title: string; issuer: string; date: string; courses: { name: string; key?: boolean; file?: string }[] } = {
  title: 'Rakyat Digital',
  issuer: 'Malaysian government digital skills programme',
  date: 'Nov 2026',
  courses: [
    { name: 'CyberSAFE untuk Rakyat', key: true, file: 'rd-cybersafe' },
    { name: 'AI Safety', key: true, file: 'rd-ai-safety' },
    { name: 'Personal Data Protection: Rights of Data Subjects', key: true, file: 'rd-personal-data-protection' },
    { name: 'Introduction to AI', file: 'rd-intro-ai' },
    { name: 'AI Fluency', file: 'rd-ai-fluency' },
    { name: 'Generative AI', file: 'rd-generative-ai' },
    { name: 'Agentic AI for All', file: 'rd-agentic-ai' },
    { name: 'AI Nation 2030: The MADANI Approach', file: 'rd-ai-nation-2030' },
    { name: 'Garis Panduan Pengadaptasian AI Sektor Awam (GPAISA)', file: 'rd-gpaisa' },
    { name: 'Cloud untuk Rakyat', file: 'rd-cloud' },
    { name: 'Blockchain untuk Rakyat', file: 'rd-blockchain' },
    { name: 'Quantum untuk Rakyat', file: 'rd-quantum' },
  ],
}

// `file` works like on the certs above: set it once public/certs/<file>.webp + .pdf exist.
export const kiar: { title: string; issuer: string; kind: string; date: string; file?: string } = {
  title: 'Integrity and Anti-Corruption Course (KIAR)',
  issuer: 'UPTM with the Malaysian Anti-Corruption Commission (SPRM)',
  kind: 'Certificate of participation',
  date: 'Sep 2026',
  file: 'kiar',
}

// HIDDEN on request (2026-11-19) until the certificate turns up: no certificate in any of the 3 Gmails.
// To bring it back: set show: true, and set `file` once public/certs/<file>.webp + .pdf exist.
// Event (from the user's own confirmation email): TAMiNG iCTFF8 by UiTM, workshop 10 Jan + qualification round 11 Jan 2026.
export const ctf: { show: boolean; title: string; role: string; when: string; text: string; file?: string } = {
  show: false,
  title: 'Capture The Flag',
  role: 'Participant',
  when: '2026',
  text: 'Took part in a timed cyber security CTF competition, voluntarily and outside coursework.',
}

export const journey: { type: 'Internship' | 'Education' | 'Part-time'; when: string; title: string; where: string; text: string; now?: boolean }[] = [
  {
    type: 'Internship',
    when: 'Nov 2026 - Feb 2027',
    title: 'IT Intern',
    where: 'Ipenet Solutions Sdn Bhd · George Town, Penang',
    text: 'Industrial training with a networking and network security systems integrator: technical support, remote and on site, with hands-on work on firewalls, switches and servers.',
    now: true,
  },
  {
    type: 'Education',
    when: 'Expected 2027',
    title: 'Bachelor of Information Technology (Hons) in Cyber Security',
    where: 'Universiti Poly-Tech Malaysia (UPTM)',
    text: 'CGPA 3.23. Coursework: Cybersecurity Operations, Digital Forensics, Network Security, Ethical Hacking and Penetration Testing, Artificial Intelligence, Database Systems.',
  },
  {
    type: 'Part-time',
    when: '2024 - present',
    title: 'Driver-Partner (self-employed)',
    where: 'Grab',
    text: 'Self-scheduled shifts around a full class and final year project timetable. Funds my own studies.',
  },
  {
    type: 'Education',
    when: '2022',
    title: 'Diploma in Computer and Networking',
    where: 'Kolej Poly-Tech MARA (KPTM)',
    text: 'Networking foundation, alongside the Cisco CCNA course series.',
  },
  {
    type: 'Part-time',
    when: '2022',
    title: 'Service Crew',
    where: 'Penang Chendul',
    text: 'Front-line food and beverage service through peak-hour queues.',
  },
  {
    type: 'Part-time',
    when: '2019 - present',
    title: 'Event Sales',
    where: 'Forward Rugby Wear',
    text: "Help run the sales booth at rugby tournaments for a former teacher's apparel business.",
  },
]

export type Project = {
  id: string
  title: string
  kind: string
  badge: string
  status: string
  text: string
  points?: string[]
  stats?: { value: string; label: string }[]
  stack: string[]
  links: { label: string; href: string; icon: 'external' | 'github' }[]
  note?: string
  shot?: string
  shotAlt?: string
  shot2?: string
  url?: string
  acc: string
  visual?: 'stretch'
}

export const projects: Project[] = [
  {
    id: 'attackmapper',
    title: 'AttackMapper',
    kind: 'Security log analyzer with MITRE ATT&CK mapping',
    badge: 'Final Year Project',
    status: 'Live',
    text: 'A web application that reads security logs, detects the attacks in them, maps each one to an ATT&CK technique and writes a PDF incident report. Built with a Malaysian SOC service provider as the industry client and revised after their analysts reviewed it.',
    points: [
      'Every finding shows the log line that triggered it, so an analyst can check the result.',
      'Severity reflects the outcome: a blocked attack is rated lower than one that succeeded.',
    ],
    stats: [
      { value: '68', label: 'detection rules' },
      { value: '66', label: 'ATT&CK techniques' },
      { value: '89/89', label: 'test attack logs detected' },
      { value: '0', label: 'alerts on 65 benign logs' },
    ],
    stack: ['Python', 'Flask', 'MySQL / SQLite', 'scikit-learn', 'ReportLab'],
    links: [
      { label: 'Live demo', href: 'https://attackmapper.pythonanywhere.com', icon: 'external' },
      { label: 'Source', href: 'https://github.com/familyhakimi25-bit/attackmapper', icon: 'github' },
    ],
    note: 'Demo needs a free sign-up and runs the rule engine only. A machine learning classifier adds a second opinion in the full version.',
    shot: '/shots/dashboard.webp',
    shotAlt: 'AttackMapper threat report dashboard showing a critical finding mapped to an ATT&CK technique',
    shot2: '/shots/framework.webp',
    url: 'attackmapper.pythonanywhere.com',
    acc: '94, 240, 255',
  },
  {
    id: 'gelanggang',
    title: 'GELANGGANG',
    kind: 'Cyber security training arena',
    badge: 'Side project',
    status: 'Runs locally',
    text: 'A practice platform where every challenge is regenerated from a seed, so you learn the skill instead of memorising answers. 30 challenge generators in 8 categories at 3 difficulty levels, plus a timed exam mode. No answers are stored in the database.',
    stack: ['Python', 'Flask', 'SQLite'],
    links: [{ label: 'Source', href: 'https://github.com/familyhakimi25-bit/gelanggang', icon: 'github' }],
    shot: '/shots/gelanggang.webp',
    shotAlt: 'GELANGGANG practice page listing challenge generators by category and difficulty',
    shot2: '/shots/gelanggang-challenge.webp',
    url: 'localhost · gelanggang',
    acc: '157, 123, 255',
  },
  {
    id: 'slotkita',
    title: 'SlotKita',
    kind: 'Booking platform for small shops',
    badge: 'Side project',
    status: 'Built, not launched yet',
    text: 'One platform, many shops, monthly plans. Payment status is always verified with the gateway and the callback hash is checked, so a forged callback cannot mark a bill as paid. Billing, booking and referral logic are covered by 35 automated checks.',
    stack: ['PHP', 'MySQL', 'ToyyibPay'],
    links: [{ label: 'Source', href: 'https://github.com/familyhakimi25-bit/slotkita', icon: 'github' }],
    shot: '/shots/slotkita.webp',
    shotAlt: 'SlotKita landing page with a phone mock-up of the shop booking flow',
    shot2: '/shots/slotkita-demo.webp',
    url: 'localhost · slotkita',
    acc: '255, 138, 76',
  },
  {
    id: 'barbershop',
    title: 'Barbershop booking system',
    kind: 'Hardening and deployment',
    badge: 'Deployment',
    status: 'Live',
    text: 'Took an existing PHP booking system and prepared it for production: CSRF protection on every form, login rate limiting, hardened session cookies, security headers, and a QR based staff attendance scanner. Deployed on free hosting with HTTPS.',
    stack: ['PHP', 'MariaDB', 'JavaScript'],
    links: [{ label: 'Visit site', href: 'https://barbershophesmes.site.je', icon: 'external' }],
    shot: '/shots/barbershop.webp',
    shotAlt: 'Home page of the live barbershop booking site',
    url: 'barbershophesmes.site.je',
    acc: '230, 192, 122',
  },
  {
    id: 'videostretch',
    title: 'Video Stretch',
    kind: 'Chrome extension',
    badge: 'Personal tool',
    status: 'v1.7',
    text: 'Fills an ultrawide monitor with video on sites where existing extensions did not work. One shortcut cycles stretch, crop and original, and the choice is remembered per site.',
    stack: ['JavaScript', 'Chrome Extensions', 'CSS'],
    links: [{ label: 'Source', href: 'https://github.com/familyhakimi25-bit/video-stretch', icon: 'github' }],
    acc: '255, 122, 217',
    visual: 'stretch',
  },
]

export const labs = [
  {
    id: 'lab-01',
    slug: 'penetration-test',
    tag: 'Penetration test',
    title: 'Student grade management web app',
    course: 'NWC3293 Ethical Hacking and Penetration Testing · individual',
    facts: [
      ['target', 'PHP/MySQL web application, attacked from Kali Linux'],
      ['method', 'reconnaissance, scanning, gaining access'],
      ['result', 'admin dashboard reached through weak credentials and missing brute-force protection'],
      ['output', 'a countermeasure written for every finding'],
    ],
    tools: ['nmap', 'Nikto', 'dirb', 'WhatWeb', 'Hydra', 'Burp Suite', 'John the Ripper'],
  },
  {
    id: 'lab-02',
    slug: 'sql-injection',
    tag: 'Web attack and defence',
    title: 'SQL injection: sqlmap against DVWA',
    course: 'NWC4323 Cybersecurity Operations',
    facts: [
      ['target', 'DVWA on a local lab server'],
      ['chain', 'detection, enumeration, credential dump, hash cracking'],
      ['retest', 'the identical attack against a hardened configuration'],
      ['result', 'prepared statements stopped it'],
    ],
    tools: ['sqlmap', 'DVWA', 'XAMPP', 'MariaDB'],
  },
  {
    id: 'lab-03',
    slug: 'syn-flood',
    tag: 'Network attack lab',
    title: 'TCP SYN flood in an isolated lab',
    course: 'NWC4253 Lab Project · individual',
    facts: [
      ['setup', 'attacker and target on a closed VirtualBox network'],
      ['impact', 'half-open backlog pinned, client latency up 4 to 9 times'],
      ['finding', 'one host degrades a modern Linux server but does not take it down'],
      ['defence', 'SYN cookies defeat the flood'],
    ],
    tools: ['hping3', 'tcpdump', 'Kali Linux', 'Apache', 'VirtualBox'],
  },
  {
    id: 'lab-04',
    slug: 'digital-forensics',
    tag: 'Digital forensics',
    title: 'Windows, browser and network artefacts',
    course: 'NWC4343 Digital Forensics',
    facts: [
      ['host', 'Windows Registry and Kali Linux system artefacts recovered'],
      ['browser', 'history examined with Chromensics and Browser History Examiner'],
      ['network', 'sessions reconstructed from captured traffic with Xplico'],
    ],
    tools: ['Registry analysis', 'Chromensics', 'Browser History Examiner', 'Xplico'],
  },
]
