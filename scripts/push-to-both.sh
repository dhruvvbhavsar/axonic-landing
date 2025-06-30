#!/bin/bash

# Push to both GitLab and GitHub
# This script pushes your local changes to both remotes

echo "🚀 Pushing to both GitLab and GitHub..."

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ You have uncommitted changes. Please commit them first."
    exit 1
fi

# Push to GitHub (origin)
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

# Push to GitLab
echo "📤 Pushing to GitLab..."
git push gitlab main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitLab"
    echo "🎉 Push to both remotes complete!"
else
    echo "❌ Failed to push to GitLab"
    exit 1
fi 