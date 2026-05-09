# Sprint Review Video Template (v2)

A **composable, story-driven** Remotion template for professional sprint review videos. Scenes are modular blocks that can be mixed, matched, and reordered to tell the sprint's story.

## Quick Reference

### Starting a New Sprint Video

1. Copy this template folder to a new location
2. Edit `src/config/sprint-config.ts` with sprint details and scenes
3. Add demo videos to `public/demos/`
4. Run `npm run studio` to preview
5. Run `npm run render` to export

### Key Files to Edit

| File | Purpose |
|------|---------|
| `src/config/sprint-config.ts` | Sprint info, scene array, audio config |
| `src/config/types.ts` | Type definitions for all scene types |
| `src/config/transitions.ts` | Smart transition resolver and duration calc |
| `src/config/theme.ts` | Colors (change `primary` for brand color) |

### Architecture

The config uses a **scene-array architecture** with TypeScript discriminated unions:

```typescript
interface SprintReviewConfig {
  info: SprintInfo;            // Sprint name, dates, product, version
  scenes: SceneConfig[];       // Composable, reorderable scene blocks
  audio: GlobalAudioConfig;    // Background music, legacy voiceover
  narrator?: NarratorConfig;   // Optional PiP presenter
  overlays?: OverlayConfig;    // Background, vignette, film grain
}
```

### Scene Types (12 types)

| Type | Purpose | Key Content Fields |
|------|---------|-------------------|
| `title` | Opening slide with logo and sprint info | `logoFile?` |
| `context` | Narrative context setting | `narrative`, `pillar?`, `keyPoints?` |
| `goal` | Sprint goal with achievement indicator | `goal`, `status`, `planned`, `completed` |
| `highlights` | Feature highlights list (replaces overview) | `title`, `items[]` |
| `demo` | Video demo playback (single or split) | `type`, `videoFile`, `label` |
| `decisions` | Key decisions made during sprint | `items[].decision`, `.rationale`, `.impact?` |
| `metrics` | Stats with trend arrows or bar chart | `mode: 'cards'\|'chart'`, `items[]` |
| `carryover` | Items carried to next sprint | `items[].title`, `.status`, `.reason?` |
| `learnings` | Retro: went well / needs improvement | `wentWell[]`, `needsImprovement[]`, `actionItems?[]` |
| `roadmap` | Timeline with done/current/upcoming nodes | `nodes[]`, `nextSprint?` |
| `summary` | Release stats with progress rings | `stats[]`, `screenshotFile?` |
| `credits` | Scrolling end credits | `sections[].category`, `.items[]` |

### Suggested Narrative Arc

```
ACT 1: SET THE STAGE     -> title, context, goal
ACT 2: THE JOURNEY        -> highlights, demos, decisions
ACT 3: THE OUTCOME        -> metrics, carryover, learnings
ACT 4: WHAT'S NEXT        -> roadmap
CLOSING                    -> summary, credits
```

All scenes are optional and reorderable.

### Adding a Scene

```typescript
// In sprint-config.ts, add to scenes array:
{
  type: 'demo',
  durationSeconds: 15,
  content: {
    type: 'single',
    videoFile: 'my-demo.mp4',   // Goes in public/demos/
    label: 'Feature Demo',
    jiraRef: 'PROJ-123',
    playbackRate: 1.5,
  },
},
```

### Smart Transitions

Transitions between scenes are resolved automatically based on scene type pairs. Override per-scene:

```typescript
{
  type: 'metrics',
  durationSeconds: 12,
  transition: { preset: 'glitch', durationFrames: 20 },
  content: { ... },
}
```

Available presets: `fade`, `slide`, `slide-left`, `slide-up`, `light-leak-warm`, `light-leak-cool`, `glitch`, `rgb-split`, `zoom-blur`, `wipe`, `none`.

### Video Duration

**Auto-calculated** from `sum(scene.durationSeconds) - transition overlaps`. No manual `durationSeconds` needed in `VideoConfig`.

### Workflow Skills

```bash
npm run studio          # Preview in browser
npm run render          # Export MP4
npm run render:preview  # Quick half-res preview
```

### Audio

Place in `public/audio/`:
- Per-scene: set `audioFile: 'scenes/01-title.mp3'` on each scene
- Legacy global: set `audio.voiceoverFile` in config
- Background music: `background-music.mp3` (plays at 15% volume)
- SFX chime: `sfx-chime.mp3`

### Theme Colors

Default theme uses orange accent (#ea580c). Customize in `theme.ts`.
