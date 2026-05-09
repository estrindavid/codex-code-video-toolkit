# Product Demo Video Template

A Remotion-based template for creating marketing and product demo videos with a dark tech aesthetic.

## Quick Start

```bash
# Install dependencies
npm install

# Open the preview studio
npm run studio

# Render final video
npm run render
```

## Configuration

### 1. Edit Demo Config

Open `src/config/demo-config.ts` and update:

```typescript
export const demoConfig: ProductDemoConfig = {
  product: {
    name: 'Your Product',
    tagline: 'Your compelling tagline',
    logo: 'images/logo.png',
    website: 'https://yourproduct.com',
  },
  scenes: [
    // Your scenes here
  ],
};
```

### 2. Add Demo Videos

Place your screen recordings in `public/demos/`:
- `demo-feature.mp4`
- `demo-walkthrough.mp4`
- etc.

Then add them to scenes:

```typescript
{
  type: 'demo',
  durationSeconds: 30,
  content: {
    type: 'browser',
    videoFile: 'demos/demo-feature.mp4',
    label: 'Live Demo',
    caption: 'See it in action',
  },
}
```

### 3. Add Audio (Optional)

Place audio files in `public/audio/`:
- `voiceover.mp3` - Main narration
- `background-music.mp3` - Background track

### 4. Customize Theme (Optional)

Edit `src/config/theme.ts` or use the brand system:

```typescript
// theme.ts
export const customTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#your-brand-color',
    accent: '#your-accent-color',
  },
};
```

## Project Structure

```
product-demo/
├── src/
│   ├── config/
│   │   ├── demo-config.ts    # Your video content
│   │   ├── brand.ts          # Brand colors (auto-generated)
│   │   ├── theme.ts          # Visual styling
│   │   └── types.ts          # TypeScript definitions
│   ├── components/
│   │   ├── core/             # NarratorPiP, shared components
│   │   └── slides/           # TitleSlide, DemoSlide, StatsSlide, etc.
│   ├── ProductDemo.tsx       # Main composition
│   ├── Root.tsx              # Remotion entry
│   └── index.ts              # Entry point
├── public/
│   ├── demos/                # Demo videos
│   ├── images/               # Logos, screenshots
│   └── audio/                # Voiceover, music
└── package.json
```

## Scene Types

| Type | Purpose | Key Content Properties |
|------|---------|------------------------|
| `title` | Opening with logos and headline | `headline`, `subheadline`, `logos` |
| `problem` | Pain points with code example | `headline`, `problems[]`, `codeExample` |
| `solution` | The "better way" introduction | `headline`, `description`, `highlights[]` |
| `demo` | Video playback with chrome | `type` (browser/terminal/video), `videoFile`, `label` |
| `feature` | Feature highlights | `headline`, `features[]` |
| `stats` | Animated stat cards | `stats[]` with value, unit, label |
| `cta` | Call to action with links | `headline`, `tagline`, `links[]` |

## Adding Scenes

### Title Scene

```typescript
{
  type: 'title',
  durationSeconds: 5,
  content: {
    headline: 'Introducing Product',
    subheadline: 'The future of X',
    logos: [{ src: 'images/logo.png' }],
  },
}
```

### Problem Scene

```typescript
{
  type: 'problem',
  durationSeconds: 15,
  content: {
    headline: 'The Problem',
    problems: [
      { icon: '😤', text: 'Complex setup' },
      { icon: '⏰', text: 'Hours of configuration' },
      { icon: '💸', text: 'Expensive infrastructure' },
    ],
    codeExample: [
      '// 50+ lines of boilerplate',
      'const config = require("./config");',
      '// ... more complexity',
    ],
  },
}
```

### Demo Scene

```typescript
{
  type: 'demo',
  durationSeconds: 30,
  content: {
    type: 'browser',  // or 'terminal' or 'video'
    videoFile: 'demos/walkthrough.mp4',
    label: 'Live Demo',
    caption: 'Watch the magic happen',
  },
}
```

### Stats Scene

```typescript
{
  type: 'stats',
  durationSeconds: 10,
  content: {
    stats: [
      { value: '10', unit: 'x', label: 'Faster', icon: '⚡' },
      { value: '50', unit: '%', label: 'Less Code', icon: '📝' },
      { value: '1', unit: 'min', label: 'Setup Time', icon: '⏱️' },
    ],
  },
}
```

### CTA Scene

```typescript
{
  type: 'cta',
  durationSeconds: 8,
  content: {
    headline: 'Get Started Today',
    tagline: 'Free forever for individuals',
    links: [
      { type: 'github', label: 'Star on GitHub', url: 'https://github.com/...' },
      { type: 'website', label: 'Try It Free', url: 'https://...' },
    ],
  },
}
```

## Workflow Skills

| Command | Description |
|---------|-------------|
| `npm run studio` | Open Remotion preview studio |
| `npm run render` | Render full quality MP4 |
| `npm run render:preview` | Render half-resolution preview |

## Video Duration

Total duration is automatically calculated from the sum of all scene `durationSeconds` values.

## Narrator PiP (Picture-in-Picture)

Add a presenter overlay:

```typescript
narrator: {
  enabled: true,
  videoFile: 'narrator.mp4',     // Place in public/
  position: 'bottom-right',       // bottom-right, bottom-left, top-right, top-left
  size: 'md',                     // sm, md, lg
  startFrame: 120,                // When to appear (defaults to voiceoverStartFrame)
}
```

**Recording tips:**
- Record yourself speaking the voiceover script
- Frame from chest up, centered
- Use good lighting and a clean background
- Match the duration to your voiceover audio

## Demo Chrome Options

The `demo` scene supports three chrome types:

- **`browser`** - Browser window chrome with address bar
- **`terminal`** - Terminal window with title bar
- **`video`** - Raw video without chrome

## Tips

- **Scene order**: Problem → Solution → Demo → Stats → CTA is a proven flow
- **Timing**: Match scene duration to voiceover length
- **Demo length**: Use `$record-demo` to capture browser interactions
- **Playback rate**: Speed up long demos with FFmpeg before adding to project
- **Stats impact**: Use big numbers with clear units for visual punch
