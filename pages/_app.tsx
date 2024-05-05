import { useEffect } from 'react'
import { useRouter } from 'next/router';

import { useAuthStore } from '@/data/store/useAuthStore';
import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import { check } from '@/data/api';

export default function App({ Component, pageProps }: AppProps) {
  const { push, asPath } = useRouter();
  const { isAuth, setAuth, setUserRole, userRole } = useAuthStore()

  const checkToken = () => {
    check().then(e => {
      if (!e.user.status) {
        setAuth(false);
        if (['/auth', '/registration'].includes(asPath)) {
          return
        } else {
          push('auth');
        }
      }
      if (e.user.role !== userRole) {
        setUserRole(e.user.role)
      }
      setAuth(true)
    })
  }

  useEffect(() => {
    checkToken();
    const t = setInterval(() => {
      checkToken();
    }, 60000);
    return () => clearInterval(t)
  }, [asPath]);

  return (
    <Component
      {...pageProps}
    />
  )
}
