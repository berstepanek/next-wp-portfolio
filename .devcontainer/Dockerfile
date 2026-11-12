FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-22-bookworm
ENV NODE_OPTIONS='--stack-trace-limit=100'
RUN apt-get update && apt-get install -y --no-install-recommends bash-completion && rm -rf /var/lib/apt/lists/*
