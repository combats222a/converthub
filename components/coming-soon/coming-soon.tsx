"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Input } from "@/components/ui/input";

export interface ComingSoonFeature {
  /** Уже отрисованная иконка (например <Search className="size-4.5" />). */
  icon: ReactNode;
  /** rgba-фон значка карточки. */
  bg: string;
  /** Цвет иконки/акцента карточки. */
  color: string;
  title: string;
  text: string;
}

export interface ComingSoonProps {
  /** Заголовок страницы (h1), как в Hero. */
  heading: string;
  /** Подзаголовок под h1. */
  description: string;
  /** Уже отрисованная иконка внутри карточки-заглушки. */
  icon: ReactNode;
  /** Заголовок внутри карточки-заглушки. */
  stubTitle: string;
  /** Описание внутри карточки-заглушки. */
  stubDescription: string;
  /** Три карточки "что появится" под заглушкой. */
  features: ComingSoonFeature[];
}

/**
 * Общий шаблон для ещё не реализованных разделов сайта.
 *
 * В оригинале 8 страниц (pricing/history/settings/favorites/privacy/support/
 * api/apps) были побайтово одинаковым HTML-шаблоном с разным текстом и
 * иконками. Здесь это один компонент — карточка-заглушка на базе GlowCard,
 * форма подписки на уведомление и сетка из трёх карточек с ожидаемыми
 * возможностями, — параметризованный текстом/иконками каждой страницы.
 *
 * Иконки передаются уже отрисованными элементами (а не компонентом), потому
 * что каждая страница-обёртка — серверный компонент, а этот — клиентский:
 * через границу RSC можно передать готовый React-элемент, но не голую
 * ссылку на функцию/компонент.
 */
export function ComingSoon({
  heading,
  description,
  icon,
  stubTitle,
  stubDescription,
  features,
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const statusId = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-14 pb-24 text-left sm:px-10">
      <Hero heading={heading} description={description} />

      <GlowCard className="flex flex-col items-center px-6 pt-11 pb-10 text-center sm:px-[30px]">
        <div className="mb-4.5 flex size-14 items-center justify-center rounded-[14px] bg-[rgba(31,86,220,0.14)] text-primary">
          {icon}
        </div>
        <span className="mb-4 inline-block rounded-full bg-[rgba(31,86,220,0.14)] px-2.75 py-1.25 text-[11px] font-bold tracking-wide text-[#8fb0ff] uppercase">
          Скоро появится
        </span>
        <div className="mb-2 text-[19px] font-bold">{stubTitle}</div>
        <p className="max-w-[440px] text-sm leading-[1.6] text-muted-foreground">{stubDescription}</p>

        <form
          onSubmit={handleSubmit}
          className="mt-6.5 flex w-full max-w-[400px] flex-col gap-2 sm:flex-row"
          aria-describedby={submitted ? statusId : undefined}
        >
          <Input
            type="email"
            required
            placeholder="Ваш email"
            value={email}
            disabled={submitted}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Ваш email"
          />
          <Button type="submit" disabled={submitted} className="shrink-0">
            {submitted ? "Готово" : "Уведомить меня"}
          </Button>
        </form>
        {submitted && (
          <p id={statusId} className="mt-3 text-[13px] text-muted-foreground" role="status">
            Спасибо! Мы напишем вам, когда раздел будет готов.
          </p>
        )}
      </GlowCard>

      <hr className="my-11 border-t border-border" />

      <div className="mb-4 text-xs font-bold tracking-wide text-muted-foreground uppercase">Что появится</div>
      <div className="grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[14px] border border-border bg-card p-5 transition-all hover:-translate-y-0.5"
          >
            <div
              className="mb-3.5 flex size-8.5 items-center justify-center rounded-md"
              style={{ background: feature.bg, color: feature.color }}
            >
              {feature.icon}
            </div>
            <h3 className="mb-1.5 text-[14.5px] font-bold">{feature.title}</h3>
            <p className="text-[13px] leading-[1.5] text-muted-foreground">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
