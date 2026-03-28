import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogIn, Shield } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Hibás e-mail vagy jelszó.");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary font-heading">Joe Bau Admin</h1>
          <p className="text-muted-foreground mt-1">Belépés az adminisztrációs felületre</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card rounded-xl p-8 shadow-lg border border-border space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-foreground mb-1.5">E-mail</label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="admin@joebau.hu"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-foreground mb-1.5">Jelszó</label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-navy text-primary-foreground py-3.5 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <LogIn size={20} /> {loading ? "Belépés..." : "Belépés"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
