# Remotion Skills: Official + Toolkit Split

## Why Two Skills?

The toolkit maintains two complementary Remotion skills:

| Skill | Path | Source | Content |
|-------|------|--------|---------|
| `remotion-official` | `.agents/skills/remotion-official/` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Core framework knowledge (hooks, animations, rendering, media, etc.) |
| `remotion` | `.agents/skills/remotion/` | This toolkit | Custom transitions, shared components, project conventions |

**Before the split**, our `remotion/SKILL.md` duplicated core Remotion documentation that quickly became outdated. The official skill repo is maintained by the Remotion team and stays current with framework releases.

## What Lives Where

### remotion-official (upstream-managed)
- Animation APIs (`interpolate`, `spring`, easing)
- Composition registration and config
- Sequencing (`Sequence`, `Series`, `Loop`, `Freeze`)
- Media components (`Video`, `Audio`, `Img`, `OffthreadVideo`)
- Static files and assets
- Input props and async data loading
- CLI and programmatic rendering
- Lambda deployment
- Player component
- Captions, charts, 3D, fonts, Tailwind, etc.

### remotion (toolkit-managed)
- Custom transition library (`lib/transitions/`)
- Shared component catalog (`lib/components/`)
- Toolkit best practices and conventions
- Project timing guidelines
- Transition duration guidelines

## Automatic Sync

A GitHub Actions workflow (`.github/workflows/sync-remotion-skills.yml`) runs weekly to check for upstream changes:

1. Clones `remotion-dev/skills` (shallow)
2. Compares `skills/remotion/` against our `.agents/skills/remotion-official/`
3. Opens a PR if files have changed

### Manual Sync

To sync manually:

```bash
# Clone upstream
git clone --depth 1 https://github.com/remotion-dev/skills.git /tmp/remotion-skills

# Copy into toolkit
rm -rf .agents/skills/remotion-official
cp -r /tmp/remotion-skills/skills/remotion .agents/skills/remotion-official

# Commit
git add .agents/skills/remotion-official
git commit -m "Sync official Remotion skills ($(git -C /tmp/remotion-skills rev-parse --short HEAD))"
```

### Handling Sync PRs

When the automated PR arrives:
1. Skim the diff for any breaking changes
2. Check if new rules overlap with our toolkit skill (unlikely but possible)
3. Merge if everything looks good
