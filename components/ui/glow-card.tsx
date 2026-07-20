import * as React from "react";

import { cn } from "@/lib/utils";

export interface GlowCardProps extends React.ComponentProps<"div"> {
  /** Подсвечивает рамку и тень мягким акцентом — используется при активном drag&drop. */
  active?: boolean;
}

/**
 * Общая "мягкая" карточка с тонкой рамкой, лёгким размытием фона и
 * диффузным (не резким) свечением по краям.
 *
 * Единый источник этого фона — используется и в виджете загрузки файла
 * (UploadCard), и в карточке-заглушке недостроенных разделов (ComingSoon),
 * так что стиль редактируется в одном месте, а не дублируется между ними.
 */
export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(function GlowCard(
  { active, className, style, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl border border-white/8 bg-card/70 backdrop-blur-xl transition-all duration-200",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.02),0_30px_70px_-48px_rgba(31,86,220,0.35)]",
        active &&
          "border-primary/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(31,86,220,0.2),0_30px_70px_-42px_rgba(31,86,220,0.45)]",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle at 10% -20%, rgba(31,86,220,0.10), transparent 55%), radial-gradient(circle at 100% 120%, rgba(122,160,255,0.06), transparent 50%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
