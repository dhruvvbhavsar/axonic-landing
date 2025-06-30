# GitLab ↔ GitHub Sync Scripts

This directory contains scripts to seamlessly sync between GitLab and GitHub repositories.

## Remote Configuration

- **gitlab**: `git@gitlab.clinivantage.co.in:dhruvb/axonic-landing.git` (source of truth)
- **origin**: `https://github.com/dhruvvbhavsar/axonic-landing.git` (GitHub mirror)

## Available Scripts

### 1. Sync from GitLab (`sync-from-gitlab.sh`)
Pulls latest changes from GitLab and pushes them to GitHub.

```bash
# Run the script directly
./scripts/sync-from-gitlab.sh

# Or use the git alias
git sync-gitlab
```

**What it does:**
- Fetches latest changes from GitLab
- Merges them into your local main branch
- Pushes the updated code to GitHub
- Handles merge conflicts gracefully

### 2. Push to Both (`push-to-both.sh`)
Pushes your local changes to both GitLab and GitHub.

```bash
# Run the script directly
./scripts/push-to-both.sh

# Or use the git alias
git push-both
```

**What it does:**
- Checks for uncommitted changes
- Pushes to GitHub first
- Then pushes to GitLab
- Ensures both remotes are in sync

## Recommended Workflow

### Daily Development Workflow

1. **Start your day by syncing from GitLab:**
   ```bash
   git sync-gitlab
   ```

2. **Make your changes and commit them:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. **Push to both repositories:**
   ```bash
   git push-both
   ```

### If Others are Working on GitLab

If your team primarily uses GitLab and you want to keep GitHub as a mirror:

1. **Always sync from GitLab first:**
   ```bash
   git sync-gitlab
   ```

2. **Then make your changes and push to both:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push-both
   ```

## Manual Commands

If you prefer manual control:

```bash
# Pull from GitLab
git fetch gitlab
git merge gitlab/main

# Push to GitHub
git push origin main

# Push to GitLab
git push gitlab main

# Check remote status
git remote -v
git branch -r
```

## Troubleshooting

### Merge Conflicts
If you encounter merge conflicts when syncing from GitLab:
1. The script will stop and notify you
2. Resolve conflicts manually using your editor
3. Complete the merge: `git add . && git commit`
4. Run `git push-both` to sync both remotes

### Authentication Issues
- **GitLab**: Uses SSH key authentication
- **GitHub**: Uses HTTPS (may prompt for credentials)

### Reset to GitLab State
If GitHub gets out of sync and you want to reset it to match GitLab:
```bash
git fetch gitlab
git reset --hard gitlab/main
git push origin main --force
``` 