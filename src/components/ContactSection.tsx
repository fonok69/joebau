import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      const { data, error } = await supabase.functions.invoke("notify-admin", {
        body: { name, email, phone, message },
      });

      if (error) {
        console.error("Error:", error);
        toast.error("Hiba történt az ajánlatkérés küldése közben. Kérjük, próbálja újra.");
      } else {
        toast.success("Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.");
        form.reset();
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Hiba történt. Kérjük, próbálja újra később.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="kapcsolat" className="py-20 lg:py-28 section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ingyenes Ajánlatkérés</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kérjen ajánlatot lakásfelújításra, ácsmunkára vagy generálkivitelezésre – díjmentesen!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-card rounded-xl p-8 shadow-lg border border-border space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">Név *</label>
              <input id="name" name="name" required className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none" placeholder="Teljes neve" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">E-mail *</label>
                <input id="email" name="email" type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none" placeholder="pelda@email.hu" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">Telefonszám</label>
                <input id="phone" name="phone" type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none" placeholder="+36 ..." />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">Munka leírása *</label>
              <textarea id="message" name="message" required rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none resize-none" placeholder="Írja le röviden, milyen munkát szeretne..." />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full gradient-orange text-accent-foreground py-3.5 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={20} /> {sending ? "Küldés..." : "Ajánlatot kérek"}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-center gap-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 gradient-navy rounded-lg flex items-center justify-center shrink-0">
                <Phone size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary">Telefon</h3>
                <a href="tel:+36208009060" className="text-muted-foreground hover:text-accent transition-colors">+36(20) 800-9060</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 gradient-navy rounded-lg flex items-center justify-center shrink-0">
                <Mail size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary">E-mail</h3>
                <a href="mailto:info@joebau.hu" className="text-muted-foreground hover:text-accent transition-colors">info@joebau.hu</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 gradient-navy rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-primary">Szolgáltatási terület</h3>
                <p className="text-muted-foreground">Az ország egész területén</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
