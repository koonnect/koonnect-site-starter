import { createHash } from "node:crypto";

export type ContentTargetKind = "text" | "lines" | "image" | "link" | "toggle";

export type ContentTarget = {
  id: string;
  kind: ContentTargetKind;
  label: string;
  section: string;
  locale: string;
  file: string;
  path: string;
  current: unknown;
  fileSha: string;
};

type TargetSeed = Omit<ContentTarget, "current" | "fileSha">;

function hashFile(input: string) {
  return createHash("sha1").update(input).digest("hex");
}

function readPath(source: unknown, path: string) {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc == null) return undefined;
    if (Array.isArray(acc)) return acc[Number(part)];
    if (typeof acc === "object") return (acc as Record<string, unknown>)[part];
    return undefined;
  }, source);
}

export function hydrateTargets(
  seeds: TargetSeed[],
  files: Record<string, { raw: string; json: unknown }>,
): ContentTarget[] {
  return seeds
    .map((seed) => {
      const file = files[seed.file];
      if (!file) return null;
      return {
        ...seed,
        current: readPath(file.json, seed.path),
        fileSha: hashFile(file.raw),
      };
    })
    .filter(Boolean) as ContentTarget[];
}

type LocaleCode = "pt" | "en";

const LOCALES: LocaleCode[] = ["pt", "en"];

const SITE_PAGES: Array<{ key: "home" | "about" | "pricing" | "contact"; label: string }> = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "pricing", label: "Pricing" },
  { key: "contact", label: "Contact" },
];

function siteHeroSeeds(): TargetSeed[] {
  const seeds: TargetSeed[] = [];
  for (const locale of LOCALES) {
    for (const page of SITE_PAGES) {
      const file = `src/content/site/${locale}-${page.key}.json`;
      seeds.push(
        {
          id: `site.${page.key}.hero.eyebrow`,
          kind: "text",
          label: `${page.label} hero eyebrow`,
          section: "hero-split",
          locale,
          file,
          path: "hero.eyebrow",
        },
        {
          id: `site.${page.key}.hero.title`,
          kind: "lines",
          label: `${page.label} hero title`,
          section: "hero-split",
          locale,
          file,
          path: "hero.title",
        },
        {
          id: `site.${page.key}.hero.description`,
          kind: "text",
          label: `${page.label} hero description`,
          section: "hero-split",
          locale,
          file,
          path: "hero.description",
        },
        {
          id: `site.${page.key}.hero.primaryCta`,
          kind: "link",
          label: `${page.label} hero CTA`,
          section: "hero-split",
          locale,
          file,
          path: "hero.primaryCta",
        },
      );
    }
  }
  return seeds;
}

function qualityPageSeeds(): TargetSeed[] {
  const seeds: TargetSeed[] = [];
  for (const locale of LOCALES) {
    const file = `src/content/pages/${locale}-quality.json`;
    seeds.push(
      {
        id: `pages.quality.hero.eyebrow`,
        kind: "text",
        label: "Quality hero eyebrow",
        section: "hero-split",
        locale,
        file,
        path: "hero.eyebrow",
      },
      {
        id: `pages.quality.hero.title`,
        kind: "lines",
        label: "Quality hero title",
        section: "hero-split",
        locale,
        file,
        path: "hero.title",
      },
      {
        id: `pages.quality.featureGrid.title`,
        kind: "lines",
        label: "Quality feature grid title",
        section: "feature-grid",
        locale,
        file,
        path: "sections.0.title",
      },
      {
        id: `pages.quality.featureGrid.description`,
        kind: "text",
        label: "Quality feature grid description",
        section: "feature-grid",
        locale,
        file,
        path: "sections.0.description",
      },
      {
        id: `pages.quality.timeline.title`,
        kind: "lines",
        label: "Quality timeline title",
        section: "timeline",
        locale,
        file,
        path: "sections.1.title",
      },
      {
        id: `pages.quality.faq.title`,
        kind: "lines",
        label: "Quality FAQ title",
        section: "faq",
        locale,
        file,
        path: "sections.2.title",
      },
      {
        id: `pages.quality.ctaBanner.title`,
        kind: "lines",
        label: "Quality CTA banner title",
        section: "cta-banner",
        locale,
        file,
        path: "ctaBanner.title",
      },
    );
  }
  return seeds;
}

function legalPageSeeds(): TargetSeed[] {
  const seeds: TargetSeed[] = [];
  for (const locale of LOCALES) {
    const file = `src/content/pages/${locale}-legal.json`;
    seeds.push(
      {
        id: `pages.legal.hero.title`,
        kind: "lines",
        label: "Legal hero title",
        section: "hero-split",
        locale,
        file,
        path: "hero.title",
      },
      {
        id: `pages.legal.body.title`,
        kind: "lines",
        label: "Legal body title",
        section: "legal-body",
        locale,
        file,
        path: "sections.0.title",
      },
      {
        id: `pages.legal.logoStrip.title`,
        kind: "text",
        label: "Legal logo strip title",
        section: "logo-strip",
        locale,
        file,
        path: "sections.1.title",
      },
      {
        id: `pages.legal.contact.title`,
        kind: "lines",
        label: "Legal contact panel title",
        section: "contact-panel",
        locale,
        file,
        path: "sections.2.title",
      },
      {
        id: `pages.legal.contact.primaryCta`,
        kind: "link",
        label: "Legal contact CTA",
        section: "contact-panel",
        locale,
        file,
        path: "sections.2.primaryCta",
      },
    );
  }
  return seeds;
}

function settingsSeeds(): TargetSeed[] {
  const seeds: TargetSeed[] = [];
  for (const locale of LOCALES) {
    const file = `src/content/settings/menus-${locale}.json`;
    seeds.push(
      {
        id: `settings.menus.nav.demoCta`,
        kind: "link",
        label: "Navbar demo CTA",
        section: "header",
        locale,
        file,
        path: "nav.demoCta",
      },
      {
        id: `settings.menus.nav.directLinks.1.enabled`,
        kind: "toggle",
        label: "Pricing menu enabled",
        section: "header",
        locale,
        file,
        path: "nav.directLinks.1.enabled",
      },
      {
        id: `settings.menus.footer.demoCta`,
        kind: "link",
        label: "Footer demo CTA",
        section: "footer",
        locale,
        file,
        path: "footer.demoCta",
      },
      {
        id: `settings.menus.footer.copyright`,
        kind: "text",
        label: "Footer copyright",
        section: "footer",
        locale,
        file,
        path: "footer.copyright",
      },
    );
  }
  return seeds;
}

export function getStarterTargetSeeds(): TargetSeed[] {
  return [
    ...siteHeroSeeds(),
    ...qualityPageSeeds(),
    ...legalPageSeeds(),
    ...settingsSeeds(),
  ];
}
