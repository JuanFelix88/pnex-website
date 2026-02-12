"use client";

import { useState } from "react";

/* ─── PALETTE ─── */
const c = {
  bg: "#1c1917", // stone-900 / Very dark warm gray
  bgAlt: "#292524", // stone-800
  surface: "#292524", // stone-800
  surfaceHover: "#44403c", // stone-700
  border: "#44403c", // stone-700
  borderLight: "#57534e", // stone-600
  text: "#e7e5e4", // stone-200
  textMuted: "#a8a29e", // stone-400
  textDim: "#78716c", // stone-500
  accent: "#c4a882", // pastel brown
  accentLight: "#dcd0c0", // lighter pastel
  accentDim: "#8c7658", // dimmer brown
  success: "#86efac",
};

/* ─── DATA ─── */

const features = [
  {
    icon: "💬",
    title: "Agent-to-Agent Protocol",
    desc: "A standardized communication layer for AI agents. Send structured commands, share context, and coordinate tasks seamlessly.",
  },
  {
    icon: "🔌",
    title: "Universal Integrations",
    desc: "Connect your agents to Slack, Discord, Email, GitHub, and custom webhooks with a single unified CLI.",
  },
  {
    icon: "🧠",
    title: "Skill Coordination",
    desc: "Discover and invoke skills across different agents. Build complex workflows by chaining capabilities together.",
  },
  {
    icon: "🔒",
    title: "Secure Channels",
    desc: "End-to-end encrypted communication channels. Ensure your agent's internal dialogue remains private and secure.",
  },
];

const useCases = [
  {
    id: "notify",
    label: "Notifications",
    cmd: 'pnex send --to slack:#alerts --msg "Deployment success" --level info',
    desc: "Dispatch notifications to any connected channel from your agent scripts.",
  },
  {
    id: "webhook",
    label: "Webhooks",
    cmd: "pnex hook create --url https://api.myapp.com/events --secret ****",
    desc: "Receive external events and route them to specific agent handlers.",
  },
  {
    id: "skills",
    label: "Skill Share",
    cmd: "pnex skills publish ./skills/data-analysis.json --registry public",
    desc: "Publish your agent's capabilities so others can discover and utilize them.",
  },
];

/* ─── ASCII ART ─── */
const asciiLogo = `
  _ __  _ __   _____  __
 | '_ \\| '_ \\ / _ \\ \\/ /
 | |_) | | | |  __/>  < 
 | .__/|_| |_|\\___/_/\\_\\
 |_|                    
`;

/* ─── STYLES & ANIMATIONS ─── */
const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  
  ::selection {
    background: ${c.accent};
    color: ${c.bg};
  }
  
  html {
    scroll-behavior: smooth;
  }
`;

/* ─── COMPONENTS ─── */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        color: c.textMuted,
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 500,
        transition: "color 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = c.accent)}
      onMouseOut={(e) => (e.currentTarget.style.color = c.textMuted)}
    >
      {children}
    </a>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#0c0a09", // almost black
        border: `1px solid ${c.border}`,
        borderRadius: "8px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "14px",
        position: "relative",
      }}
      className="code-block"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          overflowX: "auto",
        }}
      >
        <span style={{ color: c.accentDim, userSelect: "none" }}>$</span>
        <span style={{ color: c.text }}>{code}</span>
      </div>
      <button
        onClick={handleCopy}
        style={{
          background: "transparent",
          border: "none",
          color: copied ? c.success : c.textDim,
          cursor: "pointer",
          fontSize: "12px",
          marginLeft: "16px",
          transition: "color 0.2s",
        }}
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

/* ─── PAGE ─── */

export default function PnexLanding() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        backgroundColor: c.bg,
        color: c.text,
        minHeight: "100vh",
        fontFamily: "var(--font-geist-sans), sans-serif",
        overflowX: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* HEADER */}
      <header
        style={{
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{ fontWeight: 800, fontSize: "24px", letterSpacing: "-1px" }}
        >
          pnex
        </div>
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#cli">CLI</NavLink>
          <NavLink href="https://github.com/subject-matter/pnex">
            GitHub
          </NavLink>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "80px 24px 120px",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Background Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "400px",
              background: `radial-gradient(ellipse at center, ${c.accent}15 0%, transparent 70%)`,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <pre
              className="animate-fade-in-up"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                color: c.accent,
                fontSize: "12px",
                lineHeight: "1.2",
                marginBottom: "32px",
                opacity: 0,
              }}
            >
              {asciiLogo}
            </pre>

            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: "24px",
                opacity: 0,
              }}
            >
              The CLI for <br />
              <span style={{ color: c.accent }}>Agent Communication</span>.
            </h1>

            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: "20px",
                color: c.textMuted,
                maxWidth: "600px",
                margin: "0 auto 48px",
                lineHeight: 1.6,
                opacity: 0,
              }}
            >
              Coordinate AI agents, integrate with external tools, and manage
              skills. Open source, free, and built for the future of work.
            </p>

            <div
              className="animate-fade-in-up delay-300"
              style={{
                maxWidth: "400px",
                margin: "0 auto",
                opacity: 0,
              }}
            >
              <CodeBlock code="npm install -g pnex" />
              <p
                style={{
                  marginTop: "16px",
                  color: c.textDim,
                  fontSize: "14px",
                }}
              >
                Requires Node.js 18+
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section
          id="features"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                background: c.bgAlt,
                border: `1px solid ${c.border}`,
                borderRadius: "12px",
                padding: "32px",
                transition: "transform 0.2s, border-color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = c.accentDim;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = c.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "20px" }}>
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: c.textMuted, lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </section>

        {/* USE CASES / CLI PREVIEW */}
        <section
          id="cli"
          style={{
            background: c.bgAlt,
            padding: "100px 24px",
            borderTop: `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  marginBottom: "16px",
                }}
              >
                Powerful commands
              </h2>
              <p style={{ color: c.textMuted, fontSize: "18px" }}>
                Designed for both humans and agents.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}
            >
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {useCases.map((useCase, index) => (
                  <button
                    key={useCase.id}
                    onClick={() => setActiveTab(index)}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "999px",
                      border: `1px solid ${activeTab === index ? c.accent : c.border}`,
                      background:
                        activeTab === index ? `${c.accent}15` : "transparent",
                      color: activeTab === index ? c.accent : c.textMuted,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}
                  >
                    {useCase.label}
                  </button>
                ))}
              </div>

              {/* Terminal Window */}
              <div
                style={{
                  background: "#151312",
                  borderRadius: "12px",
                  border: `1px solid ${c.border}`,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Traffic Lights */}
                <div
                  style={{
                    background: c.surface,
                    padding: "12px 16px",
                    display: "flex",
                    gap: "8px",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  {["#ef4444", "#eab308", "#22c55e"].map((color) => (
                    <div
                      key={color}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "32px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "14px",
                    minHeight: "140px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span style={{ color: c.accent }}>agent@pnex:~$</span>
                    <span style={{ color: c.text }}>
                      {useCases[activeTab].cmd}
                    </span>
                  </div>
                  <div style={{ color: c.textDim, lineHeight: 1.6 }}>
                    # {useCases[activeTab].desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            padding: "60px 24px",
            textAlign: "center",
            color: c.textDim,
            fontSize: "14px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontWeight: 700, color: c.textMuted }}>pnex</span>{" "}
            &mdash; Free for everyone.
          </div>
          <p>&copy; {new Date().getFullYear()} Subject Matter.</p>
        </footer>
      </main>
    </div>
  );
}
