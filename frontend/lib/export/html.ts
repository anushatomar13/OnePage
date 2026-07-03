import type { Portfolio } from "@/lib/types";
import { getAccent, type EditorTheme } from "@/lib/theme";

/** Escape text for safe interpolation into HTML. */
function esc(s: string | undefined | null): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(s: string | undefined | null): string {
  return esc(s).replace(/'/g, "&#39;");
}

/** The self-contained stylesheet powering the exported portfolio. */
export function css(theme: EditorTheme): string {
  const accent = getAccent(theme.accentId);
  const headingFont =
    theme.font === "serif"
      ? "'Instrument Serif', Georgia, serif"
      : "'Inter', system-ui, sans-serif";
  const headingStyle = theme.font === "serif" ? "font-style: italic;" : "";
  return `
:root{
  --bg:#050505; --fg:#ededed; --muted:#8a8a8f; --card:#0d0d0f;
  --border:rgba(255,255,255,.08); --border-strong:rgba(255,255,255,.14);
  --primary:${accent.primary}; --g1:${accent.grad[0]}; --g2:${accent.grad[1]}; --g3:${accent.grad[2]};
  --heading:${headingFont};
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--fg);font-family:'Inter',system-ui,-apple-system,sans-serif;
  line-height:1.6;-webkit-font-smoothing:antialiased;letter-spacing:-.01em;overflow-x:hidden}
::selection{background:color-mix(in srgb,var(--primary) 40%,transparent)}
a{color:inherit;text-decoration:none}
img{max-width:100%}

.bg{position:fixed;inset:0;z-index:-1;overflow:hidden;background:var(--bg)}
.bg::before,.bg::after{content:'';position:absolute;width:70vh;height:70vh;border-radius:50%;filter:blur(80px);opacity:.4}
.bg::before{top:-15%;left:50%;transform:translateX(-50%);background:radial-gradient(circle,var(--g1),transparent 60%)}
.bg::after{bottom:-15%;right:0;background:radial-gradient(circle,var(--g3),transparent 60%);opacity:.28}

section{min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  padding:6rem 1.5rem;max-width:64rem;margin:0 auto}
@media(min-width:640px){section{padding:6rem 2.5rem}}
.top{justify-content:flex-start;padding-top:7rem}

.eyebrow{font-family:'Inter',monospace;font-size:.75rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
.eyebrow.accent{color:color-mix(in srgb,var(--primary) 85%,white)}
h1,h2,h3{font-family:var(--heading);${headingStyle}letter-spacing:-.03em;font-weight:500;line-height:1.02}
.display{font-size:clamp(2.75rem,8vw,6rem);line-height:.98}
.headline{font-size:clamp(2rem,5vw,3.5rem);margin-top:1rem}
.lead{margin-top:2rem;max-width:42rem;font-size:1.15rem;color:var(--muted)}
.grad{background:linear-gradient(100deg,var(--g1),var(--g2),var(--g3));-webkit-background-clip:text;background-clip:text;color:transparent}

.glass{background:color-mix(in srgb,var(--card) 70%,transparent);backdrop-filter:blur(20px);
  border:1px solid var(--border);border-radius:1.25rem}
.card{padding:1.5rem;transition:transform .3s,border-color .3s}
.card:hover{transform:translateY(-3px);border-color:var(--border-strong)}

.heading-block{margin-bottom:3.5rem}
.links{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2.5rem}
.icon{width:2.75rem;height:2.75rem;display:grid;place-items:center;border-radius:50%;color:var(--muted);transition:.3s}
.icon:hover{color:color-mix(in srgb,var(--primary) 85%,white);border-color:var(--border-strong);transform:translateY(-2px)}
.icon svg{width:1.25rem;height:1.25rem}

.tl{position:relative;border-left:1px solid var(--border);padding-left:2.25rem}
@media(min-width:640px){.tl{padding-left:3rem}}
.tl-item{position:relative;margin-bottom:2rem}
.node{position:absolute;left:-2.25rem;top:1.5rem;transform:translateX(-50%);width:2.25rem;height:2.25rem;
  display:grid;place-items:center;border-radius:50%;border:1px solid var(--border);background:var(--bg);color:var(--primary)}
@media(min-width:640px){.node{left:-3rem}}
.node.dot{width:.75rem;height:.75rem;top:1.75rem;border:2px solid var(--bg);background:var(--primary);box-shadow:0 0 12px -1px var(--g1)}
.when{font-family:monospace;font-size:.75rem;letter-spacing:.05em;text-transform:uppercase;color:color-mix(in srgb,var(--primary) 80%,white)}
.card h3{font-size:1.35rem;margin-top:.4rem}
.sub{color:var(--muted);font-size:.9rem;margin-top:.2rem}
.bullets{list-style:none;margin-top:1.25rem;display:flex;flex-direction:column;gap:.65rem}
.bullets li{display:flex;gap:.75rem;color:var(--muted);font-size:.9rem}
.bullets li::before{content:'';flex:none;width:1rem;height:1px;margin-top:.7rem;background:color-mix(in srgb,var(--primary) 60%,transparent)}

.tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}
.tag{border:1px solid var(--border);background:rgba(255,255,255,.03);border-radius:999px;
  padding:.25rem .75rem;font-size:.8rem;color:var(--muted);transition:.3s}
.tag:hover{border-color:color-mix(in srgb,var(--primary) 50%,transparent);color:var(--fg);transform:translateY(-2px)}

.grid{display:grid;gap:1.25rem}
@media(min-width:640px){.grid.two{grid-template-columns:1fr 1fr}}
.proj-img{aspect-ratio:16/10;border-bottom:1px solid var(--border);position:relative;overflow:hidden;
  display:grid;place-items:center}
.proj-img::before{content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 30% 20%,var(--g1),transparent 55%),radial-gradient(circle at 80% 90%,var(--g3),transparent 55%);opacity:.22}
.proj-img span{font-family:var(--heading);font-style:italic;font-size:4rem;color:rgba(255,255,255,.14)}

.skill-row{display:grid;gap:1rem;padding-top:1.5rem;border-top:1px solid var(--border)}
@media(min-width:640px){.skill-row{grid-template-columns:200px 1fr}}
.skill-cat{font-family:monospace;font-size:.85rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}

.contact-grid{display:grid;gap:3rem;align-items:center}
@media(min-width:900px){.contact-grid{grid-template-columns:1fr 1fr}}
.contact-line{display:flex;align-items:center;gap:.75rem;margin-top:.75rem;transition:.2s}
.contact-line:hover{color:color-mix(in srgb,var(--primary) 85%,white)}
.contact-line svg{width:1rem;height:1rem;color:var(--primary)}
.field{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:.75rem;
  padding:.75rem 1rem;color:var(--fg);font:inherit;font-size:.9rem;margin-bottom:.75rem}
.field:focus{outline:none;border-color:color-mix(in srgb,var(--primary) 50%,transparent)}
.btn{width:100%;border:none;border-radius:999px;padding:.85rem;font:inherit;font-weight:500;cursor:pointer;
  background:var(--fg);color:var(--bg);transition:.3s}
.btn:hover{opacity:.9}

.center{text-align:center;align-items:center}
.footer{position:absolute;bottom:2rem;left:0;right:0;text-align:center;font-family:monospace;
  font-size:.75rem;color:rgba(255,255,255,.35)}

.reveal{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}
`.trim();
}

const ICONS: Record<string, string> = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.33-1.74-1.33-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z"/></svg>',
  website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
};

