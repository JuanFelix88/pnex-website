"use client";

import { useState } from "react";

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

/* ─── ASCII ART ─── */

const asciiArt = `██████╗ ███╗   ██╗███████╗██╗  ██╗
██╔══██╗████╗  ██║██╔════╝╚██╗██╔╝
██████╔╝██╔██╗ ██║█████╗   ╚███╔╝ 
██╔═══╝ ██║╚██╗██║██╔══╝   ██╔██╗ 
██║     ██║ ╚████║███████╗██╔╝ ██╗
╚═╝     ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝`;

const asciiArtMobile = `██████╗ ██╗  ██╗
██╔══██╗╚██╗██╔╝
██████╔╝ ╚███╔╝ 
██╔═══╝  ██╔██╗ 
██║     ██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝`;

/* ─── COMPONENTS ─── */

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-pnex-border bg-pnex-surface">
      <div className="flex items-center justify-between border-b border-pnex-border bg-pnex-bg-alt px-3 py-2.5 sm:px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-[10px] tracking-wider text-pnex-text-dim sm:text-[11px]">
          {title}
        </span>
        <div className="w-8 sm:w-10" />
      </div>
      <div className="p-3 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px] sm:leading-[1.8]">
        {children}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-pnex-border bg-pnex-accent/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-pnex-accent sm:px-4 sm:text-[11px]">
      <span className="size-1.5 rounded-full bg-pnex-accent" />
      {children}
    </span>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── PAGE ─── */

