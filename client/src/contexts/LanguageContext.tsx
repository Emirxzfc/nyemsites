import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "tr";

const translations = {
  en: {
    nav: { home: "Home", games: "Games", team: "Team", settings: "Settings" },
    hero: { title: "NyEm Inc.", subtitle: "Creating the future of Roblox experiences", cta: "Play Now", join: "Join Group" },
    stats: { members: "Group Members", visits: "Total Visits", players: "Active Players" },
    games: { title: "New Releases", viewAll: "View All Games", playing: "Playing", likes: "Likes" },
    settings: { title: "Settings", theme: "Theme", language: "Language", light: "Light", dark: "Dark" },
    team: { title: "Our Team" }
  },
  tr: {
    nav: { home: "Ana Sayfa", games: "Oyunlar", team: "Ekip", settings: "Ayarlar" },
    hero: { title: "NyEm Inc.", subtitle: "Roblox deneyimlerinin geleceğini tasarlıyoruz", cta: "Hemen Oyna", join: "Gruba Katıl" },
    stats: { members: "Grup Üyeleri", visits: "Toplam Ziyaret", players: "Aktif Oyuncular" },
    games: { title: "Yeni Çıkanlar", viewAll: "Tüm Oyunları Gör", playing: "Oynuyor", likes: "Beğeni" },
    settings: { title: "Ayarlar", theme: "Tema", language: "Dil", light: "Açık", dark: "Koyu" },
    team: { title: "Ekibimiz" }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const t = translations[language];

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
