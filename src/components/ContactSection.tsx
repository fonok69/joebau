import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kapcsolat" className="py-20 lg:py-28 section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ajánlatkérés</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kérjen díjmentes árajánlatot telefonon – gyorsan és egyszerűen!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-card rounded-xl p-10 shadow-lg border border-border text-center space-y-8"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 gradient-orange rounded-full flex items-center justify-center">
              <Phone size={28} className="text-accent-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary">Hívjon minket!</h3>
            <a
              href="tel:+36208009060"
              className="text-3xl md:text-4xl font-bold text-accent hover:opacity-80 transition-opacity"
            >
              +36 (20) 800-9060
            </a>
            <p className="text-muted-foreground text-sm mt-1">Hétfő – Szombat, 7:00 – 18:00</p>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <a href="mailto:info@joebau.hu" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={18} /> info@joebau.hu
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={18} /> Az ország egész területén
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
