import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import { useAuthStore } from '@/data/store/useAuthStore';
import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import { check } from '@/data/api';
import { Loader } from '@/_views/ui/Loader';

export default function App({ Component, pageProps }: AppProps) {
  const { push, asPath } = useRouter();
  const { isAuth, setAuth, setUserRole, userRole } = useAuthStore()

  const checkToken = () => {
    check().then(e => {
      if (!e.user) {
        setAuth(false);
        if (['/auth', '/registration', '/recovery'].includes(asPath)) {
          return
        } else {
          push('auth');
        }
      }
      if (e.user && e.user.role !== userRole) {
        setUserRole(e.user.role)
      }
      setAuth(true);
      
     
  
    });
  }

  useEffect(() => {
    checkToken();
    const t = setInterval(() => {
      checkToken();
    }, 60000);
    return () => clearInterval(t)
  }, [asPath]);

  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
};



