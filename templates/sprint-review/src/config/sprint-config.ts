import type { SprintConfig, VideoConfig } from './types';

// ============================================================
// EDIT THIS FILE FOR EACH NEW SPRINT
// ============================================================

export const sprintConfig: SprintConfig = {
  // Basic sprint information
  info: {
    name: 'Sprint Name',           // e.g., "Cho Oyu", "Everest"
    dateRange: '1st Jan – 15th Jan',
    product: 'Your Product',       // e.g., "Digital Samba Mobile"
    platform: 'Platform Update',   // e.g., "iOS Embedded App Update"
    version: '1.0.0',
    build: '100',
  },

  // Overview slide content
  overview: {
    title: "What's New in v1.0.0",
    items: [
      { text: 'Feature: ', highlight: 'Description of feature' },
      { text: 'Fix: ', highlight: 'Description of fix' },
      { text: 'Improvement: ', highlight: 'Description of improvement' },
    ],
  },

  // Demo sections - add your demo videos here
  demos: [
    // Single video demo example
    // {
    //   type: 'single',
    //   videoFile: 'demo-1.mp4',
    //   label: 'Feature Demo',
    //   jiraRef: 'PROJ-123',
    //   durationSeconds: 15,
    //   playbackRate: 1.5,
    // },

    // Split screen demo example
    // {
    //   type: 'split',
    //   leftVideo: 'demo-phone.mp4',
    //   rightVideo: 'demo-browser.mp4',
    //   leftLabel: 'Mobile',
    //   rightLabel: 'Desktop',
    //   label: 'Cross-platform Feature',
    //   jiraRef: 'PROJ-456',
    //   durationSeconds: 12,
    // },
  ],

  // Summary slide stats
  summary: {
    stats: [
      { value: 0, label: 'Features' },
      { value: 0, label: 'Bug Fixes' },
      { value: 0, label: 'Improvements' },
    ],
    screenshotFile: 'release-screenshot.png', // Optional: in public/images/
  },

  // End credits
  credits: [
    { category: 'Made with', items: ['Codex', 'Remotion'] },
    { category: 'Audio', items: ['ElevenLabs API'] },
    { category: 'Special Thanks', items: ['The Team'] },
  ],

  // Audio configuration
  audio: {
    voiceoverFile: 'voiceover.mp3',      // in public/audio/
    voiceoverStartFrame: 120,             // Start 4 seconds in
    backgroundMusicFile: 'background-music.mp3',
    backgroundMusicVolume: 0.15,
    chimeFile: 'sfx-chime.mp3',          // Success sound on summary
    chimeFrame: 3675,                     // When to play chime
  },

  // Narrator PiP configuration (optional)
  narrator: {
    enabled: false,                       // Set to true to show narrator
    videoFile: 'narrator.mp4',           // in public/
    position: 'bottom-right',
    size: 'md',
    // startFrame: 120,                  // Defaults to voiceoverStartFrame
  },
};

// Video output configuration
export const videoConfig: VideoConfig = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationSeconds: 120, // Adjust based on your content
};

// Helper to calculate frames
export const seconds = (s: number) => s * videoConfig.fps;
