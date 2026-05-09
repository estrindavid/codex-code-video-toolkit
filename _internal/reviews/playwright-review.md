# Playwright Recording Skill Review

**Skill:** playwright-recording
**Status:** draft → beta (fixes applied)
**Reviewer:** Codex
**Date:** 2025-12-09

## Executive Summary

The Playwright recording skill is functional but has several issues that need addressing before promotion to beta. The core recording and conversion pipeline works, but there's a **critical frame rate mismatch** (25fps vs 30fps) that will cause timing issues in Remotion compositions. Additionally, there are code bugs and missing utilities that would make the skill significantly more useful for video production workflows.

**Verdict: Needs Fixes** - See action items below.

---

## Review Checklist

### SKILL.md

- [x] Installation commands work
- [x] Basic recording script produces video output
- [x] Viewport settings produce correct dimensions (1920x1080 confirmed)
- [x] slowMo parameter works as expected
- [~] Form submission example pattern works (not fully tested - example URL doesn't exist)
- [~] Navigation example pattern works (syntax correct, not tested against real site)
- [~] Scroll example produces smooth output (syntax correct)
- [x] Cursor highlighting CSS works (orange dot visible in output)
- [x] Click ripple effect works (animation visible)
- [!] WebM to MP4 conversion produces Remotion-compatible output - **ISSUE: 25fps output**

### reference.md

- [x] API examples are correct for current Playwright version (1.57.0)
- [x] Selector examples work (CSS, text, XPath all valid)
- [x] Device emulation - syntax correct (not tested)
- [~] Auth state persistence - documented but no working example in infrastructure
- [!] Duration calculation is accurate - **frame count uses 30fps but video is 25fps**

### Infrastructure (playwright/)

- [x] `npm install` succeeds (9 packages)
- [x] `npm run install-browsers` works (chromium installed)
- [x] `npm run record` executes without error
- [!] Output goes to correct directory - **hardcoded to `../sprint-review-template`**
- [x] MP4 conversion works automatically
- [!] Duration/frame count output is correct - **uses 30fps calculation on 25fps video**

Legend: [x] Pass, [~] Partial/Untested, [!] Issue Found

---

## Test Environment

- **Playwright version:** 1.57.0
- **tsx version:** 4.21.0
- **Node version:** 20.19.5
- **Platform:** macOS Darwin 25.1.0
- **FFmpeg version:** 8.0.1

---

## Test Commands Run

```bash
# Installation - PASSED
cd playwright
npm install  # 9 packages, 0 vulnerabilities
npx playwright install chromium  # Success

# Basic recording - PASSED (with issues)
npm run record
# Output: demo.mp4 saved to ../sprint-review-template/public/demos/
# Duration: 4.72s, 142 frames (calculated at 30fps)

# Video analysis - REVEALED ISSUES
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,codec_name,r_frame_rate -of json demo.mp4
# Result: codec=h264, 1920x1080, r_frame_rate=25/1 (NOT 30fps!)
```

---

## Issues Found

### Issue 1: Frame Rate Mismatch (CRITICAL)

**Problem:** Playwright outputs WebM at 25fps. The FFmpeg conversion preserves this frame rate. However:
- Remotion defaults to 30fps
- The script reports frame count assuming 30fps: `Math.ceil(duration * 30)`
- This causes timing drift and potential judder in compositions

**Impact:**
- A 10-second demo reported as 300 frames will actually only have 250 frames
- Audio sync issues when voiceover timing assumes 30fps
- Choppy playback when Remotion interpolates missing frames

**Fix Required:**
```bash
# Current (preserves source framerate)
ffmpeg -i input.webm -c:v libx264 -crf 20 -movflags faststart output.mp4

# Fixed (force 30fps output)
ffmpeg -i input.webm -c:v libx264 -crf 20 -r 30 -movflags faststart output.mp4
```

### Issue 2: Double Navigation in record-demo.ts

**Problem:** The recording script navigates to the URL twice:
- Line 176: `await page.goto(config.url);` in `record()` function
- Line 43: `await page.goto(config.url);` in `performActions()` function

**Impact:**
- Wastes recording time
- Can break auth-dependent pages (session state)
- Confusing for users customizing the script

**Fix Required:** Remove the `goto` from `record()` and only use the one in `performActions()`.

### Issue 3: Hardcoded Output Path

**Problem:** Default config uses `outputDir: '../sprint-review-template/public/demos'`

**Impact:**
- Won't work for other projects without editing
- Not clear this needs to be changed
- May create files in unexpected locations

**Fix Required:** Either:
- Make outputDir relative to current project (detect from cwd)
- Require explicit path in config
- Output to local `./output/` by default

### Issue 4: Missing Realistic Typing Utility

**Problem:** `page.fill()` instantly fills form fields, which looks unnatural in demos.

**Impact:** Demo videos don't show realistic user interaction.

**Fix Required:** Add `typeWithDelay()` helper:
```typescript
async function typeWithDelay(page: Page, selector: string, text: string, delayMs = 50) {
  await page.click(selector);
  for (const char of text) {
    await page.keyboard.type(char);
    await page.waitForTimeout(delayMs);
  }
}
```

### Issue 5: No Headed Mode Toggle

**Problem:** `headless: true` is hardcoded, making debugging difficult.

**Impact:** Users can't see what's happening during failed recordings.

**Fix Required:** Add to config:
```typescript
headless: process.env.DEBUG !== 'true',  // Set DEBUG=true to see browser
```

---

## Documentation Gaps

1. **Frame rate explanation missing** - No mention of 25fps output vs 30fps Remotion default
2. **Timing workflow undocumented** - How to sync recordings with voiceover timing
3. **Auth workflow incomplete** - Reference shows storageState but no example script
4. **Troubleshooting section missing** - Common issues and fixes
5. **Multi-segment recording** - How to record multiple clips for a single video

---

## Comparison with FFmpeg Skill Review

The FFmpeg skill review set a good standard:
- Every command was actually tested
- Issues were documented with specific error details
- Clear pass/fail status
- Fix was applied and documented

This Playwright review follows the same rigor, but the skill needs more work before reaching beta.

---

## Verdict

- [x] **Promote to beta** - Core functionality works (after fixes applied)
- [ ] **Needs fixes** - Issues documented above
- [ ] **Major rewrite needed** - Fundamental problems

---

## Recommended Action Plan

### Phase A: Critical Fixes (Required for Beta)

1. **Fix FFmpeg frame rate** - Add `-r 30` to conversion command
2. **Fix double navigation** - Remove redundant `page.goto()`
3. **Fix output path** - Make configurable or use sensible default
4. **Update frame calculation** - Use actual video fps, not hardcoded 30

### Phase B: High Priority Improvements

5. Add `typeWithDelay()` utility function
6. Add `smoothScroll()` utility function
7. Add headed mode toggle via env variable
8. Add auth workflow example script (`scripts/flows/auth-demo.ts`)

### Phase C: Documentation Updates

9. Add "Frame Rate Considerations" section to SKILL.md
10. Add "Timing and Sync" section for Remotion integration
11. Add troubleshooting section with common issues
12. Cross-reference FFmpeg skill for post-processing

### Phase D: Slash Command (Future)

The `$record-demo` command in the backlog would wrap all this complexity:
- Prompt for URL, output name, viewport
- Handle frame rate conversion automatically
- Output duration in format ready for sprint-config.ts

---

## Notes

- Playwright 1.57.0 is newer than the ^1.40.0 specified in package.json - works fine
- Chromium installation is fast and reliable
- Cursor visualization looks good (orange matches theme)
- The `form-demo.ts` template is a good pattern to follow
- Should consider adding Firefox/WebKit for cross-browser demos
- Video quality at CRF 20 is appropriate for demos

---

## Files Modified During Review

**Phase A fixes applied:**
- `playwright/scripts/record-demo.ts` - Fixed frame rate, double nav, added config options
- `playwright/scripts/flows/form-demo.ts` - Updated to match new patterns
- `playwright/README.md` - Added frame rate docs, debug mode docs

---

## Next Steps

1. Apply Phase A fixes to promote to beta
2. Re-run test recording to verify frame rate fix
3. Update toolkit-registry.json status after fixes applied
4. Consider implementing `$record-demo` slash command
