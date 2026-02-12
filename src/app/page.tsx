"use client";

import { useState } from "react";

/* ─── PALETTE ─── */
const c = {
  bg: "#1c1917", // very dark warm gray (stone-900)
  bgAlt: "#231f1c", // slightly lighter warm dark
  surface: "#292524", // stone-800
  surfaceHover: "#33302d",
  border: "#44403c", // stone-700
  borderLight: "#57534e", // stone-600
  text: "#e7e5e4", // stone-200
  textMuted: "#a8a29e", // stone-400
  textDim: "#78716c", // stone-500
  accent: "#c4a882", // pastel brown / warm tan
  accentLight: "#d4c4aa",
  accentDim: "#a68c6a",
  highlight: "#e8d5b7", // light pastel cream
  codeGreen: "#a3be8c",
  codeBlue: "#88c0d0",
  codePurple: "#b48ead",
  codeYellow: "#ebcb8b",
};

/* ─── DATA ─── */

const useCases = [
  {
    label: "Notifications",
    command: 'pnex send --to slack:#ops --msg "Deploy complete ✓"',
    description:
      "Push real-time notifications from your agents to any channel. Supports templated messages with dynamic context injection.",
  },
  {
    label: "Webhooks",
    command: "pnex hook register --url https://api.example.com/events",
    description:
      "Register incoming and outgoing webhooks with automatic retry, signature verification, and payload transformation.",
  },
  {
    label: "Skill Sync",
    command: "pnex skills sync --agent my-agent --registry global",
    description:
      "Synchronize skill definitions across agents and registries. Keep your entire fleet aligned with a single command.",
  },
  {
    label: "Pipelines",
    command: "pnex pipe create --from ingest --to process --to notify",
    description:
      "Chain multiple steps into observable pipelines. Each stage is logged, timed, and retryable independently.",
  },
];

const installSteps = [
  { cmd: "npm install -g pnex", comment: "# Install globally" },
  { cmd: "pnex init", comment: "# Initialize in your project" },
  { cmd: "pnex connect --agent my-agent", comment: "# Connect your agent" },
  {
    cmd: 'pnex send --to slack:#general --msg "Hello from pnex!"',
    comment: "# Send your first message",
  },
];

/* ─── STYLES ─── */

const keyframes = `
  @keyframes pnex-fade-in {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pnex-pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(196, 168, 130, 0.1); }
    50% { box-shadow: 0 0 40px rgba(196, 168, 130, 0.2); }
  }
  @keyframes pnex-cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes pnex-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .pnex-fade-in {
    animation: pnex-fade-in 0.6s ease-out both;
  }
  .pnex-fade-in-delay-1 {
    animation: pnex-fade-in 0.6s ease-out 0.1s both;
  }
  .pnex-fade-in-delay-2 {
    animation: pnex-fade-in 0.6s ease-out 0.2s both;
  }
  .pnex-fade-in-delay-3 {
    animation: pnex-fade-in 0.6s ease-out 0.3s both;
  }
`;

/* ─── ASCII ART ─── */

const asciiArt = `
██████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗████╗  ██║██╔════╝╚██╗██╔╝
██████╔╝██╔██╗ ██║█████╗   ╚███╔╝ 
██╔═══╝ ██║╚██╗██║██╔══╝   ██╔██╗ 
██║     ██║ ╚████║███████╗██╔╝ ██╗
╚═╝     ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝`.trim();

/* ─── COMPONENTS ─── */

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: `1px solid ${c.border}`,
          background: c.bgAlt,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ef4444",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#eab308",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22c55e",
              opacity: 0.7,
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--font-geist-mono), monospace",
            color: c.textDim,
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </span>
        <div style={{ width: 42 }} />
      </div>
      <div
        style={{
          padding: "20px 24px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 13,
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

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
        fontSize: 14,
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 16px",
        borderRadius: 9999,
        border: `1px solid ${c.border}`,
        background: `${c.accent}10`,
        fontSize: 11,
        fontWeight: 600,
        color: c.accent,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: c.accent,
        }}
      />
      {children}
    </span>
  );
}

/* ─── PAGE ─── */

