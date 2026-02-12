# Pnex

**The CLI for AI agent communications, integrations, and skill coordination.**

One tool to connect, route, and observe everything your AI agents say and do. Totally free.

![Pnex CLI](src/app/favicon.ico)

## Features

### Integrations

- **Chat Messages**: WhatsApp, Telegram, Discord, Slack.
  - Send and receive messages on popular chat platforms directly from your agent logic.
- **Task Management**: Todoist, Trello, Asana, Jira.
  - Create tasks, update statuses, and move cards based on agent decisions.
- **Email & Comms**: Gmail, Outlook, SendGrid, SES.
  - Draft, send, and process emails with full thread context awareness.

### Core Capabilities

- **Skills Management**: Register, discover, and execute agent skills. Treat capabilities as modular functions that can be shared across your agent fleet.
- **Global State Storage**: Persist state across sessions and commands. Set context in one pipeline step and retrieve it in another, or share state between agents.
- **Smart Notifications**: Pub/Sub system for agent-to-human and agent-to-agent alerts. Decouple producers from consumers with persistent message queues.

## Installation

```bash
npm install -g pnex
```

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

## Project Structure

- `src/app/page.tsx`: Landing page showcasing Pnex features.
- `src/app/layout.tsx`: Root layout.
- `src/app/globals.css`: Global styles including Tailwind directives.

## License

MIT License. 0ms Vendor Lock-in.
