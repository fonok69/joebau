import { motion } from "framer-motion";
import { Building2, Hammer, BrickWall, LayoutGrid, Fence, PaintBucket, Thermometer } from "lucide-react";

const services = [
  { icon: Building2, title: "Generálkivitelezés és Lakásfelújítás", desc: "Teljes körű lakásfelújítás A-tól Z-ig – kulcsrakész megoldások [Budapest] és környékén." },
  { icon: Hammer, title: "Ácsmunkák és Tetőfedés", desc: "Profi tetőfedés, tetőjavítás, akár S.O.S. tetőjavítás sürgős esetben is [Város] környékén." },
  { icon: BrickWall, title: "Kőműves munkák", desc: "Megbízható kőműves és burkoló: falazás, vakolás, betonozás professzionális kivitelben." },
  { icon: LayoutGrid, title: "Burkolás", desc: "Hideg-meleg burkolás, csempe- és járólaprakás precíz munkával." },
  { icon: Fence, title: "Térkövezés és Kerítésépítés", desc: "Térkövezés és kocsibeálló építés, teraszok, kerítések tervezése és kivitelezése." },
  { icon: PaintBucket, title: "Festés, mázolás és gipszkartonozás", desc: "Beltéri és kültéri festés, mázolás, gipszkarton szerelés és burkolás." },
  { icon: Thermometer, title: "Homlokzati hőszigetelés", desc: "Homlokzati hőszigetelés és színezés – energiatakarékos megoldások profiktól." },
];

const ServicesSection = () => {
  return (
    <section id="szolgaltatasok" className="py-20 lg:py-28 section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Szolgáltatásaink</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Széles körű építőipari szolgáltatásokat kínálunk – az ácsmunkától a térkövezésig.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg gradient-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
