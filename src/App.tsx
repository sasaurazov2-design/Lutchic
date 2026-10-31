import { type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  useEffect(() => {
    document.title = 'Lutchic — все мои площадки';
    const description = 'Lutchic в сети: открой Steam, Twitch, YouTube или TikTok.';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <main className="creator-page">
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="spark spark-one" aria-hidden="true" />
      <div className="spark spark-two" aria-hidden="true" />
      <header className="topline">
        <span className="topline-mark">L /</span>
        <span className="topline-note">МОИ ПЛОЩАДКИ</span>
      </header>

      <section className="hero" aria-labelledby="creator-name">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />ПРИВЕТ, ЭТО</p>
          <h1 id="creator-name">Lutchic<span className="title-period">.</span></h1>
          <p className="intro">Найди меня<br className="desktop-break" /> на своей платформе</p>
          <div className="stamp" aria-label="Четыре площадки">
            <span className="stamp-star" aria-hidden="true" />
            <span>ВЫБИРАЙ<br />СВОЮ</span>
          </div>
        </div>

        <div className="portrait-wrap">
          <div className="portrait-backdrop" aria-hidden="true" />
          <div className="portrait-frame">
            <img src="/avatar.jpg" alt="Аниме-аватар Lutchic" className="portrait" />
          </div>
          <span className="portrait-caption">LUTCHIC / LINKS</span>
          <span className="portrait-spark" aria-hidden="true">✦</span>
        </div>

        <nav className="socials" aria-label="Социальные сети Lutchic">
          <a className="social-link steam" href="https://steamcommunity.com/profiles/76561199835756588/" target="_blank" rel="noreferrer" aria-label="Открыть профиль Lutchic в Steam">
            <span className="social-index">01</span><span className="social-symbol steam-symbol" aria-hidden="true">S</span>
            <span className="social-name">Steam</span><span className="social-hint">ИГРЫ И ПРОФИЛЬ</span><span className="link-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="social-link twitch" href="https://www.twitch.tv/lutchic_1" target="_blank" rel="noreferrer" aria-label="Открыть Twitch Lutchic">
            <span className="social-index">02</span><span className="social-symbol twitch-symbol" aria-hidden="true">T</span>
            <span className="social-name">Twitch</span><span className="social-hint">КАНАЛ</span><span className="link-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="social-link youtube" href="https://www.youtube.com/channel/UCXGV-lsG1UUSTCqiEAZMdPA/posts?pvf=CAI%253D" target="_blank" rel="noreferrer" aria-label="Открыть YouTube Lutchic">
            <span className="social-index">03</span><span className="social-symbol youtube-symbol" aria-hidden="true">▶</span>
            <span className="social-name">YouTube</span><span className="social-hint">ПУБЛИКАЦИИ</span><span className="link-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="social-link tiktok" href="https://www.tiktok.com/@lutchic" target="_blank" rel="noreferrer" aria-label="Открыть TikTok Lutchic">
            <span className="social-index">04</span><span className="social-symbol tiktok-symbol" aria-hidden="true">♪</span>
            <span className="social-name">TikTok</span><span className="social-hint">КОРОТКИЕ ВИДЕО</span><span className="link-arrow" aria-hidden="true">↗</span>
          </a>
        </nav>
      </section>
      <footer className="footer">
        <span>ГДЕ УВИДИМСЯ?</span>
        <span className="footer-rule" aria-hidden="true" />
        <span>LUTCHIC · 4 ПЛОЩАДКИ</span>
      </footer>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
