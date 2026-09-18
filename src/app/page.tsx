import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Benefits />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 sm:px-8">
      <span className="text-lg font-semibold tracking-tight">ONEID</span>
      <span className="text-sm text-muted">Digital identity</span>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-14 px-6 pb-24 pt-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:pt-16">
      <div>
        <h1 className="text-[2.75rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Everything you.
          <br />
          <span className="text-accent">One scan.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Your socials, contact and links — all in one beautiful digital
          card.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/create"
            className="rounded-pill bg-accent px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Create my card
          </Link>

          <Link
            href="/edit"
            className="rounded-pill border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Edit my card
          </Link>
        </div>
      </div>
      <CardStackVisual />
    </section>
  );
}

/**
 * Signature visual: the QR card, with the profile it unlocks peeking out
 * from behind it — a still image of the product's one real idea (scan
 * reveals identity) rather than a generic hero illustration.
 */
function CardStackVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-[280px] sm:h-[420px] sm:w-[310px]">
      {/* Profile card, offset behind */}
      <div className="absolute right-0 top-6 h-[360px] w-[240px] -rotate-3 rounded-card border border-line bg-surface p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:h-[400px] sm:w-[260px]">
        <div className="mx-auto h-16 w-16 rounded-full bg-card" />
        <p className="mt-4 text-center text-sm font-semibold">Aiden Cole</p>
        <p className="text-center text-xs text-muted">@aidencole</p>
        <div className="mt-6 space-y-2">
          <ProfileLinkRow label="Instagram" />
          <ProfileLinkRow label="YouTube" />
          <ProfileLinkRow label="WhatsApp" />
        </div>
      </div>

      {/* QR card, in front */}
      <div className="absolute left-0 bottom-0 flex h-[300px] w-[220px] rotate-3 flex-col items-center justify-between rounded-card border border-line bg-card px-6 py-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] sm:h-[320px] sm:w-[235px]">
        <span className="text-sm font-semibold tracking-tight">ONEID</span>
        <QrGlyph />
        <span className="text-xs text-muted">Scan to connect</span>
      </div>
    </div>
  );
}

function ProfileLinkRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-card/60 px-3 py-2 text-xs text-ink/80">
      <span>{label}</span>
      <span className="text-muted">→</span>
    </div>
  );
}

/** A quiet, non-functional QR glyph used purely as a visual placeholder. */
function QrGlyph() {
  const cells = [
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1,
    0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1,
    1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
  ];
  return (
    <div className="grid grid-cols-8 gap-[3px] rounded-lg bg-ink p-3">
      {cells.map((filled, i) => (
        <span
          key={i}
          className={`h-[6px] w-[6px] rounded-[1px] ${
            filled ? "bg-bg" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Add your profiles",
    body: "Instagram, YouTube, WhatsApp, and more — only what you choose.",
  },
  {
    number: "02",
    title: "Choose what you share",
    body: "Leave out anything you don't want on your card. Nothing shows by default.",
  },
  {
    number: "03",
    title: "Get one QR",
    body: "Share it anywhere. Anyone can scan it — no app, no account.",
  },
];

function HowItWorks() {
  return (
    <section className="border-t border-line bg-surface/40">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-sm text-accent">{step.number}</span>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    title: "No app to install",
    body: "Anyone who scans your card opens it straight in their phone's browser.",
  },
  {
    title: "You choose what shows",
    body: "Leave out any platform or number. Nothing appears unless you add it.",
  },
  {
    title: "One link, everywhere",
    body: "Print it, post it, or drop it in a bio — the same card, always current.",
  },
];

function Benefits() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {benefits.map((benefit) => (
          <div key={benefit.title}>
            <h3 className="text-lg font-medium">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {benefit.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Ready to make yours?
      </h2>
      <Link
        href="/create"
        className="mt-8 inline-block rounded-pill bg-accent px-7 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        Create my card
      </Link>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 py-10 text-sm text-muted sm:px-8">
      ONEID
    </footer>
  );
}
