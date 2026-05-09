# Video Toolkit Roadmap

This document tracks the development of codex-code-video-toolkit.

**Repository:** https://github.com/estrindavid/codex-code-video-toolkit

---

## Vision

An open-source, AI-native video production workspace for Codex, featuring:
- Reusable templates for common video types
- Brand profiles for consistent visual identity
- Codex skills providing deep domain knowledge
- Automated asset pipelines (recording, conversion, audio generation)
- Slash commands for guided workflows

---

## Current Status

**Phase:** 3 - Templates & Brands (nearly complete)
**Focus:** Additional templates (tutorial, changelog), testing
**Recent:** Qwen3-TTS integration, sprint-review-v2 template, voice cloning, FilmGrain component

---

## Phases

### Phase 1: Foundation ✅ COMPLETE

- [x] Sprint review template with theme system
- [x] Config-driven video content
- [x] `$video` slash command (unified project creation)
- [x] Narrator PiP component
- [x] Remotion skill (stable)
- [x] ElevenLabs skill (stable)

### Phase 2: Skills & Automation ✅ COMPLETE

**Skills:**
- [x] FFmpeg skill (beta)
- [x] Playwright recording skill (beta)

**Python Tools:**
- [x] `voiceover.py` - CLI for ElevenLabs TTS
- [x] `music.py` - CLI for background music
- [x] `sfx.py` - CLI for sound effects

**Commands:**
- [x] `$generate-voiceover` - streamlined audio generation
- [x] `$record-demo` - guided Playwright recording

**Infrastructure:**
- [x] Playwright recording setup (`playwright/`)
- [x] Centralized config (env var with registry fallback)

### Phase 2.5: Open Source Release ✅ COMPLETE

- [x] Directory restructure for public release
- [x] Brand profiles system (`brands/`)
- [x] Environment variable support
- [x] README, LICENSE (MIT), CONTRIBUTING.md
- [x] Documentation (`docs/`)
- [x] GitHub repo published

### Phase 3: Templates & Brands 🔄 IN PROGRESS

**Brand Profiles:**
- [x] Default brand profile
- [x] Digital Samba brand profile
- [x] `$brand` command - list, edit, or create brands

**Templates:**
- [x] Product demo template
- [x] `$video` command - unified project management
- [x] `$template` command - list available templates
- [x] Shared component library (`lib/`)
- [ ] Tutorial template
- [ ] Changelog/release notes template

**Transitions Library:**
- [x] Transitions library (`lib/transitions/`)
- [x] Custom presentations: glitch, rgbSplit, zoomBlur, lightLeak, clockWipe, pixelate, checkerboard
- [x] Re-exports official transitions: slide, fade, wipe, flip
- [x] Transitions gallery showcase (`showcase/transitions/`)
- [x] Documentation in Remotion skill and AGENTS.md

**Template-Brand Integration:**
- [x] Brand loader utility (`lib/brand.ts`)
- [x] Templates use `brand.ts` for theming
- [x] `$video` generates brand.ts from selected brand

**Multi-Session Project System:**
- [x] Project schema (`lib/project/types.ts`)
- [x] Filesystem reconciliation
- [x] Auto-generated AGENTS.md per project
- [x] `$skills` command

**Review & Validation:**
- [x] `$scene-review` command - dedicated scene-by-scene review with Remotion Studio
  - [x] Starts Remotion Studio for visual verification
  - [x] Walks through scenes one by one (not summary tables)
  - [x] Generic - works with any template's config
  - [x] `$video` delegates to `$scene-review` when phase is `review`
  - [x] `$generate-voiceover` warns if review incomplete
- [ ] Pre-render review (timing, sync, polish)
- [ ] Asset validation (ffprobe checks)
- [ ] Enhancement suggestions
- Note: `/review` name clashes with Codex built-in PR review - using `$scene-review`

**Qwen3-TTS Integration:**
- [x] `tools/qwen3_tts.py` — standalone CLI tool
- [x] `voiceover.py --provider qwen3` — per-scene generation
- [x] Docker image: `ghcr.io/conalmullan/video-toolkit-qwen3-tts:latest`
- [x] 9 built-in speakers, tone presets, voice cloning
- [x] `$voice-clone` command — record, test, save cloned voice to brand
- [x] Temperature/top_p generation params for expressiveness control
- [ ] Make Qwen3-TTS the default provider (replacing ElevenLabs)

