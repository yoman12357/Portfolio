import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, join, resolve } from 'node:path';
import { brotliCompressSync, constants as zlibConstants, gzipSync } from 'node:zlib';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const COMPRESSIBLE_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt', '.xml']);
const ROOT_DIRECTORY = fileURLToPath(new URL('.', import.meta.url));
const THREE_CHUNK_PACKAGES = new Set([
  '@mediapipe/tasks-vision',
  '@monogrid/gainmap-js',
  '@react-three/drei',
  '@react-three/fiber',
  '@use-gesture/react',
  'base64-js',
  'buffer',
  'camera-controls',
  'detect-gpu',
  'glsl-noise',
  'hls.js',
  'its-fine',
  'maath',
  'meshline',
  'react-use-measure',
  'stats-gl',
  'stats.js',
  'suspend-react',
  'three',
  'three-mesh-bvh',
  'three-stdlib',
  'troika-three-text',
  'troika-three-utils',
  'troika-worker-utils',
  'tunnel-rat',
  'use-sync-external-store',
  'utility-types',
  'zustand',
]);

function getNodeModulePackage(id) {
  const normalizedId = id.replaceAll('\\', '/');
  const nodeModulesSegment = '/node_modules/';
  const nodeModulesIndex = normalizedId.lastIndexOf(nodeModulesSegment);

  if (nodeModulesIndex === -1) {
    return null;
  }

  const packagePath = normalizedId.slice(nodeModulesIndex + nodeModulesSegment.length);
  const segments = packagePath.split('/');

  if (segments[0]?.startsWith('@') && segments[1]) {
    return `${segments[0]}/${segments[1]}`;
  }

  return segments[0] ?? null;
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(absolutePath);
      }

      return absolutePath;
    })
  );

  return files.flat();
}

function compressedAssetsPlugin() {
  return {
    name: 'portfolio-compressed-assets',
    apply: 'build',
    async closeBundle() {
      const distDirectory = resolve(ROOT_DIRECTORY, 'dist');
      const files = await collectFiles(distDirectory);

      await Promise.all(
        files.map(async (filePath) => {
          if (!COMPRESSIBLE_EXTENSIONS.has(extname(filePath))) {
            return;
          }

          const fileStats = await stat(filePath);

          if (fileStats.size < 1024) {
            return;
          }

          const source = await readFile(filePath);
          const gzipBuffer = gzipSync(source, { level: 9 });
          const brotliBuffer = brotliCompressSync(source, {
            params: {
              [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
            },
          });

          await Promise.all([
            writeFile(`${filePath}.gz`, gzipBuffer),
            writeFile(`${filePath}.br`, brotliBuffer),
          ]);
        })
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), compressedAssetsPlugin()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const packageName = getNodeModulePackage(id);

          if (!packageName) {
            return undefined;
          }

          if (packageName === 'react' || packageName === 'react-dom' || packageName === 'scheduler') {
            return 'react-vendor';
          }

          if (
            packageName === 'framer-motion' ||
            packageName === 'motion-dom' ||
            packageName === 'motion-utils'
          ) {
            return 'motion';
          }

          if (
            packageName &&
            (THREE_CHUNK_PACKAGES.has(packageName) ||
              packageName.startsWith('@react-three/') ||
              packageName.startsWith('troika-'))
          ) {
            return 'three-vendor';
          }

          if (packageName === 'react-icons') {
            return 'icons';
          }

          if (packageName === 'firebase' || packageName.startsWith('@firebase/')) {
            return 'firebase';
          }

          return 'vendor';
        },
      },
    },
  },
});
