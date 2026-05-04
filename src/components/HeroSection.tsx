import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-classroom.webp";
import { useLang } from "@/lib/i18n";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const t = lang === 'pl' ? {
    eyebrow: 'Warsztaty AI dla szkół',
    title1: 'AI to mentor,',
    title2: 'nie ściąga.',
    subtitle: 'Uczę uczniów, jak mądrze korzystać ze sztucznej inteligencji — do nauki, rozwoju i kreatywności.',
    cta1: 'Zamów warsztaty',
    cta2: 'Zobacz program',
    scroll: 'Przewiń',
    alt: 'Uczniowie pracujący z AI w nowoczesnej klasie',
  } : {
    eyebrow: 'AI Workshops for Schools',
    title1: 'AI is a mentor,',
    title2: 'not a cheat sheet.',
    subtitle: 'I teach students how to use artificial intelligence wisely — for learning, growth and creativity.',
    cta1: 'Book a workshop',
    cta2: 'See the program',
    scroll: 'Scroll',
    alt: 'Students working with AI in a modern classroom',
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col">
      <div className="relative w-full h-screen overflow-hidden">
        <motion.img
          src={heroImage}
          alt={t.alt}
          className="w-full h-[120%] object-cover brightness-[0.45] absolute inset-0"
          style={{ y: imageY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.5)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-semibold tracking-editorial uppercase text-white mb-6"
          >
            {t.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-heading text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl"
          >
            {t.title1}
            <br />
            {t.title2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-base sm:text-lg text-white max-w-xl leading-relaxed font-normal"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#kontakt"
              className="text-sm font-semibold tracking-wide uppercase bg-white text-[hsl(30,10%,12%)] px-10 py-4 hover:bg-white/90 transition-all duration-300"
              style={{ textShadow: "none" }}
            >
              {t.cta1}
            </a>
            <a
              href="#program"
              className="text-sm font-semibold tracking-wide uppercase border-2 border-white text-white px-10 py-4 hover:bg-white/15 transition-all duration-300"
            >
              {t.cta2}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-editorial uppercase text-white/70">{t.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-white/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
