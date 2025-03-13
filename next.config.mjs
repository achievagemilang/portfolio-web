import createMDX from '@next/mdx';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['placeholder.com', 'images.unsplash.com', 'cdn-images-1.medium.com'],
  },
  // This is important for Contentlayer to work with Next.js
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      // https://github.com/vercel/next.js/issues/7755
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          child_process: false,
          fs: false,
          path: false,
          'builtin-modules': false,
          worker_threads: false,
        },
      };
    }
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

const withMDX = createMDX();

// Export the combined config
export default withMDX({
  ...nextConfig,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
