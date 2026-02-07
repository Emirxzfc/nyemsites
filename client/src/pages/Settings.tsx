import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold mb-8 text-glow">{t.settings.title}</h1>

        <div className="space-y-6">
          <Card className="glass-card neon-border overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <Monitor className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl font-display">{t.settings.theme}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className={theme === "light" ? "bg-primary text-black" : "border-primary/20 hover:border-primary/50"}
                onClick={() => setTheme("light")}
              >
                <Sun className="w-4 h-4 mr-2" />
                {t.settings.light}
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className={theme === "dark" ? "bg-primary text-black" : "border-primary/20 hover:border-primary/50"}
                onClick={() => setTheme("dark")}
              >
                <Moon className="w-4 h-4 mr-2" />
                {t.settings.dark}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card neon-border overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <Globe className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl font-display">{t.settings.language}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button
                variant={language === "tr" ? "default" : "outline"}
                className={language === "tr" ? "bg-primary text-black" : "border-primary/20 hover:border-primary/50"}
                onClick={() => setLanguage("tr")}
              >
                Türkçe
              </Button>
              <Button
                variant={language === "en" ? "default" : "outline"}
                className={language === "en" ? "bg-primary text-black" : "border-primary/20 hover:border-primary/50"}
                onClick={() => setLanguage("en")}
              >
                English
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
