import { Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="gradient-navy py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-heading text-2xl font-bold text-primary-foreground">
            Joe<span className="text-gradient-orange">Bau</span>
          </span>
          <p className="text-primary-foreground/60 text-sm mt-1">Ránk építhet! – Generálkivitelezés és lakásfelújítás</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-primary-foreground/70 text-sm">
          <a href="tel:+36208009060" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone size={16} /> +36(20) 800-9060
          </a>
          <a href="mailto:info@joebau.hu" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail size={16} /> info@joebau.hu
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-primary-foreground/40 text-xs">
        © {new Date().getFullYear()} Joe Bau. Minden jog fenntartva.
      </div>
    </div>
  </footer>
);

export default Footer;
