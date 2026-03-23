import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ClipboardCheck } from "lucide-react";

const values = [
  {
    icon: ClipboardCheck,
    title: "Teljes körű ügyintézés",
    desc: "Anyagbeszerzést is vállaljuk – Önnek nem kell mással törődnie.",
  },
  {
    icon: Sparkles,
    title: "Precíz és tiszta munkavégzés",
    desc: "Igényes, rendezett munkaterület, professzionális eredmény.",
  },
  {
    icon: ShieldCheck,
    title: "Megbízhatóság és garancia",
    desc: "Pontos határidők, garanciális munkavégzés minden projekten.",
  },
];

const AboutSection = () => {
  return (
    <section id="rolunk" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Miért a Joe Bau csapatát válassza?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Legyen szó induló építkezésről vagy teljes lakásfelújításról, vidám, fiatalos és precíz csapatunk minden terhet levesz a válláról. Az anyagbeszerzéstől a generálkivitelezésig mindent ránk bízhat <strong>[Budapest]</strong> és környékén. Megbízhatóság, precizitás és tisztaság – ezek vagyunk mi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 text-center shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 gradient-orange rounded-xl flex items-center justify-center mx-auto mb-5">
                <v.icon size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">{v.title}</h3>
              <p className="text-muted-foreground">{v.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
