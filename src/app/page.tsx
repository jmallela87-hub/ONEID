"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-[#f2eee6]">

      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-[-.04em]"
        >
          ONEID
        </Link>

        <Link
          href="/edit"
          className="font-serif text-sm text-white/50 transition hover:text-white"
        >
          Edit my card
        </Link>
      </header>


      {/* HERO */}
      <section className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-12">

        <span className="absolute left-6 top-20 font-serif text-sm text-white/25 sm:left-10 lg:left-12">
          A ♠
        </span>

        <span className="absolute right-6 top-24 font-serif text-sm text-red-400/60 sm:right-10 lg:right-12">
          K ♥
        </span>

        <span className="absolute bottom-24 left-8 font-serif text-sm text-red-400/50">
          Q ♦
        </span>

        <span className="absolute bottom-20 right-8 font-serif text-sm text-white/25">
          J ♣
        </span>

        <div className="mx-auto w-full max-w-5xl text-center">

          <div className="mb-8 flex justify-center gap-5 font-serif text-lg">
            <span>♠</span>
            <span className="text-red-400">♥</span>
            <span className="text-red-400">♦</span>
            <span>♣</span>
          </div>

          <p className="text-[9px] uppercase tracking-[.5em] text-white/30">
            Your digital identity
          </p>

          <h1 className="mt-7 font-serif text-[4.2rem] font-bold leading-[.86] tracking-[-.065em] sm:text-[6.5rem] lg:text-[8.5rem]">
            Everything you.
            <br />
            <span className="text-red-400">One scan.</span>
          </h1>

          <div className="mx-auto mt-9 flex max-w-xl items-start justify-center gap-4">
            <span className="font-serif text-xs text-white/25">A ♠</span>

            <p className="text-sm leading-7 text-white/45 sm:text-base">
              Your socials, contact and links — all in one beautiful
              digital playing card.
            </p>

            <span className="font-serif text-xs text-red-400/50">♥ K</span>
          </div>

          <Link
            href="/create"
            className="group mt-10 inline-flex items-center gap-4 border-b border-white/30 pb-2 font-serif text-sm transition hover:border-white"
          >
            Create my card
            <span className="text-red-400 transition group-hover:translate-x-1">
              →
            </span>
          </Link>

          <p className="mt-5 text-[8px] uppercase tracking-[.4em] text-white/20">
            No app required
          </p>

        </div>
      </section>


      {/* THE DECK */}
      <section className="border-y border-white/[.08]">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">

          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">

            <div>
              <p className="font-serif text-sm text-red-400">
                ♠ ♥ ♦ ♣
              </p>

              <p className="mt-6 text-[9px] uppercase tracking-[.45em] text-white/30">
                The deck
              </p>

              <h2 className="mt-4 font-serif text-5xl font-bold leading-[.9] tracking-tight sm:text-6xl">
                52 ways
                <br />
                to be <span className="text-red-400">you.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                Four suits. Thirteen ranks. One identity.
                ONEID turns the language of playing cards into
                a digital identity made for you.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-serif text-sm text-white/55">
                <span>♠ Spades</span>
                <span className="text-red-400">♥ Hearts</span>
                <span className="text-red-400">♦ Diamonds</span>
                <span>♣ Clubs</span>
              </div>
            </div>

          </div>


          {/* FOUR CARD DECK */}
          <DeckShowcase />

          <div className="mt-4 text-center">
            <p className="text-[9px] uppercase tracking-[.4em] text-white/20">
              4 suits · 13 ranks · one identity
            </p>
          </div>

        </div>
      </section>


      {/* THE IDEA / QUOTATIONS */}
      <section className="border-b border-white/[.08]">

        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-12">

          <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">

            <div>
              <p className="text-[9px] uppercase tracking-[.45em] text-white/30">
                The idea
              </p>

              <h2 className="mt-5 max-w-sm font-serif text-4xl font-bold leading-[.95] sm:text-5xl">
                Less noise.
                <br />
                <span className="text-red-400">More you.</span>
              </h2>
            </div>

            <div className="space-y-14">

              <Manifesto
                mark="A ♠"
                number="01"
                text="Your identity shouldn't live across five different links."
              />

              <Manifesto
                mark="Q ♥"
                number="02"
                text="One card. Everything you."
                red
              />

              <Manifesto
                mark="K ♦"
                number="03"
                text="The internet knows your username. ONEID gives it a face."
                red
              />

            </div>

          </div>

        </div>
      </section>


      {/* THE SIMPLE PART */}
      <section className="border-b border-white/[.08]">
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-12">

          <div className="mb-16">
            <p className="text-[9px] uppercase tracking-[.45em] text-white/30">
              The simple part
            </p>

            <h2 className="mt-5 font-serif text-5xl font-bold leading-[.9] tracking-tight sm:text-6xl">
              Three moves.
              <br />
              <span className="text-red-400">One card.</span>
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3">

            <InstructionCard
              rank="A"
              suit="♠"
              number="01"
              title="Build your card"
              description="Add your profile, contact details and social links."
              variant="build"
            />

            <InstructionCard
              rank="Q"
              suit="♥"
              number="02"
              title="Choose what you share"
              description="Keep only the information you want people to see."
              variant="choose"
            />

            <InstructionCard
              rank="K"
              suit="♦"
              number="03"
              title="Get one QR"
              description="Share one card instead of sending five different links."
              variant="share"
            />

          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="mx-auto max-w-7xl px-6 py-32 text-center sm:px-10 lg:px-12">

        <div className="flex justify-center gap-5 font-serif text-xl">
          <span>♠</span>
          <span className="text-red-400">♥</span>
          <span className="text-red-400">♦</span>
          <span>♣</span>
        </div>

        <p className="mt-7 text-[9px] uppercase tracking-[.5em] text-white/25">
          ONEID
        </p>

        <h2 className="mt-5 font-serif text-5xl font-bold leading-[.9] tracking-tight sm:text-7xl">
          Your card.
          <br />
          Your identity.
        </h2>

        <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-white/40">
          One profile. One QR. One place for everything people need
          to find you.
        </p>

        <Link
          href="/create"
          className="mt-9 inline-flex font-serif text-sm text-white/70 transition hover:text-white"
        >
          Create your ONEID
          <span className="ml-3 text-red-400">→</span>
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/[.08]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 sm:px-10 lg:px-12">

          <span className="font-serif text-sm font-bold">
            ONEID
          </span>

          <div className="font-serif text-xs text-white/30">
            ♠ &nbsp; <span className="text-red-400">♥</span> &nbsp;
            <span className="text-red-400">♦</span> &nbsp; ♣
          </div>

        </div>

      </footer>

    </main>
  );
}


