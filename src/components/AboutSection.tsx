import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.png";
import { useLang } from "@/lib/i18n";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLang();
  const t = lang === 'pl' ? {
    eyebrow: 'Prowadzący',
    title: 'O mnie',
    body: 'Programuję od 13 lat. Teraz specjalizuję się we wdrażaniu AI w firmach i tworzeniu produktów, które to wykorzystują. Prowadzę meetupy o AI w nauce (ostatnio na SGH – 140 uczestników). Zajęcia z uczniami zacząłem, bo widzę ogromny potencjał, który w nich drzemie – i chcę pokazać, jak mogą go uwolnić dzięki narzędziom AI.',
    alt: 'Zdjęcie prowadzącego',
  } : {
    eyebrow: 'Instructor',
    title: 'About me',
    body: 'I’ve been programming for 13 years. Today I specialize in implementing AI in companies and building products that use it. I run AI-in-education meetups (recently at SGH — 140 attendees). I started teaching students because I see huge potential in them — and I want to show how to unlock it with AI tools.',
    alt: 'Instructor photo',
  };

  return (
    <section id="o-mnie" ref={ref} className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">{t.eyebrow}</p>
          <div className="flex flex-col sm:flex-row items-start gap-8 max-w-5xl">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">{t.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.body}</p>
            </div>
            <img src={profileImage} alt={t.alt} className="w-72 h-72 rounded-full object-cover flex-shrink-0 ring-2 ring-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
