import { motion } from "framer-motion";
import { useState } from "react";
import { Play, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

type FormState = "idle" | "loading" | "success" | "error";

const t = {
  pl: {
    eyebrow: "Wkrótce",
    heading: "Rozszerzone materiały online",
    body: "Kompletny zestaw nagrań wideo, rozbudowanych ćwiczeń i zaawansowanych promptów — dostępny w formie płatnej subskrypcji. Idealne uzupełnienie warsztatów lub samodzielne źródło wiedzy o AI dla uczniów.",
    bullets: [
      "Nagrane lekcje wideo z rozbudowanymi ćwiczeniami",
      "Zaawansowane prompty i dodatkowe materiały",
      "Płatny dostęp w ramach subskrypcji",
    ],
    thanks: "Dziękuję!",
    thanksBody: "Dam Ci znać, gdy materiały będą gotowe.",
    formTitle: "Zostaw swój email",
    formSubtitle: "Powiadomię Cię, gdy materiały będą dostępne.",
    namePlaceholder: "Imię (opcjonalnie)",
    emailPlaceholder: "Twój adres email",
    submit: "Zapisz się na listę",
    errors: {
      invalidEmail: "Podaj poprawny adres email",
      tooLong: "Dane są zbyt długie",
      generic: "Coś poszło nie tak. Spróbuj ponownie.",
    },
  },
  en: {
    eyebrow: "Coming soon",
    heading: "Extended online materials",
    body: "A complete set of video recordings, in-depth exercises and advanced prompts — available as a paid subscription. A perfect complement to the workshops or a standalone source of AI knowledge for students.",
    bullets: [
      "Recorded video lessons with in-depth exercises",
      "Advanced prompts and bonus materials",
      "Paid access via subscription",
    ],
    thanks: "Thank you!",
    thanksBody: "I'll let you know as soon as the materials are ready.",
    formTitle: "Leave your email",
    formSubtitle: "I'll notify you when the materials are available.",
    namePlaceholder: "Name (optional)",
    emailPlaceholder: "Your email address",
    submit: "Join the waitlist",
    errors: {
      invalidEmail: "Please enter a valid email address",
      tooLong: "Your input is too long",
      generic: "Something went wrong. Please try again.",
    },
  },
};

export function OnlineMaterialsCard({ isInView }: { isInView: boolean }) {
  const c = useT(t);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg(c.errors.invalidEmail);
      setFormState("error");
      return;
    }
    if (trimmedName.length > 100 || trimmedEmail.length > 255) {
      setErrorMsg(c.errors.tooLong);
      setFormState("error");
      return;
    }

    setFormState("loading");
    const { error } = await supabase.from("waitlist").insert({ email: trimmedEmail, name: trimmedName || null });

    if (error) {
      // Treat duplicate email as success to avoid leaking info
      if (error.code === "23505") {
        setFormState("success");
      } else {
        setErrorMsg(c.errors.generic);
        setFormState("error");
      }
    } else {
      setFormState("success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.39 }}
      className="border border-primary/30 bg-primary/5 rounded-lg p-8 lg:p-10 md:col-span-2 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Play className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">{c.eyebrow}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="font-heading text-2xl font-semibold mb-4">{c.heading}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{c.body}</p>
          <ul className="space-y-3">
            {c.bullets.map((detail) => (
              <li key={detail} className="flex items-center gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          {formState === "success" ? (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <CheckCircle className="w-10 h-10 text-primary" />
              <p className="font-heading text-lg font-semibold">{c.thanks}</p>
              <p className="text-sm text-muted-foreground">{c.thanksBody}</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold mb-1">{c.formTitle}</p>
              <p className="text-xs text-muted-foreground mb-5">{c.formSubtitle}</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormState("idle");
                  }}
                  maxLength={100}
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
                />
                <input
                  type="email"
                  placeholder={c.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormState("idle");
                  }}
                  maxLength={255}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
                />
                {formState === "error" && <p className="text-xs text-destructive">{errorMsg}</p>}
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {formState === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : c.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
