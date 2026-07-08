# Contributing

This site is a Next.js app where **content lives in markdown** and **images/PDFs live in `public/`**.

## Content layout

```
content/
  library/{vi,en}/     # Memorial poems, essays, places (one .md per page)
  scholarships/        # One file per year (2020.md, 2025.md, …)
  news/{vi,en}/        # News articles by year
  home/{vi,en}/        # Home page mission statement
  hue-recipients/      # Hue scholarship recipient lists
  pages/{vi,en}/       # Static page copy (resources intro, etc.)
  navigation/          # Sidebar navigation for the library
  data/                # Structured data (gallery, recipients, summaries)
public/
  images/              # All site images
  pdf/                 # PDF documents
```

## Adding or editing a library page

Create or edit a file like `content/library/vi/my-poem.md`:

```markdown
---
title: "My Poem Title"
section: "I"
variant: poetry
---

First line of the poem.

Second line of the poem.
```

**Frontmatter fields:**
- `title` — page heading
- `section` — navigation group (`I` poetry, `II` collections, `III` essays, `IV` places)
- `variant` — `poetry` (centered), `default`, `places`, or `pdf`
- `pdf` — if set, the page shows an embedded PDF instead of markdown body

Add a link in `content/navigation/library.json` so it appears in the sidebar.

## Adding a scholarship year

Create `content/scholarships/2026.md`:

```markdown
---
year: 2026
title: "Học Bổng Quách Thị Trang 2026"
images:
  - "/images/2026-1.jpg"
pdfs:
  - label: "Danh sách học sinh"
    href: "/pdf/Recipients2026.pdf"
recipientsTable: false
---

Write the ceremony description here in markdown.
```

Add teaser copy in `content/data/scholarship-summaries.json` and gallery images in `content/data/gallery.json`.

## Images

Place files in `public/images/` and reference them as `/images/filename.jpg` in markdown or frontmatter.

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Legacy migration

If you need to re-import from the old HTML site, the one-time script is:

```bash
pnpm migrate
```

This requires the sibling `Original-QuachThiTrangCharity` folder for Hue recipient pages.
