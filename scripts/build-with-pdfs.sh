#!/bin/bash
set -e

echo "==> Building VitePress site..."
npx vitepress build docs

echo "==> Starting preview server on port 8088..."
npx vitepress preview docs --port 8088 &
SERVER_PID=$!

echo "==> Waiting for server to be ready..."
npx wait-on http://localhost:8088 --timeout 30000

echo "==> Generating PDFs to dist directory..."
OUTPUT_DIR=docs/.vitepress/dist/pdf node scripts/generate-resume-pdfs.js

echo "==> Cleaning up server..."
kill $SERVER_PID 2>/dev/null || true

echo "==> Build complete!"
