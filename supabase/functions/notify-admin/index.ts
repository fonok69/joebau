import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Hiányzó mezők" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Save to database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, message });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Adatbázis hiba" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send admin notification email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const ADMIN_EMAIL = "info@joebau.hu";
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Joe Bau Értesítő <onboarding@resend.dev>",
            to: [ADMIN_EMAIL],
            subject: `Új ajánlatkérés: ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1a365d, #2d4a7a); padding: 24px; border-radius: 12px 12px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 22px;">🏗️ Új Ajánlatkérés Érkezett!</h1>
                </div>
                <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a365d; width: 140px;">Név:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a365d;">E-mail:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1a365d;">Telefon:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone || ''}" style="color: #f97316;">${phone || "Nincs megadva"}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: bold; color: #1a365d; vertical-align: top;">Üzenet:</td>
                      <td style="padding: 12px 0; color: #334155; line-height: 1.6;">${message}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 20px; padding: 16px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f97316;">
                    <p style="margin: 0; color: #9a3412; font-size: 14px;">💡 Kérjük, vegye fel a kapcsolatot az ügyféllel 24 órán belül!</p>
                  </div>
                </div>
                <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">Joe Bau – Értesítési rendszer</p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Email send failed:", errText);
        } else {
          console.log("Admin notification email sent successfully");
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    } else {
      console.log("RESEND_API_KEY not set - email skipped");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Szerverhiba" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