/* ============================================================
   INTERACTIVE FOUR CARD DECK
   ============================================================ */

function Manifesto({
  mark,
  number,
  text,
  red = false,
}: {
  mark: string;
  number: string;
  text: string;
  red?: boolean;
}) {
  return (
    <div className="group grid grid-cols-[72px_1fr] gap-6 sm:grid-cols-[90px_1fr] sm:gap-10">
      <div className="pt-1">
        <div
          className={[
            "font-serif text-sm transition-transform duration-300 group-hover:-translate-y-1",
            red ? "text-red-400" : "text-white/70",
          ].join(" ")}
        >
          {mark}
        </div>

        <div className="mt-3 h-px w-8 bg-white/10" />

        <p className="mt-3 text-[8px] uppercase tracking-[.3em] text-white/20">
          {number}
        </p>
      </div>

      <p className="max-w-xl font-serif text-2xl font-medium leading-[1.08] tracking-tight text-white/75 sm:text-3xl lg:text-4xl">
        “{text}”
      </p>
    </div>
  );
}


function InstructionCard({
  rank,
  suit,
  number,
  title,
  description,
  variant,
}: {
  rank: string;
  suit: string;
  number: string;
  title: string;
  description: string;
  variant: "build" | "choose" | "share";
}) {
  return (
    <div className="instruction-card-wrap group">

      <div className={`instruction-card instruction-card-${variant}`}>
        <div className="instruction-card-inner">

          <div className="instruction-card-index instruction-card-index-top">
            <strong>{rank}</strong>
            <span>{suit}</span>
          </div>

          <div className="instruction-card-meta">
            <span>ONEID</span>
            <span>STEP / {number}</span>
          </div>

          <div className="instruction-card-ghost">
            {suit}
          </div>

          {variant === "build" && (
            <>
              <div className="instruction-build-frame">
                <div className="instruction-build-avatar">
                  <span>{suit}</span>
                </div>

                <div className="instruction-build-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="instruction-card-copy">
                <span className="instruction-card-kicker">
                  IDENTITY / 01
                </span>

                <h3>
                  Build
                  <br />
                  your card.
                </h3>

                <p>{description}</p>
              </div>
            </>
          )}

          {variant === "choose" && (
            <>
              <div className="instruction-choose-mark">
                ♥
              </div>

              <div className="instruction-choose-copy">
                <span className="instruction-card-kicker">
                  YOUR RULES / 02
                </span>

                <h3>
                  Choose
                  <br />
                  what you share.
                </h3>

                <p>{description}</p>
              </div>

              <div className="instruction-choose-line">
                PRIVATE
                <span />
                PUBLIC
              </div>
            </>
          )}

          {variant === "share" && (
            <>
              <div className="instruction-share-qr">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>

              <div className="instruction-share-copy">
                <span className="instruction-card-kicker">
                  ONE LINK / 03
                </span>

                <h3>
                  One QR.
                  <br />
                  Everywhere.
                </h3>

                <p>{description}</p>
              </div>

              <div className="instruction-share-url">
                ONEID / SHARE
              </div>
            </>
          )}

          <div className="instruction-card-index instruction-card-index-bottom">
            <strong>{rank}</strong>
            <span>{suit}</span>
          </div>

          <div className="instruction-card-side">
            {number} / ONEID
          </div>

        </div>
      </div>

      <div className="instruction-card-caption">
        <div>
          <span>{number}</span>
          <strong>{rank} {suit}</strong>
        </div>

        <p>{description}</p>
      </div>

    </div>
  );
}

