import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Modern lakásfelújítás és építkezés Joe Bau kivitelezésben"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block gradient-orange text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
        >
          Ránk építhet!
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight max-w-4xl mx-auto"
        >
          Profi Építőipari Kivitelezés és{" "}
          <span className="text-gradient-orange">Teljes Körű Lakásfelújítás</span>{" "}
          A-tól Z-ig
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
        >
          Sokéves tapasztalattal, garanciával és teljes körű anyagbeszerzéssel vesszük le a terhet a válláról – az ország egész területén.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#szolgaltatasok"
            className="gradient-orange text-accent-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <ArrowDown size={20} /> Szolgáltatásaink
          </a>
          <a
            href="#kapcsolat"
            className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-primary-foreground/10 transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={20} /> Ingyenes Ajánlatkérés
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
