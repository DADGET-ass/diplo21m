import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Component
      {...pageProps}
    />
  )
}
