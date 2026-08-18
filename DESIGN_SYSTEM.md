# RentNHost Design System

Inspired by RentalX / Rent-A-Car comps. Light mode only for marketing surfaces.

---

## Color palette

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#F3F5F7` | Page wash |
| `--surface` | `#FFFFFF` | Cards, nav scrolled, forms |
| `--ink` | `#0B1F3A` | Headlines / body text (theme-aware) |
| `--muted` | `#5C6B7A` | Body, labels |
| `--accent` | `#FF5C1A` | Energy: hero panel, Search, Rent now |
| `--accent-soft` | `#FFE6D9` | Soft chips / icon washes |
| `--navy` | `#0B1F3A` | **Fixed** primary button / footer / host band bg |
| `--on-navy` | `#FFFFFF` | **Fixed** text on navy (always white) |
| `--accent-text` | `#FFFFFF` | **Fixed** text on orange buttons |
| `--line` | `#E4E9EF` | Borders, dividers |
| `--success` | `#1F9D55` | Ratings, success |

**Rule:** Never use `--ink` as a button background — in dark mode `--ink` becomes light and washes out labels. Use `--navy` + `--on-navy` for navy CTAs.

---

## Type

- Font: **Outfit**
- Brand / hero H1: 48–56px / bold / tight
- Section H2: 32–40px / bold
- Body: 16–18px / regular / `--muted`
- Eyebrow: 12px / semibold / uppercase / tracking / `--accent` or `--muted`

---

## Landing screens (layout)

```
┌─────────────────────────────────────────────┐
│ Logo     Rent  Host  Cars  Contact   Sign in│  ← ink text, orange active underline
├─────────────────────────────────────────────┤
│  orange bar                                  │
│  Looking to save more…     ┌──────────────┐ │
│  short support line        │ ORANGE PANEL │ │
│  [Find car] [Host car]     │   car image  │ │
│                            └──────────────┘ │
│     ┌──── floating SEARCH BAR (white) ────┐ │  ← overlaps hero
│     │ Location │ Dates │ [Search orange]  │ │
│     └─────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ How it works — 3 equal steps (no heavy cards)│
├─────────────────────────────────────────────┤
│ Collection — tabs + 3-col car grid           │
├─────────────────────────────────────────────┤
│ Why RentNHost — 3 trust points               │
├─────────────────────────────────────────────┤
│ Host CTA band (ink bg + orange button)       │
├─────────────────────────────────────────────┤
│ Footer                                       │
└─────────────────────────────────────────────┘
```

### Hero budget (strict)
Only: brand signal / headline / one support line / CTA pair / car on orange panel / search bar.  
No badges, stats, chips, or app-store clutter.

### Radii
- Search / cards: 16px  
- Buttons: 10px  
- Category pills: full  

### Motion
1. Hero text + car enter once  
2. Search bar slight lift on hover  
3. Cards lift on hover  

---

## Other screens (same tokens)

| Screen | Layout |
|--------|--------|
| Browse | Sidebar filters + grid of car cards |
| Booking | Image/summary left, date form sticky right |
| Host | 3-step form wizard on surface card |
| Dashboard | Sidebar + content panels |
