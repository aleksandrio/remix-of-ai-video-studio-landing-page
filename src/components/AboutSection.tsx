import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="o-mnie" ref={ref} className="py-20 lg:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">Prowadzący</p>

          <div className="flex flex-col sm:flex-row items-start gap-8 max-w-5xl">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                O mnie
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Programuję od 13 lat. Teraz specjalizuję się we wdrażaniu AI w firmach i tworzeniu produktów, które to
                wykorzystują. Prowadzę meetupy o AI w nauce (ostatnio na SGH – 140 uczestników). Zajęcia z uczniami
                zacząłem, bo widzę ogromny potencjał, który w nich drzemie – i chcę pokazać, jak mogą go uwolnić dzięki
                narzędziom AI.
              </p>
            </div>
            <img
              src={profileImage}
              alt="Zdjęcie prowadzącego"
              className="w-72 h-72 rounded-full object-cover flex-shrink-0 ring-2 ring-border"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