**Modal Cloud GPU Provider:**
- [x] `tools/cloud_gpu.py` — shared provider abstraction (RunPod + Modal)
- [x] `tools/file_transfer.py` — shared R2/fallback upload/download
- [x] `--cloud runpod|modal` flag on all cloud GPU tools
- [x] `docker/modal-qwen3-tts/app.py` — deployed, tested
- [x] `docker/modal-flux2/app.py` — deployed, tested
- [x] `docker/modal-upscale/app.py` — deployed, tested
- [x] `docker/modal-image-edit/app.py` — deployed, tested
- [x] `docker/modal-music-gen/app.py` — deployed, tested
- [x] `docker/modal-sadtalker/app.py` — deployed, tested
- [x] `--runpod` deprecated in upscale.py and dewatermark.py (alias for `--cloud runpod`)
- [x] `voiceover.py` passes `--cloud` through to Qwen3-TTS
- [x] `dewatermark.py` migrated to `cloud_gpu.py` (removed ~393 lines of inline RunPod code)
- [ ] `docs/modal-setup.md` — setup guide for Modal deployment
- [ ] Add `--setup --cloud modal` to tools (currently manual `modal deploy`)

**Sprint Review v2:**
- [x] `sprint-review-v2` template — composable scene-based architecture
- [x] Modular scene components

**Additional Components:**
- [x] `FilmGrain` — SVG noise overlay for cinematic texture
- [x] `MazeDecoration` — Animated isometric grid decoration

**Contribution & Examples:**
- [x] `$contribute` command
- [x] `examples/` directory
- [x] CONTRIBUTORS.md

**Testing:**
- [x] Test new project creation with scene-centric flow
- [ ] Test project resumption (multi-session)
- [ ] Verify filesystem reconciliation
- [x] Verify AGENTS.md auto-generation

**Registry & Roadmap Alignment:**
- [x] Update skill status table to include all current skills
- [x] Add Qwen3-TTS to roadmap phases
- [x] Document `remotion-official` skill sync from upstream (remotion-dev/skills) in roadmap
- [x] Update Metrics section

### Phase 4: Polish & Advanced

**Output & Accessibility:**
- [ ] Multi-format output (MP4, WebM, GIF, social formats)
- [ ] Subtitle generation from voiceover scripts
- [ ] Thumbnail auto-generation

**Skills:**
- [ ] Video accessibility skill
- [ ] Terminal recording skill (asciinema)
- [ ] Video timing skill

---

## Skill Maturity Levels

| Status | Meaning |
|--------|---------|
| **draft** | Just created, untested, may have errors |
| **beta** | Functional, needs real-world validation |
| **stable** | Battle-tested, well-documented, recommended |

### Current Skill Status

| Skill | Status | Notes |
|-------|--------|-------|
| remotion | stable | Core framework knowledge |
| remotion-official | stable | Synced from remotion-dev/skills (weekly via GitHub Actions) |
| elevenlabs | stable | Audio generation |
| ffmpeg | beta | Asset conversion |
| playwright-recording | beta | Browser demo capture |
| frontend-design | stable | Visual design refinement |
| qwen-edit | stable | AI image editing prompting patterns |
| runpod | stable | Cloud GPU setup, Docker images, endpoint management |
| modal | beta | Alternative cloud GPU provider — faster cold starts, all 6 tools deployed |

---

## Review Process

**draft → beta:**
- Verify code examples work
- Test core functionality
- Document issues in `_internal/reviews/`
- Fix critical issues

**beta → stable:**
- Use in a real project
- Gather feedback
- Complete documentation
- No known critical issues

---

## Metrics

| Category | Count | Items |
|----------|-------|-------|
| Templates | 3 | sprint-review, sprint-review-v2, product-demo |
| Brands | 2 | default, digital-samba |
| Skills | 8 | 6 stable, 2 beta |
| Tools | 12 | voiceover, music, sfx, redub, addmusic, dewatermark, locate_watermark, notebooklm_brand, image_edit, upscale, sadtalker, qwen3_tts |
| Commands | 13 | setup, video, brand, template, skills, contribute, record-demo, generate-voiceover, scene-review, design, versions, redub, voice-clone |
| Components | 11 | AnimatedBackground, SlideTransition, Label, Vignette, FilmGrain, LogoWatermark, SplitScreen, NarratorPiP, Envelope, PointingHand, MazeDecoration |
| Transitions | 7 | glitch, rgbSplit, zoomBlur, lightLeak, clockWipe, pixelate, checkerboard |
| Examples | 3 | hello-world, digital-samba-skill-demo, sprint-review-cho-oyu |

---

## Related Files

| File | Purpose |
|------|---------|
| `BACKLOG.md` | Unscheduled ideas and future enhancements |
| `CHANGELOG.md` | Historical record of changes |
| `toolkit-registry.json` | Machine-readable inventory |
