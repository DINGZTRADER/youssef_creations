import './styles.css';
import './logo-overrides.css';

export const metadata = {
  title: 'YousefCreationz | Kampala Style',
  description: 'Curated men’s clothing and essentials in Kampala. Browse, get styling help, and order directly on WhatsApp.',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
