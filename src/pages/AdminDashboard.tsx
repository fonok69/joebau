import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Mail, Phone, Clock, User, MessageSquare, RefreshCw, Eye, EyeOff } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  status: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setUser(session.user);
      fetchSubmissions();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login");
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Hiba az adatok betöltésekor.");
      console.error(error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary font-heading">Joe Bau Admin</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              title="Frissítés"
            >
              <RefreshCw size={18} className="text-muted-foreground" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <LogOut size={16} /> Kijelentkezés
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Összes ajánlatkérés</p>
            <p className="text-3xl font-bold text-primary">{submissions.length}</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Mai ajánlatkérések</p>
            <p className="text-3xl font-bold text-accent">
              {submissions.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Elmúlt 7 nap</p>
            <p className="text-3xl font-bold text-primary">
              {submissions.filter(s => new Date(s.created_at) > new Date(Date.now() - 7 * 86400000)).length}
            </p>
          </div>
        </div>

        {/* Submissions */}
        <h2 className="text-lg font-bold text-foreground mb-4">Beérkezett ajánlatkérések</h2>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Betöltés...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Még nincs beérkezett ajánlatkérés.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-navy rounded-full flex items-center justify-center shrink-0">
                      <User size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{sub.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-0.5">
                        <a href={`mailto:${sub.email}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                          <Mail size={14} /> {sub.email}
                        </a>
                        {sub.phone && (
                          <a href={`tel:${sub.phone}`} className="flex items-center gap-1 hover:text-accent transition-colors">
                            <Phone size={14} /> {sub.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                    <Clock size={14} />
                    {formatDate(sub.created_at)}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{sub.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
