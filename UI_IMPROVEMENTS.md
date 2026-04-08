Overall Assessment
The app serves a very specific, technical purpose — calculating optimal temporary disability periods — likely for medical or HR professionals. However, the current design feels unfinished, lacks visual hierarchy polish, and misses several UX fundamentals that would make it both more trustworthy and easier to use.

1. Visual Design & Branding
Icon / Avatar (Critical issue)
The large green doctor avatar sitting halfway between the header and the form card is decorative dead weight. It overlaps the card edge awkwardly, creates visual noise, and doesn't communicate anything useful. This "floating avatar" pattern is common in outdated dashboard templates. It breaks the layout flow and wastes vertical space. Consider replacing it with a compact icon inside the card header, or removing it altogether and letting the content breathe.
Color palette
The combination of a very light blue-gray background (#e8f0f5-ish), the bright green of the icon (#00c853), and the vibrant sky blue button (#29b6f6) are three competing accent colors with no clear hierarchy. The green is especially jarring since it only appears in the icon and nowhere else in the UI. Pick one primary accent color and use it consistently.
Typography
The title uses a good weight, but the subtitle ("Cálculo del tiempo óptimo… 4ª Edición 2018") is rendered at nearly the same font size and weight as body text. There's very little typographic contrast between the page title (H1), subtitle (H2), form labels, and placeholder text. A clear type scale with at least 3 levels of visual weight would dramatically improve readability.
The "2018" date is prominent and damaging to trust
Displaying the edition year (2018) as part of the subtitle signals to users that the data may be 6+ years old with no updates. For a medical/legal tool, this can seriously undermine credibility. Either omit it, move it to a footnote/tooltip, or pair it with a "last validated" date.

2. Layout & Spacing
Excessive whitespace in the card
The white form card has very generous top padding dedicated entirely to holding the avatar overlap. This creates a big dead zone at the top of the form before the first field. Move the first label-input pair closer to the card top.
Inconsistent field widths and types
"Tipo de enfermedad" and "Grupo de ocupación" use styled custom dropdowns (full width, with a visible arrow). But "Rango de edad" and "Género" appear side by side in plain, unstyled <input> boxes — they look completely different from the custom selects. Since these fields also have limited options (as confirmed by the DOM, just age ranges and "hombre/mujer"), they should be styled identically to the other dropdowns for visual consistency.
Two-column layout for age/gender is unmotivated
Splitting "Rango de edad" and "Género" into a two-column row on desktop feels inconsistent with the single-column layout above and below. These short selects would work better as a single-column row, keeping the form scannable top-to-bottom without the eye jumping laterally.
The button is undersized and off-center (optically)
The "Calcular" button is centered but narrower than the fields above it. It should stretch to match the form width or at minimum be wider. A primary CTA button this narrow on a wide form looks like an afterthought.

3. UX & Form Design
Missing form validation feedback
There is no visible hint of what happens if you submit with empty required fields. No inline validation states, no error colors, no helper text — nothing. Users hitting "Calcular" with empty fields would have no idea what went wrong.
Asterisk (*) usage without a legend
Fields marked with * (required) have no legend explaining the asterisk. This is a basic accessibility and usability rule: always include a note like "* Required fields" near the form.
Label "Enfermedade" is a typo
The label reads "Enfermedade adicional" — it should be "Enfermedad adicional." A spelling error on a medical tool is a serious credibility issue.
"Género" has only two options (hombre/mujer)
The binary gender options ("hombre" / "mujer") are exclusionary and may not accurately represent the population using disability tools. At minimum, consider adding a third option (e.g., "no especificado"). This also raises accessibility and legal considerations in some jurisdictions.
No contextual help or tooltips
Fields like "Tipo de enfermedad" and "Grupo de ocupación" are vague without definitions. A user who doesn't know which occupational group they fall into has no way to get help. Adding a small ⓘ icon next to labels with a tooltip or sidebar explanation would greatly improve usability for non-expert users.
No results area
There's no indication of where the results will appear after clicking "Calcular." Will it replace the form? Open a modal? Show below? This creates uncertainty. A preview section or a clear result area below the button would set better expectations.

4. Footer & Navigation
Footer links are barely visible
The three footer links ("Más información", "Manual de Tiempos Óptimos...", "Ayuda?") are rendered in very small, low-contrast gray text. They're functionally important (especially for a compliance tool) but visually invisible. These should be more prominent.
"Ayuda?" link goes to seg-social.es homepage
The "Ayuda?" link points to the general Social Security website, not a help page specific to this tool. This is a UX failure — users expecting help will land on a completely irrelevant page.
No branding or institutional identity
There's no logo, no institution name, no copyright notice, no "this is an official tool" badge. For a government-adjacent medical tool, this is a major trust gap.

5. Accessibility
Poor contrast on placeholder text
The "Select..." placeholder text inside the dropdowns is light gray on white — likely below the WCAG AA minimum contrast ratio of 4.5:1.
No focus styles visible
Tab navigation focus indicators don't appear to be customized. Custom dropdowns often lose native focus rings, which is a keyboard and screen-reader accessibility failure.
Form not associated with ARIA labels
The custom dropdown components (non-native selects) need proper aria-label and role attributes to be accessible to screen reader users.
No language declaration apparent
The page is in Spanish but may be missing a lang="es" HTML attribute, which affects screen readers and SEO.

Summary Priority List
PriorityIssue🔴 CriticalTypo in "Enfermedade adicional"🔴 Critical"Ayuda?" links to wrong page🔴 CriticalNo form validation or error states🟠 HighInconsistent field styling (custom vs. native selects)🟠 HighAvatar icon placement and visual clash🟠 HighOutdated "2018" edition date visible🟡 MediumNo asterisk legend / missing required field explanation🟡 MediumBinary gender options🟡 MediumButton width and CTA sizing🟢 LowPlaceholder contrast / accessibility improvements🟢 LowAdd institutional branding and trust signals

Overall, the app needs a usability audit, a consistency pass on form components, copy editing, and a trust/credibility layer — especially given its medical and legal context. The bones are solid (clean card layout, simple form), but the details undermine confidence in the tool.

## Visual Design & Layout (this session)
- [x] Remove floating avatar, replace with inline card header icon — `Home.jsx`, `App.scss`
- [x] Consolidate color palette to single accent (#29b6f6) — `App.scss`
- [x] Improve typography scale (H1 dominant, subtitle subordinate) — `App.scss`
- [x] Reduce excessive top padding in form card — `App.scss`
- [x] Convert two-column age/gender layout to single column — `Home.jsx`
- [x] Add persistent result area with placeholder text — `Home.jsx`, `App.scss`
- [x] Add ⓘ tooltips on complex field labels — `Home.jsx`, `App.scss`
- [x] Add footer branding and copyright note — `_Footer.jsx`, `App.scss`
- [x] Improve Select placeholder text contrast (WCAG AA) — `App.scss`
