import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminFloatingTab = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAdmin(true);
        fetchNewCount();
      }
    };

    const fetchNewCount = async () => {
      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setNewCount(count || 0);
    };

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
      if (session) fetchNewCount();
    });

    // Realtime updates
    const channel = supabase
      .channel("new-submissions")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "contact_submissions" }, () => {
        fetchNewCount();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "contact_submissions" }, () => {
        fetchNewCount();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => navigate("/admin")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
    >
      <Bell size={20} />
      <span className="font-semibold text-sm">Admin</span>
      {newCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
          {newCount}
        </span>
      )}
    </button>
  );
};

export default AdminFloatingTab;