export default function PnexPage() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        minHeight: "100vh",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      {/* ── HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: `${c.bg}e6`,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${c.border}40`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: 64,
          }}
        >
          <a
            href="/saas-ex"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 800,
                fontSize: 20,
                color: c.text,
                letterSpacing: "-0.02em",
              }}
            >
              pnex
            </span>
            <span
              style={{
                fontSize: 10,
                color: c.textDim,
                border: `1px solid ${c.border}`,
                borderRadius: 4,
                padding: "2px 6px",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              v0.1
            </span>
          </a>

          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#use-cases">Use Cases</NavLink>
            <NavLink href="#get-started">Get Started</NavLink>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 8,
                background: c.accent,
                color: c.bg,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = c.accentLight;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = c.accent;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ★ Star on GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            paddingTop: 160,
            paddingBottom: 100,
            overflow: "hidden",
          }}
        >
          {/* Gradient orbs */}
          <div
            style={{
              position: "absolute",
              top: 80,
              left: "20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${c.accent}12, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -100,
              right: "10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${c.accentDim}08, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 32px",
              textAlign: "center",
            }}
          >
            <div className="pnex-fade-in">
              <Badge>Free & Open Source CLI Tool</Badge>
            </div>

            {/* ASCII art */}
            <pre
              className="pnex-fade-in-delay-1"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "clamp(6px, 1.6vw, 14px)",
                lineHeight: 1.2,
                color: c.accent,
                margin: "40px auto 32px",
                letterSpacing: "0.02em",
                textShadow: `0 0 30px ${c.accent}40`,
                userSelect: "none",
                overflow: "hidden",
              }}
            >
              {asciiArt}
            </pre>

            <p
              className="pnex-fade-in-delay-2"
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                color: c.textMuted,
                maxWidth: 600,
                margin: "0 auto 16px",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              The CLI for AI agent communications,
              <br />
              integrations, and skill coordination.
            </p>

            <p
              className="pnex-fade-in-delay-3"
              style={{
                fontSize: 15,
                color: c.textDim,
                maxWidth: 500,
                margin: "0 auto 48px",
                lineHeight: 1.6,
              }}
            >
              One tool to connect, route, and observe everything your AI agents
              say and do. Totally free.
            </p>

            {/* Install command */}
            <div
              className="pnex-fade-in-delay-3"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: c.surface,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                padding: "14px 24px",
                animation: "pnex-pulse-glow 3s ease-in-out infinite",
              }}
            >
              <span style={{ color: c.codeGreen, fontSize: 14 }}>$</span>
              <code
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  color: c.text,
                }}
              >
                npm install -g pnex
              </code>
              <button
                onClick={() => copyToClipboard("npm install -g pnex", -1)}
                style={{
                  background: "none",
                  border: `1px solid ${c.border}`,
                  borderRadius: 6,
                  padding: "4px 10px",
                  color: copiedIdx === -1 ? c.codeGreen : c.textDim,
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono), monospace",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = c.accent)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = c.border)
                }
              >
                {copiedIdx === -1 ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 48,
                marginTop: 64,
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "100%", label: "Free" },
                { value: "MIT", label: "Licensed" },
                { value: "0ms", label: "Vendor Lock-in" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: c.accent,
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: c.textDim,
                      marginTop: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, transparent, ${c.border}, transparent)`,
            }}
          />
        </div>

        {/* ── INTEGRATIONS ── */}
        <section
          id="features"
          style={{
            padding: "100px 32px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Badge>Integrations</Badge>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: c.text,
                marginTop: 20,
                marginBottom: 12,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Give life to your Agents
              <br />
              <span style={{ color: c.accent }}>with powerful connections</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: c.textMuted,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Connect your AI agents to the tools you use every day.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                category: "Chat Messages",
                icon: "chat",
                items: ["WhatsApp", "Telegram", "Discord", "Slack"],
                desc: "Send and receive messages on popular chat platforms directly from your agent logic.",
              },
              {
                category: "Task Management",
                icon: "check_circle",
                items: ["Todoist", "Trello", "Asana", "Jira"],
                desc: "Create tasks, update statuses, and move cards based on agent decisions.",
              },
              {
                category: "Email & Comms",
                icon: "mail",
                items: ["Gmail", "Outlook", "SendGrid", "SES"],
                desc: "Draft, send, and process emails with full thread context awareness.",
              },
            ].map((group) => (
              <div
                key={group.category}
                style={{
                  background: c.surface,
                  border: `1px solid ${c.border}`,
                  borderRadius: 16,
                  padding: 32,
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = c.accentDim;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 40px ${c.accent}15`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <span
                    className="material-icons"
                    style={{ fontSize: 28, color: c.accent }}
                  >
                    {group.icon}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: c.text }}>
                    {group.category}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: c.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {group.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: "auto",
                  }}
                >
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: 12,
                        color: c.textDim,
                        background: c.bgAlt,
                        border: `1px solid ${c.border}`,
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CORE CAPABILITIES ── */}
        <section
          style={{
            padding: "0 32px 100px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: `linear-gradient(145deg, ${c.surface} 0%, ${c.bg} 100%)`,
              border: `1px solid ${c.border}`,
              borderRadius: 24,
              padding: "64px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 300,
                height: 300,
                background: `radial-gradient(circle at top right, ${c.accent}10, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: c.text,
                  marginBottom: 48,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span className="material-icons" style={{ color: c.accent }}>
                  terminal
                </span>
                Core Capabilities
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 48,
                }}
              >
                {[
                  {
                    title: "Skills Management",
                    icon: "extension",
                    desc: "Register, discover, and execute agent skills. Treat capabilities as modular functions that can be shared across your agent fleet.",
                    cmd: "pnex skills list --filter 'image-*'",
                  },
                  {
                    title: "Global State Storage",
                    icon: "storage",
                    desc: "Persist state across sessions and commands. Set context in one pipeline step and retrieve it in another, or share state between agents.",
                    cmd: "pnex state set user:123:context '{...}'",
                  },
                  {
                    title: "Smart Notifications",
                    icon: "notifications_active",
                    desc: "Pub/Sub system for agent-to-human and agent-to-agent alerts. Decouple producers from consumers with persistent message queues.",
                    cmd: "pnex notify send --channel updates --msg 'Done'",
                  },
                ].map((cap) => (
                  <div key={cap.title} style={{ display: "flex", gap: 20 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${c.surfaceHover}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <span
                        className="material-icons"
                        style={{ color: c.textMuted, fontSize: 24 }}
                      >
                        {cap.icon}
                      </span>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: c.text,
                          marginBottom: 8,
                        }}
                      >
                        {cap.title}
                      </h4>
                      <p
                        style={{
                          fontSize: 15,
                          color: c.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}
                      >
                        {cap.desc}
                      </p>
                      <div
                        style={{
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          borderRadius: 8,
                          padding: "10px 14px",
                          fontSize: 13,
                          fontFamily: "var(--font-geist-mono), monospace",
                          color: c.textDim,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ color: c.codeGreen }}>$</span>
                        {cap.cmd}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, transparent, ${c.border}, transparent)`,
            }}
          />
        </div>

        {/* ── USE CASES ── */}
        <section
          id="use-cases"
          style={{
            padding: "100px 32px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Badge>Use Cases</Badge>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: c.text,
                marginTop: 20,
                marginBottom: 12,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              One tool,{" "}
              <span style={{ color: c.accent }}>infinite possibilities</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: c.textMuted,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              From simple notifications to complex multi-step pipelines, pnex
              adapts to your workflow.
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            {useCases.map((uc, i) => (
              <button
                key={uc.label}
                onClick={() => setActiveUseCase(i)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: `1px solid ${
                    activeUseCase === i ? c.accent : c.border
                  }`,
                  background:
                    activeUseCase === i ? `${c.accent}18` : "transparent",
                  color: activeUseCase === i ? c.accent : c.textMuted,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseOver={(e) => {
                  if (activeUseCase !== i) {
                    e.currentTarget.style.borderColor = c.borderLight;
                    e.currentTarget.style.color = c.text;
                  }
                }}
                onMouseOut={(e) => {
                  if (activeUseCase !== i) {
                    e.currentTarget.style.borderColor = c.border;
                    e.currentTarget.style.color = c.textMuted;
                  }
                }}
              >
                {uc.label}
              </button>
            ))}
          </div>

          {/* Active use case content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              alignItems: "center",
            }}
          >
            <TerminalWindow title="terminal">
              <div>
                <span style={{ color: c.codeGreen }}>$</span>{" "}
                <span style={{ color: c.text }}>
                  {useCases[activeUseCase].command}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 16,
                    background: c.accent,
                    marginLeft: 4,
                    verticalAlign: "middle",
                    animation: "pnex-cursor-blink 1s step-end infinite",
                  }}
                />
              </div>
              <div style={{ marginTop: 12, color: c.textDim, fontSize: 12 }}>
                <span style={{ color: c.codeGreen }}>✓</span> Connected
                &nbsp;&nbsp;
                <span style={{ color: c.codeBlue }}>⟶</span> Ready
              </div>
            </TerminalWindow>

            <div style={{ padding: "0 16px" }}>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: c.text,
                  marginBottom: 12,
                }}
              >
                {useCases[activeUseCase].label}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: c.textMuted,
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                {useCases[activeUseCase].description}
              </p>
              <a
                href="#get-started"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: c.accent,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "gap 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.gap = "10px")}
                onMouseOut={(e) => (e.currentTarget.style.gap = "6px")}
              >
                Try it now <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, transparent, ${c.border}, transparent)`,
            }}
          />
        </div>

        {/* ── GET STARTED ── */}
        <section
          id="get-started"
          style={{
            padding: "100px 32px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Badge>Get Started</Badge>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                color: c.text,
                marginTop: 20,
                marginBottom: 12,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Up and running in{" "}
              <span style={{ color: c.accent }}>4 commands</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: c.textMuted,
                maxWidth: 440,
                margin: "0 auto",
              }}
            >
              No accounts, no API keys, no setup wizards. Just install and go.
            </p>
          </div>

          <TerminalWindow title="~/ — bash">
            {installSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 0",
                }}
              >
                <div>
                  <span style={{ color: c.textDim, fontSize: 12 }}>
                    {step.comment}
                  </span>
                  <div style={{ marginTop: 2 }}>
                    <span style={{ color: c.codeGreen }}>$</span>{" "}
                    <span style={{ color: c.text }}>{step.cmd}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(step.cmd, i)}
                  style={{
                    background: "none",
                    border: `1px solid ${c.border}`,
                    borderRadius: 4,
                    padding: "2px 8px",
                    color: copiedIdx === i ? c.codeGreen : c.textDim,
                    fontSize: 10,
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono), monospace",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderColor = c.accent)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderColor = c.border)
                  }
                >
                  {copiedIdx === i ? "✓" : "copy"}
                </button>
              </div>
            ))}
          </TerminalWindow>
        </section>

        {/* ── CTA SECTION ── */}
        <section
          style={{
            padding: "80px 32px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at center, ${c.accent}08, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 800,
                color: c.text,
                marginBottom: 16,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to supercharge your
              <br />
              <span style={{ color: c.accent }}>agent communications?</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: c.textMuted,
                marginBottom: 40,
                lineHeight: 1.6,
              }}
            >
              Join the growing community of developers building the next
              generation of AI agent infrastructure.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: c.accent,
                  color: c.bg,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = c.accentLight;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${c.accent}30`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = c.accent;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get Started — It&apos;s Free
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: "transparent",
                  border: `1px solid ${c.border}`,
                  color: c.textMuted,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = c.accent;
                  e.currentTarget.style.color = c.accent;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.color = c.textMuted;
                }}
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: `1px solid ${c.border}`,
          padding: "60px 32px 40px",
          background: c.bgAlt,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 800,
                fontSize: 20,
                color: c.text,
                marginBottom: 12,
              }}
            >
              pnex
            </div>
            <p
              style={{
                fontSize: 13,
                color: c.textDim,
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              The open-source CLI for AI agent communications, integrations, and
              skill coordination. Free forever.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 20,
              }}
            >
              {["GitHub", "Discord", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: c.textDim,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = c.accent)}
                  onMouseOut={(e) => (e.currentTarget.style.color = c.textDim)}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Use Cases", "Docs", "Changelog"],
            },
            {
              title: "Developers",
              links: ["API Reference", "Plugins", "Contributing", "Roadmap"],
            },
            {
              title: "Community",
              links: ["Discord", "GitHub Discussions", "Blog", "Twitter"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: c.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 13,
                      color: c.textDim,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = c.accent)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = c.textDim)
                    }
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1200,
            margin: "40px auto 0",
            paddingTop: 24,
            borderTop: `1px solid ${c.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 12, color: c.textDim }}>
            © 2026 pnex. MIT License. Free forever.
          </span>
          <span
            style={{
              fontSize: 11,
              color: c.textDim,
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            built with ♥ for the agent ecosystem
          </span>
        </div>
      </footer>
    </div>
  );
}
