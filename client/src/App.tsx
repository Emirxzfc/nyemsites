import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Team from "@/pages/Team";
import Settings from "@/pages/Settings";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Gamepad2, Users, Settings as SettingsIcon } from "lucide-react";

function Navbar() {
  const [location] = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-4 py-3 flex items-center justify-between border-b border-white/5">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-shadow">
          <span className="text-black font-bold font-display">N</span>
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-glow">NyEm Inc.</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6">
        {[
          { href: "/", label: t.nav.home, icon: HomeIcon },
          { href: "/games", label: t.nav.games, icon: Gamepad2 },
          { href: "/team", label: t.nav.team, icon: Users },
          { href: "/settings", label: t.nav.settings, icon: SettingsIcon },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <a className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}>
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          </Link>
        ))}
      </div>

      <Button size="sm" className="neon-border bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all" asChild>
        <a href="https://roblox.com" target="_blank" rel="noopener noreferrer">
          {t.hero.join}
        </a>
      </Button>
    </nav>
  );
}

function Router() {
  return (
    <div className="pt-16 min-h-screen bg-background">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/team" component={Team} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Navbar />
            <Router />
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
