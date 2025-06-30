#!/bin/bash

# Sync from GitLab to GitHub
# This script pulls latest changes from GitLab and pushes to GitHub

echo "🔄 Syncing from GitLab to GitHub..."

# Fetch latest changes from GitLab
echo "📥 Fetching from GitLab..."
git fetch gitlab

# Check if there are any changes
GITLAB_COMMIT=$(git rev-parse gitlab/main)
CURRENT_COMMIT=$(git rev-parse HEAD)

if [ "$GITLAB_COMMIT" = "$CURRENT_COMMIT" ]; then
    echo "✅ Already up to date with GitLab"
else
    echo "🔄 Merging changes from GitLab..."
    git merge gitlab/main --no-edit
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully merged GitLab changes"
        
        echo "📤 Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully pushed to GitHub"
            echo "🎉 Sync complete!"
        else
            echo "❌ Failed to push to GitHub"
            exit 1
        fi
    else
        echo "❌ Merge conflicts detected. Please resolve manually."
        exit 1
    fi
fi 