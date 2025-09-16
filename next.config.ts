import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[ new URL('https://fastly.picsum.photos/**')] 
  }
};

export default withNextIntl(nextConfig);
