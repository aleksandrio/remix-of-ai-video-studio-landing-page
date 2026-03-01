import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { passcode, action, ...params } = body;

    const adminPasscode = Deno.env.get("ADMIN_PASSCODE");
    if (!adminPasscode || passcode !== adminPasscode) {
      return new Response(
        JSON.stringify({ error: "Nieprawidłowy kod dostępu" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result: unknown;

    switch (action) {
      case "verify": {
        result = { ok: true };
        break;
      }

      case "list_lessons": {
        const { data, error } = await supabase
          .from("lesson_configs")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = data;
        break;
      }

      case "create_lesson": {
        const { data, error } = await supabase
          .from("lesson_configs")
          .insert({
            lesson_slug: params.slug,
            title: params.title || params.slug,
            start_survey_enabled: true,
            feedback_survey_enabled: true,
          })
          .select()
          .single();
        if (error) throw error;
        await supabase
          .from("survey_sessions")
          .insert({ lesson_slug: params.slug, name: "Sesja 1", status: "active" });
        result = data;
        break;
      }

      case "delete_lesson": {
        const { error } = await supabase
          .from("lesson_configs")
          .delete()
          .eq("lesson_slug", params.slug);
        if (error) throw error;
        result = { ok: true };
        break;
      }

      case "update_lesson": {
        const updates: Record<string, unknown> = {};
        if (params.title !== undefined) updates.title = params.title;
        if (params.start_survey_enabled !== undefined)
          updates.start_survey_enabled = params.start_survey_enabled;
        if (params.feedback_survey_enabled !== undefined)
          updates.feedback_survey_enabled = params.feedback_survey_enabled;
        const { error } = await supabase
          .from("lesson_configs")
          .update(updates)
          .eq("lesson_slug", params.slug);
        if (error) throw error;
        result = { ok: true };
        break;
      }

      case "list_sessions": {
        const { data, error } = await supabase
          .from("survey_sessions")
          .select("*")
          .eq("lesson_slug", params.slug)
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = data;
        break;
      }

      case "create_session": {
        await supabase
          .from("survey_sessions")
          .update({ status: "archived", archived_at: new Date().toISOString() })
          .eq("lesson_slug", params.slug)
          .eq("status", "active");
        const { data, error } = await supabase
          .from("survey_sessions")
          .insert({
            lesson_slug: params.slug,
            name: params.name || `Sesja ${new Date().toLocaleDateString("pl")}`,
            status: "active",
          })
          .select()
          .single();
        if (error) throw error;
        result = data;
        break;
      }

      case "archive_session": {
        const { error } = await supabase
          .from("survey_sessions")
          .update({ status: "archived", archived_at: new Date().toISOString() })
          .eq("id", params.session_id);
        if (error) throw error;
        result = { ok: true };
        break;
      }

      case "get_responses": {
        let query = supabase
          .from("survey_responses")
          .select("*")
          .eq("lesson_slug", params.slug)
          .order("created_at", { ascending: false });
        if (params.session_id) query = query.eq("session_id", params.session_id);
        if (params.survey_type) query = query.eq("survey_type", params.survey_type);
        const { data, error } = await query;
        if (error) throw error;
        result = data;
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