function linksHtml(p: Portfolio): string {
  const l = p.hero.links;
  const items: string[] = [];
  const add = (key: string, href: string, label: string) =>
    items.push(
      `<a class="icon glass" href="${escAttr(href)}" target="_blank" rel="noreferrer" aria-label="${escAttr(label)}" title="${escAttr(label)}">${ICONS[key]}</a>`,
    );
  if (l.email) add("email", `mailto:${l.email}`, "Email");
  if (l.phone) add("phone", `tel:${l.phone}`, "Phone");
  if (l.linkedin) add("linkedin", l.linkedin, "LinkedIn");
  if (l.github) add("github", l.github, "GitHub");
  if (l.website) add("website", l.website, "Website");
  return items.length ? `<div class="links">${items.join("")}</div>` : "";
}

function heading(eyebrow: string, title: string): string {
  return `<div class="heading-block reveal"><p class="eyebrow accent">${esc(eyebrow)}</p><h2 class="headline">${esc(title)}</h2></div>`;
}

const SECTIONS: Record<string, (p: Portfolio) => string> = {
  hero: (p) => {
    const meta = [p.hero.role, p.hero.location].filter(Boolean).map(esc).join("  ·  ");
    return `<section id="hero" class="center">
      ${meta ? `<p class="eyebrow">${meta}</p>` : ""}
      <h1 class="display" style="margin-top:1.5rem">${esc(p.hero.name)}</h1>
      ${p.hero.intro ? `<p class="lead" style="margin-left:auto;margin-right:auto">${esc(p.hero.intro)}</p>` : ""}
      ${linksHtml(p)}
    </section>`;
  },
  education: (p) =>
    `<section id="education" class="top">${heading("Education", "Education")}
      <div class="tl">${p.education
        .map(
          (e) => `<div class="tl-item reveal">
        <span class="node"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg></span>
        <div class="glass card">
          ${e.duration ? `<p class="when">${esc(e.duration)}</p>` : ""}
          <h3>${esc(e.institution)}</h3>
          ${e.degree ? `<p class="sub">${esc(e.degree)}</p>` : ""}
          <div class="tags">${e.cgpa ? `<span class="tag">CGPA ${esc(e.cgpa)}</span>` : ""}${e.location ? `<span class="tag">${esc(e.location)}</span>` : ""}${(e.coursework ?? []).map((c) => `<span class="tag">${esc(c)}</span>`).join("")}</div>
        </div></div>`,
        )
        .join("")}</div></section>`,
  experience: (p) =>
    `<section id="experience" class="top">${heading("Experience", "Experience")}
      <div class="tl">${p.experience
        .map(
          (x) => `<div class="tl-item reveal">
        <span class="node dot"></span>
        <div class="glass card">
          <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap">
            <div><h3>${esc(x.role || x.company)}</h3>${x.role ? `<p class="sub">${esc(x.company)}${x.location ? " · " + esc(x.location) : ""}</p>` : ""}</div>
            ${x.duration ? `<p class="when">${esc(x.duration)}</p>` : ""}
          </div>
          ${x.achievements.length ? `<ul class="bullets">${x.achievements.map((a) => `<li><span>${esc(a)}</span></li>`).join("")}</ul>` : ""}
          ${x.tech?.length ? `<div class="tags">${x.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
        </div></div>`,
        )
        .join("")}</div></section>`,
  projects: (p) =>
    `<section id="projects" class="top">${heading("Selected work", "Projects")}
      <div class="grid ${p.projects.length > 1 ? "two" : ""}">${p.projects
        .map(
          (pr) => `<div class="glass card reveal" style="padding:0;overflow:hidden;display:flex;flex-direction:column">
        <div class="proj-img"><span>${esc(pr.name.charAt(0).toUpperCase())}</span></div>
        <div style="padding:1.5rem">
          <h3 style="font-size:1.15rem">${esc(pr.name)}</h3>
          ${pr.description ? `<p class="sub" style="margin-top:.5rem">${esc(pr.description)}</p>` : ""}
          <div class="tags">${(pr.tech ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="tags">${pr.github ? `<a class="tag" href="${escAttr(pr.github)}" target="_blank" rel="noreferrer">GitHub ↗</a>` : ""}${pr.demo ? `<a class="tag" href="${escAttr(pr.demo)}" target="_blank" rel="noreferrer">Live demo ↗</a>` : ""}</div>
        </div></div>`,
        )
        .join("")}</div></section>`,
  skills: (p) =>
    `<section id="skills" class="top">${heading("Capabilities", "Skills")}
      <div style="display:flex;flex-direction:column;gap:2rem">${p.skills
        .map(
          (g) => `<div class="skill-row reveal"><p class="skill-cat">${esc(g.category)}</p>
        <div class="tags" style="margin-top:0">${g.items.map((it) => `<span class="tag">${esc(it)}</span>`).join("")}</div></div>`,
        )
        .join("")}</div></section>`,
  achievements: (p) =>
    `<section id="achievements" class="top">${heading("Recognition", "Achievements")}
      <div class="grid ${p.achievements.length > 1 ? "two" : ""}">${p.achievements
        .map(
          (a) => `<div class="glass card reveal">
        <h3 style="font-size:1.05rem">${esc(a.title)}</h3>
        <p class="when" style="margin-top:.4rem">${esc(a.kind)}${a.date ? " · " + esc(a.date) : ""}</p>
        ${a.description ? `<p class="sub" style="margin-top:.5rem">${esc(a.description)}</p>` : ""}
      </div>`,
        )
        .join("")}</div></section>`,
  contact: (p) => {
    const l = p.hero.links;
    return `<section id="contact"><div class="contact-grid">
      <div>${heading("Get in touch", "Let's build something.")}
        <p class="lead" style="margin-top:0">Have a role, a project, or just want to say hello? My inbox is always open.</p>
        ${l.email ? `<a class="contact-line" href="mailto:${escAttr(l.email)}">${ICONS.email}${esc(l.email)}</a>` : ""}
        ${l.phone ? `<a class="contact-line" href="tel:${escAttr(l.phone)}">${ICONS.phone}${esc(l.phone)}</a>` : ""}
        ${linksHtml(p)}
      </div>
      <form class="glass" style="padding:2rem" ${l.email ? `action="mailto:${escAttr(l.email)}" method="post" enctype="text/plain"` : ""}>
        <input class="field" name="name" placeholder="Your name" aria-label="Your name" required>
        <input class="field" name="email" type="email" placeholder="Your email" aria-label="Your email" required>
        <textarea class="field" name="message" rows="4" placeholder="Your message" aria-label="Your message" required></textarea>
        <button class="btn" type="submit">Send message</button>
      </form></div></section>`;
  },
  thankyou: (p) =>
    `<section id="thankyou" class="center">
      <p class="eyebrow">That's a wrap</p>
      <h2 class="display" style="margin-top:1.5rem">Thank<span class="grad"> you</span>.</h2>
      <p class="lead" style="margin-left:auto;margin-right:auto">Thanks for scrolling all the way through.</p>
      <p class="footer">© ${new Date().getFullYear()} ${esc(p.hero.name)} · Crafted with onepage</p>
    </section>`,
};

/** Render just the <body> content for the given portfolio. */
export function renderBody(p: Portfolio): string {
  const visible = p.sectionOrder.filter((id) => {
    if (["hero", "contact", "thankyou"].includes(id)) return true;
    const arr = (p as unknown as Record<string, unknown[]>)[id];
    return Array.isArray(arr) && arr.length > 0;
  });
  return `<div class="bg"></div>${visible.map((id) => SECTIONS[id]?.(p) ?? "").join("\n")}`;
}

const REVEAL_SCRIPT = `<script>
document.addEventListener('DOMContentLoaded',function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
});
</script>`;

/** Build a complete, self-contained portfolio HTML document. */
export function buildStandaloneHtml(p: Portfolio, theme: EditorTheme): string {
  const title = esc(p.meta.title || `${p.hero.name} — ${p.hero.role}`);
  const desc = escAttr(p.meta.description || p.hero.intro || `${p.hero.name}'s portfolio.`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#050505">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>${css(theme)}</style>
</head>
<body>
${renderBody(p)}
${REVEAL_SCRIPT}
</body>
</html>`;
}
