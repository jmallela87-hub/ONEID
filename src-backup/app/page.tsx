import Link from "next/link";
import { PlayingCard } from "@/components/card/PlayingCard";
import { SuitSymbol } from "@/components/card/SuitSymbol";
import { SUITS } from "@/lib/cardStyle";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-7 sm:px-8">
        <span className="font-serif text-xl font-bold tracking-tight">ONEID</span>
        <Link href="/edit" className="text-sm text-muted transition-colors hover:text-ink">
          Edit my card
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-5xl gap-14 px-6 pb-20 pt-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-14">
          <div>
            <p className="flex gap-3 text-lg">
              {SUITS.map((s) => (
                <SuitSymbol key={s} suit={s} className={s === "♥" || s === "♦" ? "text-accent" : "text-ink/70"} />
              ))}
            </p>
            <h1 className="mt-5 font-serif text-[2.9rem] font-bold leading-[1.04] tracking-tight sm:text-6xl">
              Everything you.
              <br />
              <span className="text-accent">One scan.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Your socials, contact and links — all in one beautiful digital card.
            </p>
            <Link
              href="/create"
              className="mt-9 inline-block rounded-pill bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Create my card
            </Link>
          </div>
          <CardStack />
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-8">
            <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {STEPS.map((step, i) => (
                <li key={step.n} className="border-t border-line pt-5">
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <SuitSymbol suit={SUITS[i]} className={i === 1 ? "text-accent" : "text-ink"} />
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-semibold">{step.title}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-5xl items-center gap-3 px-6 py-10 text-sm text-muted sm:px-8">
        <span className="font-serif font-semibold text-ink">ONEID</span>
        <span className="tracking-widest" aria-hidden="true">♠&#xFE0E; ♥&#xFE0E; ♦&#xFE0E; ♣&#xFE0E;</span>
      </footer>
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Add your profiles" },
  { n: "02", title: "Choose what you share" },
  { n: "03", title: "Get one QR" },
];

/** Decorative fan of three cards; the front one carries a static QR motif. */
function CardStack() {
  return (
    <div className="relative mx-auto h-[400px] w-[300px] sm:h-[440px] sm:w-[330px]" aria-hidden="true">
      <PlayingCard seed="deck-back" className="absolute left-0 top-6 h-[340px] w-[230px] -rotate-[9deg] sm:h-[380px] sm:w-[250px]" />
      <PlayingCard seed="queen-of-hearts" className="absolute right-0 top-3 h-[340px] w-[230px] rotate-[7deg] sm:h-[380px] sm:w-[250px]" />
      <PlayingCard seed="aidencole" className="absolute left-[34px] top-10 h-[350px] w-[235px] sm:left-[40px] sm:h-[390px] sm:w-[255px]">
        <div className="flex flex-col items-center pt-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] opacity-60">ONEID</p>
          <QrMotif />
          <p className="mt-4 font-serif text-lg font-bold">Aiden Cole</p>
          <p className="text-xs opacity-60">@aidencole</p>
        </div>
      </PlayingCard>
    </div>
  );
}

function QrMotif() {
  const cells = "1110111010110111010110011010001011111011101010101001101111101110";
  return (
    <div className="mt-5 grid grid-cols-8 gap-[3px] rounded-lg bg-white p-3">
      {cells.split("").map((c, i) => (
        <span key={i} className={`h-[7px] w-[7px] rounded-[1px] ${c === "1" ? "bg-[#111]" : "bg-transparent"}`} />
      ))}
    </div>
  );
}