export default function PnexPage() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-pnex-bg font-sans text-pnex-text">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      {/* ── HEADER ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-pnex-border/25 bg-pnex-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:h-16 sm:px-8">
          <a href="/" className="flex items-center gap-2 no-underline">
            <span className="font-mono text-lg font-extrabold tracking-tight text-pnex-text sm:text-xl">
              pnex
            </span>
            <span className="rounded border border-pnex-border px-1.5 py-0.5 font-mono text-[9px] text-pnex-text-dim sm:text-[10px]">
              v0.1
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            <a href="#features" className="text-sm font-medium text-pnex-text-muted transition-colors hover:text-pnex-accent">
              Features
            </a>
            <a href="#use-cases" className="text-sm font-medium text-pnex-text-muted transition-colors hover:text-pnex-accent">
              Use Cases
            </a>
            <a href="#get-started" className="text-sm font-medium text-pnex-text-muted transition-colors hover:text-pnex-accent">
              Get Started
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-pnex-accent px-4 py-2 text-[13px] font-bold text-pnex-bg transition-all hover:-translate-y-0.5 hover:bg-pnex-accent-light"
            >
              ★ Star on GitHub
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center text-pnex-text-muted md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="border-t border-pnex-border/25 bg-pnex-bg/95 backdrop-blur-xl md:hidden">
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-pnex-text-muted transition-colors hover:bg-pnex-surface hover:text-pnex-accent"
              >
                Features
              </a>
              <a
                href="#use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-pnex-text-muted transition-colors hover:bg-pnex-surface hover:text-pnex-accent"
              >
                Use Cases
              </a>
              <a
                href="#get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-pnex-text-muted transition-colors hover:bg-pnex-surface hover:text-pnex-accent"
              >
                Get Started
              </a>
              <div className="mt-2 border-t border-pnex-border/25 pt-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-pnex-accent px-4 py-2.5 text-sm font-bold text-pnex-bg"
                >
                  ★ Star on GitHub
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
          {/* Gradient orbs */}
          <div className="pointer-events-none absolute top-20 left-[20%] size-72 rounded-full bg-[radial-gradient(circle,_rgba(196,168,130,0.07),_transparent_70%)] sm:size-[500px]" />
          <div className="pointer-events-none absolute -bottom-24 right-[10%] size-80 rounded-full bg-[radial-gradient(circle,_rgba(166,140,106,0.03),_transparent_70%)] sm:size-[600px]" />

          <div className="relative mx-auto max-w-[1200px] px-4 text-center sm:px-8">
            <div className="animate-[pnex-fade-in_0.6s_ease-out_both]">
              <Badge>Free & Open Source CLI Tool</Badge>
            </div>

            {/* ASCII art - Desktop */}
            <pre className="mx-auto mt-8 mb-6 hidden select-none font-mono text-[clamp(6px,1.6vw,14px)] leading-[1.2] text-pnex-accent [text-shadow:0_0_30px_rgba(196,168,130,0.25)] sm:block sm:mt-10 sm:mb-8 animate-[pnex-fade-in_0.6s_ease-out_0.1s_both]">
              {asciiArt}
            </pre>

            {/* ASCII art - Mobile */}
            <pre className="mx-auto mt-6 mb-5 block select-none font-mono text-[8px] leading-[1.2] text-pnex-accent [text-shadow:0_0_20px_rgba(196,168,130,0.25)] sm:hidden animate-[pnex-fade-in_0.6s_ease-out_0.1s_both]">
              {asciiArtMobile}
            </pre>

            <p className="mx-auto mb-3 max-w-[600px] text-base leading-relaxed text-pnex-text-muted sm:mb-4 sm:text-lg md:text-2xl animate-[pnex-fade-in_0.6s_ease-out_0.2s_both]">
              The CLI for AI agent communications,
              <br className="hidden sm:block" />
              <span className="sm:hidden">{" "}</span>
              integrations, and skill coordination.
            </p>

            <p className="mx-auto mb-8 max-w-[500px] text-sm leading-relaxed text-pnex-text-dim sm:mb-12 sm:text-[15px] animate-[pnex-fade-in_0.6s_ease-out_0.3s_both]">
              One tool to connect, route, and observe everything your AI agents
              say and do. Totally free.
            </p>

            {/* Install command */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-pnex-border bg-pnex-surface px-3 py-3 shadow-[0_0_20px_rgba(196,168,130,0.1)] sm:gap-3 sm:px-6 sm:py-3.5 animate-[pnex-fade-in_0.6s_ease-out_0.3s_both]">
              <span className="text-sm text-pnex-code-green">$</span>
              <code className="font-mono text-xs text-pnex-text sm:text-sm">
                npm install -g pnex
              </code>
              <button
                onClick={() => copyToClipboard("npm install -g pnex", -1)}
                className="ml-1 shrink-0 rounded-md border border-pnex-border px-2 py-1 font-mono text-[10px] text-pnex-text-dim transition-colors hover:border-pnex-accent hover:text-pnex-accent sm:text-[11px]"
              >
                {copiedIdx === -1 ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 sm:mt-16 sm:gap-12">
              {[
                { value: "100%", label: "Free" },
                { value: "MIT", label: "Licensed" },
                { value: "0ms", label: "Vendor Lock-in" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-mono text-xl font-extrabold text-pnex-accent sm:text-[28px]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-pnex-text-dim sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-pnex-border to-transparent" />
        </div>

        {/* ── INTEGRATIONS ── */}
        <section
          id="features"
          className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24"
        >
          <div className="mb-10 text-center sm:mb-16">
            <Badge>Integrations</Badge>
            <h2 className="mt-5 mb-3 text-2xl font-extrabold leading-tight tracking-tight text-pnex-text text-balance sm:text-3xl md:text-[42px]">
              Give life to your Agents
              <br />
              <span className="text-pnex-accent">with powerful connections</span>
            </h2>
            <p className="mx-auto max-w-[500px] text-sm text-pnex-text-muted sm:text-base">
              Connect your AI agents to the tools you use every day.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
                className="group flex flex-col gap-3 rounded-2xl border border-pnex-border bg-pnex-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pnex-accent-dim hover:shadow-[0_12px_40px_rgba(196,168,130,0.08)] sm:gap-4 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-1 sm:mb-2">
                  <span className="material-icons text-2xl text-pnex-accent sm:text-[28px]">
                    {group.icon}
                  </span>
                  <h3 className="text-base font-bold text-pnex-text sm:text-lg">
                    {group.category}
                  </h3>
                </div>
                <p className="mb-2 text-[13px] leading-relaxed text-pnex-text-muted sm:mb-4 sm:text-sm">
                  {group.desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-pnex-border bg-pnex-bg-alt px-2 py-1 font-mono text-[10px] text-pnex-text-dim sm:px-2.5 sm:text-xs"
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
        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-8 sm:pb-24">
          <div className="relative overflow-hidden rounded-2xl border border-pnex-border bg-gradient-to-br from-pnex-surface to-pnex-bg p-5 sm:rounded-3xl sm:p-10 md:p-16">
            <div className="pointer-events-none absolute top-0 right-0 size-48 bg-[radial-gradient(circle_at_top_right,_rgba(196,168,130,0.06),_transparent_70%)] sm:size-72" />

            <div className="relative z-[1]">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-extrabold text-pnex-text sm:mb-12 sm:text-[28px]">
                <span className="material-icons text-pnex-accent">terminal</span>
                Core Capabilities
              </h3>

              <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
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
                  <div key={cap.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-pnex-border bg-pnex-surface-hover sm:size-12">
                      <span className="material-icons text-lg text-pnex-text-muted sm:text-2xl">
                        {cap.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1.5 text-base font-bold text-pnex-text sm:mb-2 sm:text-lg">
                        {cap.title}
                      </h4>
                      <p className="mb-3 text-[13px] leading-relaxed text-pnex-text-muted sm:mb-4 sm:text-[15px]">
                        {cap.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 overflow-x-auto rounded-lg border border-pnex-border bg-pnex-bg px-2.5 py-2 font-mono text-[11px] text-pnex-text-dim sm:px-3.5 sm:text-[13px]">
                        <span className="text-pnex-code-green">$</span>
                        <span className="whitespace-nowrap">{cap.cmd}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-pnex-border to-transparent" />
        </div>

        {/* ── USE CASES ── */}
        <section
          id="use-cases"
          className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 sm:py-24"
        >
          <div className="mb-10 text-center sm:mb-16">
            <Badge>Use Cases</Badge>
            <h2 className="mt-5 mb-3 text-2xl font-extrabold leading-tight tracking-tight text-pnex-text text-balance sm:text-3xl md:text-[42px]">
              One tool,{" "}
              <span className="text-pnex-accent">infinite possibilities</span>
            </h2>
            <p className="mx-auto max-w-[500px] text-sm text-pnex-text-muted sm:text-base">
              From simple notifications to complex multi-step pipelines, pnex
              adapts to your workflow.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-2">
            {useCases.map((uc, i) => (
              <button
                key={uc.label}
                onClick={() => setActiveUseCase(i)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2.5 sm:text-[13px] ${
                  activeUseCase === i
                    ? "border border-pnex-accent bg-pnex-accent/10 text-pnex-accent"
                    : "border border-pnex-border text-pnex-text-muted hover:border-pnex-border-light hover:text-pnex-text"
                }`}
              >
                {uc.label}
              </button>
            ))}
          </div>

          {/* Active use case content */}
          <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2">
            <TerminalWindow title="terminal">
              <div>
                <span className="text-pnex-code-green">$</span>{" "}
                <span className="text-pnex-text break-all sm:break-normal">
                  {useCases[activeUseCase].command}
                </span>
                <span className="ml-1 inline-block h-4 w-2 animate-[pnex-cursor-blink_1s_step-end_infinite] bg-pnex-accent align-middle" />
              </div>
              <div className="mt-3 text-[11px] text-pnex-text-dim sm:text-xs">
                <span className="text-pnex-code-green">✓</span> Connected
                &nbsp;&nbsp;
                <span className="text-pnex-code-blue">⟶</span> Ready
              </div>
            </TerminalWindow>

            <div className="px-0 sm:px-4">
              <h3 className="mb-2 text-lg font-bold text-pnex-text sm:mb-3 sm:text-2xl">
                {useCases[activeUseCase].label}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-pnex-text-muted sm:mb-6 sm:text-[15px] sm:leading-[1.8]">
                {useCases[activeUseCase].description}
              </p>
              <a
                href="#get-started"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-pnex-accent transition-all hover:gap-2.5"
              >
                Try it now <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-pnex-border to-transparent" />
        </div>

        {/* ── GET STARTED ── */}
        <section
          id="get-started"
          className="mx-auto max-w-[900px] px-4 py-16 sm:px-8 sm:py-24"
        >
          <div className="mb-8 text-center sm:mb-12">
            <Badge>Get Started</Badge>
            <h2 className="mt-5 mb-3 text-2xl font-extrabold leading-tight tracking-tight text-pnex-text text-balance sm:text-3xl md:text-[42px]">
              Up and running in{" "}
              <span className="text-pnex-accent">4 commands</span>
            </h2>
            <p className="mx-auto max-w-[440px] text-sm text-pnex-text-muted sm:text-base">
              No accounts, no API keys, no setup wizards. Just install and go.
            </p>
          </div>

          <TerminalWindow title="~/ — bash">
            {installSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 py-1.5"
              >
                <div className="min-w-0">
                  <span className="text-[11px] text-pnex-text-dim sm:text-xs">
                    {step.comment}
                  </span>
                  <div className="mt-0.5">
                    <span className="text-pnex-code-green">$</span>{" "}
                    <span className="break-all text-pnex-text sm:break-normal">{step.cmd}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(step.cmd, i)}
                  className={`shrink-0 rounded border border-pnex-border px-2 py-0.5 font-mono text-[10px] transition-colors hover:border-pnex-accent ${
                    copiedIdx === i ? "text-pnex-code-green" : "text-pnex-text-dim"
                  }`}
                >
                  {copiedIdx === i ? "✓" : "copy"}
                </button>
              </div>
            ))}
          </TerminalWindow>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="relative px-4 py-14 text-center sm:px-8 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,168,130,0.03),_transparent_70%)]" />
          <div className="relative mx-auto max-w-[700px]">
            <h2 className="mb-4 text-xl font-extrabold leading-snug tracking-tight text-pnex-text text-balance sm:text-3xl md:text-4xl">
              Ready to supercharge your
              <br />
              <span className="text-pnex-accent">agent communications?</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-pnex-text-muted sm:mb-10 sm:text-base">
              Join the growing community of developers building the next
              generation of AI agent infrastructure.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pnex-accent px-6 py-3.5 text-sm font-bold text-pnex-bg transition-all hover:-translate-y-0.5 hover:bg-pnex-accent-light hover:shadow-[0_8px_30px_rgba(196,168,130,0.2)] sm:px-8 sm:text-[15px]"
              >
                Get Started — It&apos;s Free
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-pnex-border px-6 py-3.5 text-sm font-semibold text-pnex-text-muted transition-all hover:border-pnex-accent hover:text-pnex-accent sm:px-8 sm:text-[15px]"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-pnex-border bg-pnex-bg-alt px-4 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3 font-mono text-xl font-extrabold text-pnex-text">
              pnex
            </div>
            <p className="max-w-[280px] text-[13px] leading-relaxed text-pnex-text-dim">
              The open-source CLI for AI agent communications, integrations, and
              skill coordination. Free forever.
            </p>
            <div className="mt-4 flex gap-4">
              {["GitHub", "Discord", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-pnex-text-dim transition-colors hover:text-pnex-accent"
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
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-pnex-text-muted sm:mb-4">
                {col.title}
              </div>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[13px] text-pnex-text-dim transition-colors hover:text-pnex-accent"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mx-auto mt-8 flex max-w-[1200px] flex-col items-center justify-between gap-3 border-t border-pnex-border pt-6 sm:mt-10 sm:flex-row">
          <span className="text-xs text-pnex-text-dim">
            © 2026 pnex. MIT License. Free forever.
          </span>
          <span className="font-mono text-[11px] text-pnex-text-dim">
            built with ♥ for the agent ecosystem
          </span>
        </div>
      </footer>
    </div>
  );
}
