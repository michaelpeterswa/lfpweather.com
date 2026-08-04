# syntax=docker/dockerfile:1
FROM oven/bun:1.3 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
# TARGETARCH scopes the cache mounts so the amd64 and arm64 builds do not share
# a cache (native binaries differ between them).
ARG TARGETARCH
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
# hadolint ignore=DL3003
RUN --mount=type=cache,target=/root/.bun/install/cache,id=bun-$TARGETARCH \
    cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
# hadolint ignore=DL3003
RUN --mount=type=cache,target=/root/.bun/install/cache,id=bun-$TARGETARCH \
    cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
ARG TARGETARCH
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# The .next/cache mount persists Next's incremental compilation between builds.
# hadolint ignore=DL3059
RUN --mount=type=cache,target=/usr/src/app/.next/cache,id=next-$TARGETARCH \
    bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/.next/standalone ./
COPY --from=prerelease /usr/src/app/.next/static ./.next/static
COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/package.json .

# ensure cache directory is writable by bun user
RUN mkdir -p .next/cache && chown -R bun:bun .next/cache

# run the app
USER bun

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server.js" ]
