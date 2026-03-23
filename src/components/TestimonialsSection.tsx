import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Szuper csapat, fantasztikus munka! Mindent intéztek helyettem az anyagbeszerzéstől kezdve. Pontosak, megbízhatóak és profik voltak.",
    name: "Andrea B.",
  },
  {
    text: "Sürgős kőműves munkát végeztek nálunk. Gyorsan reagáltak, pontosan érkeztek, és a javítást igényesen, tisztán csinálták meg.",
    name: "Judit K.",
  },
  {
    text: "Hatalmas köszönet a Joe Bau csapatnak! Kerítést, térkövezést és garázst építettek. Bárkinek bátran ajánlom őket, ha igényes munkát szeretne!",
    name: "Zsombor B.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="velemenyek" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ügyfeleink mondták</h2>
          <p className="text-muted-foreground text-lg">Büszkék vagyunk elégedett ügyfeleinkre</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 border border-border shadow-md relative"
            >
              <Quote size={32} className="text-accent/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <p className="font-heading font-bold text-primary">– {t.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
