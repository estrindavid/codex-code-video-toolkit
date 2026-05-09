import type { SprintReviewConfig, VideoConfig } from './types';
import { calculateTotalFrames } from './transitions';

// ============================================================
// EDIT THIS FILE FOR EACH NEW SPRINT
//
// Scenes are composable blocks — mix, match, and reorder them
// to tell your sprint's story. All scene types are optional.
//
// Suggested narrative arc:
//   ACT 1: SET THE STAGE     → title, context, goal
//   ACT 2: THE JOURNEY        → highlights, demos, decisions
//   ACT 3: THE OUTCOME        → metrics, carryover, learnings
//   ACT 4: WHAT'S NEXT        → roadmap
//   CLOSING                    → summary, credits
// ============================================================

export const sprintConfig: SprintReviewConfig = {
  info: {
    name: 'Sprint Name',
    dateRange: '1st Jan – 15th Jan',
    product: 'Your Product',
    platform: 'Platform Update',
    version: '1.0.0',
    build: '100',
  },

  scenes: [
    // ─── ACT 1: SET THE STAGE ─────────────────────────────

    {
      type: 'title',
      durationSeconds: 5,
      content: {
        // logoFile: 'images/logo.png',  // Optional
      },
    },

    {
      type: 'context',
      durationSeconds: 10,
      content: {
        narrative: 'This sprint focused on laying the foundation for the next generation of our platform.',
        pillar: 'Core Platform',
        keyPoints: ['Performance', 'Reliability', 'Developer Experience'],
      },
    },

    {
      type: 'goal',
      durationSeconds: 10,
      content: {
        goal: 'Deliver a stable release with improved performance and zero critical bugs.',
        status: 'achieved',
        planned: 24,
        completed: 22,
        unit: 'story points',
      },
    },

    // ─── ACT 2: THE JOURNEY ───────────────────────────────

    {
      type: 'highlights',
      durationSeconds: 15,
      content: {
        title: "What's New in v1.0.0",
        items: [
          { text: 'Feature: ', highlight: 'Real-time collaboration' },
          { text: 'Fix: ', highlight: 'Memory leak in dashboard' },
          { text: 'Improvement: ', highlight: '40% faster page loads' },
        ],
      },
    },

    // Uncomment to add demo scenes:
    // {
    //   type: 'demo',
    //   durationSeconds: 15,
    //   content: {
    //     type: 'single',
    //     videoFile: 'demo-1.mp4',
    //     label: 'Feature Demo',
    //     jiraRef: 'PROJ-123',
    //     playbackRate: 1.5,
    //   },
    // },

    {
      type: 'decisions',
      durationSeconds: 12,
      content: {
        items: [
          {
            decision: 'Migrated from REST to GraphQL for the dashboard API',
            rationale: 'Reduces over-fetching and enables real-time subscriptions with minimal changes.',
            impact: 'high',
          },
          {
            decision: 'Adopted React Server Components',
            rationale: 'Cuts client bundle by 35% while maintaining interactive UX.',
            impact: 'medium',
          },
        ],
      },
    },

    // ─── ACT 3: THE OUTCOME ───────────────────────────────

    {
      type: 'metrics',
      durationSeconds: 12,
      content: {
        mode: 'cards',
        items: [
          { value: 22, label: 'Stories Done', trend: 'up', previousValue: 18 },
          { value: 95, label: 'Test Coverage', unit: '%', trend: 'up', previousValue: 89 },
          { value: 0, label: 'Critical Bugs', trend: 'down', previousValue: 2 },
          { value: 340, label: 'Avg Response', unit: 'ms', trend: 'down', previousValue: 520 },
        ],
      },
    },

    {
      type: 'carryover',
      durationSeconds: 10,
      content: {
        items: [
          {
            title: 'OAuth2 integration for enterprise SSO',
            status: 'in-progress',
            reason: 'Waiting on third-party API access',
          },
          {
            title: 'Dark mode theme system',
            status: 'deferred',
            reason: 'Deprioritized in favor of performance work',
          },
        ],
      },
    },

    {
      type: 'learnings',
      durationSeconds: 15,
      content: {
        wentWell: [
          'Pair programming improved code quality',
          'Early testing caught issues before staging',
          'Daily standups kept team aligned',
        ],
        needsImprovement: [
          'Better estimation for backend tasks',
          'Earlier design review handoffs',
        ],
        actionItems: [
          'Add estimation poker to sprint planning',
          'Schedule design reviews on day 2',
        ],
      },
    },

    // ─── ACT 4: WHAT'S NEXT ──────────────────────────────

    {
      type: 'roadmap',
      durationSeconds: 12,
      content: {
        nodes: [
          { label: 'v0.9 Beta', status: 'done' },
          { label: 'v1.0 Stable', status: 'current' },
          { label: 'v1.1 Features', status: 'upcoming' },
          { label: 'v2.0 Platform', status: 'upcoming' },
        ],
        nextSprint: {
          name: 'Sprint Kangchenjunga',
          focus: 'Enterprise SSO and dark mode',
        },
      },
    },

    // ─── CLOSING ──────────────────────────────────────────

    {
      type: 'summary',
      durationSeconds: 15,
      content: {
        stats: [
          { value: 5, label: 'Features' },
          { value: 3, label: 'Bug Fixes' },
          { value: 4, label: 'Improvements' },
        ],
        // screenshotFile: 'release-screenshot.png',
      },
    },

    {
      type: 'credits',
      durationSeconds: 30,
      content: {
        sections: [
          { category: 'Made with', items: ['Codex', 'Remotion'] },
          { category: 'Audio', items: ['ElevenLabs API'] },
          { category: 'Special Thanks', items: ['The Team'] },
        ],
      },
    },
  ],

  audio: {
    voiceoverFile: 'voiceover.mp3',
    voiceoverStartFrame: 120,
    backgroundMusicFile: 'background-music.mp3',
    backgroundMusicVolume: 0.15,
    chimeFile: 'sfx-chime.mp3',
    chimeFrame: 3675,
  },

  narrator: {
    enabled: false,
    videoFile: 'narrator.mp4',
    position: 'bottom-right',
    size: 'md',
  },

  overlays: {
    background: { variant: 'subtle' },
    vignette: { intensity: 0.35 },
    filmGrain: { opacity: 0.05 },
  },
};

// Video output configuration
// Duration is auto-calculated from scenes and transition overlaps.
export const videoConfig: VideoConfig = {
  fps: 30,
  width: 1920,
  height: 1080,
};

// Auto-calculated duration in frames
export const totalDurationInFrames = calculateTotalFrames(sprintConfig.scenes, videoConfig.fps);

// Helper to calculate frames
export const seconds = (s: number) => s * videoConfig.fps;
