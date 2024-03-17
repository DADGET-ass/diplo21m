import '@/styles/global.scss'
import { getCookie } from '@/utils/cookies';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   const token = getCookie('token');
    
  //   if (!token) {
  //     router.push('/auth');
  //   }
  // }, [router])

  return (
      <Component
        {...pageProps}
      />
  )
}
