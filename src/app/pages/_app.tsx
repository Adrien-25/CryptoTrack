// pages/_app.tsx
import { FavoritesProvider } from '../context/FavoritesContext';
import type { AppProps } from 'next/app';


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}
