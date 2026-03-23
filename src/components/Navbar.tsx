import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Rólunk", href: "#rolunk" },
  { label: "Szolgáltatások", href: "#szolgaltatasok" },
  { label: "Vélemények", href: "#velemenyek" },
  { label: "Kapcsolat", href: "#kapcsolat" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-navy border-b border-navy-light/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="font-heading text-2xl font-bold text-primary-foreground tracking-tight">
          Joe<span className="text-gradient-orange">Bau</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:+36208009060" className="flex items-center gap-2 gradient-orange text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Phone size={16} /> +36(20) 800-9060
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary-foreground" aria-label="Menü">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden gradient-navy overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-accent transition-colors font-medium">
                  {l.label}
                </a>
              ))}
              <a href="tel:+36208009060" className="flex items-center gap-2 gradient-orange text-accent-foreground px-4 py-2.5 rounded-lg text-sm font-semibold w-fit">
                <Phone size={16} /> +36(20) 800-9060
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