function DeckShowcase() {
  const [selected, setSelected] = useState(1);

  const cards = [
    {
      rank: "A",
      suit: "♠",
      label: "BUILD",
      quote: "Everything that makes you, in one place.",
      variant: "light" as const,
    },
    {
      rank: "Q",
      suit: "♥",
      label: "DESIGN",
      quote: "Choose the suit. Choose the rank. Make it yours.",
      variant: "dark" as const,
    },
    {
      rank: "K",
      suit: "♦",
      label: "SHARE",
      quote: "One QR. One profile. Everywhere.",
      variant: "red" as const,
    },
    {
      rank: "J",
      suit: "🃏",
      label: "JOKER",
      quote: "No rules. Just your identity.",
      variant: "joker" as const,
    },
  ];

  return (
    <div className="relative mx-auto mt-20 h-[480px] max-w-5xl sm:h-[540px]">

      <div className="absolute inset-x-0 bottom-0 mx-auto h-px max-w-3xl bg-white/[.06]" />

      {cards.map((card, index) => {
        const isSelected = selected === index;

        const positions = [
          {
            x: "-28%",
            y: "34px",
            rotate: "-10deg",
            scale: "0.92",
          },
          {
            x: "0%",
            y: "0px",
            rotate: "2deg",
            scale: "1",
          },
          {
            x: "28%",
            y: "34px",
            rotate: "10deg",
            scale: "0.92",
          },
          {
            x: "50%",
            y: "88px",
            rotate: "16deg",
            scale: "0.86",
          },
        ];

        const position = positions[index];

        let transform;

        if (isSelected) {
          transform =
            "translate(-50%, -10px) rotate(0deg) scale(1.08)";
        } else {
          const direction = index < selected ? -1 : 1;
          const distance = Math.abs(index - selected);

          transform =
            `translate(calc(-50% + ${direction * (150 + distance * 35)}px), ` +
            `${45 + distance * 18}px) ` +
            `rotate(${direction * (7 + distance * 3)}deg) ` +
            `scale(${0.88 - distance * 0.035})`;
        }

        return (
          <div
            key={`${card.rank}-${index}`}
            className="absolute left-1/2 top-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              zIndex: isSelected ? 50 : 20 - Math.abs(index - selected),
              transform,
              transformOrigin: "center bottom",
            }}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Select ${card.label} card`}
          >
            <StoryCard
              rank={card.rank}
              suit={card.suit}
              label={card.label}
              quote={card.quote}
              variant={card.variant}
              selected={isSelected}
            />
          </div>
        );
      })}

      <div className="absolute bottom-2 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap text-center">
        <p className="text-[8px] uppercase tracking-[.4em] text-white/25">
          Touch a card
        </p>
      </div>
    </div>
  );
}


/* ============================================================
   STORY CARD
   ============================================================ */

function StoryCard({
  className,
  rank,
  suit,
  label,
  quote,
  variant,
  selected = false,
}: {
  className?: string;
  rank: string;
  suit: string;
  label: string;
  quote: string;
  variant: "light" | "dark" | "red" | "joker";
  selected?: boolean;
}) {
  const light = variant === "light";
  const red = variant === "red";
  const joker = variant === "joker";

  return (
    <div
      className={[
        "home-card",
        light ? "home-card-light" : "",
        red ? "home-card-red" : "",
        joker ? "home-card-joker" : "",
        selected ? "home-card-selected" : "",
        className || "",
      ].join(" ")}
    >
      <div className="home-card-inner">

        <div className="home-card-index home-card-index-top">
          <strong>{rank}</strong>
          <span>{suit}</span>
        </div>

        <div className="home-card-meta">
          <span>ONEID</span>
          <span>52 / {label}</span>
        </div>

        <div className="home-card-ghost">
          {suit}
        </div>

        <div className="home-card-content">

          {joker ? (
            <>
              <div className="home-joker-mark">
                <span>J</span>
                <span>O</span>
                <span>K</span>
                <span>E</span>
                <span>R</span>
              </div>

              <div className="home-joker-copy">
                <p>NO RULES</p>
                <h3>Just your identity.</h3>
                <span>ONEID / 00</span>
              </div>
            </>
          ) : (
            <>
              <div className="home-card-label">
                <span>0{rank === "A" ? "1" : rank === "Q" ? "2" : "3"}</span>
                <span>{label}</span>
              </div>

              <div className="home-card-title">
                <span className="home-card-title-mark">
                  {rank}{suit}
                </span>

                <h3>
                  {label === "BUILD"
                    ? "Everything\nthat makes you."
                    : label === "DESIGN"
                      ? "Choose what\nfeels like you."
                      : "One card.\nEverywhere."}
                </h3>
              </div>

              <p className="home-card-quote">
                {quote}
              </p>
            </>
          )}

        </div>

        <div className="home-card-index home-card-index-bottom">
          <strong>{rank}</strong>
          <span>{suit}</span>
        </div>

        <div className="home-card-edge-label">
          ONEID
        </div>

      </div>
    </div>
  );
}

