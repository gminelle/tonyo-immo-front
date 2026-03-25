# AGENTS.md

## Purpose
This file stores persistent project-specific implementation and formatting directives. Any new formatting or code-structure rule given by the user must be added here immediately after it is understood and before the related work is considered complete.

## Persistent User Directives

### SCSS and Design Tokens
- SCSS must use a strict BEM structure.
- A block must use the form `.block`, an element `.block__element`, and a modifier `.block--modifier` or `.block__element--modifier`.
- BEM SCSS must be written with nested selectors for readability, for example `.block { &__element {} &--modifier {} }`, instead of declaring flat selectors separately.
- SCSS module class names must stay BEM even when consumed through camelCase exports in TypeScript.
- Non-obvious style values must be tokenized in shared SCSS variables instead of being written inline.
- This includes colors, borders, radii, shadows, z-indexes, font sizes, line heights, gaps, paddings, margins, widths, heights, breakpoints, animation timings, and similar visual constants.
- Any style value using `1` or `0` in a non-trivial design context must be reviewed and tokenized when it represents a design decision rather than an obvious CSS reset.
- Shared design tokens must be placed in the SCSS variables layer so styles remain homogeneous across the application.
- Do not create a shared variables file dedicated to one or a few components; use the existing generic variables layer for shared tokens.
- Component-specific SCSS variables must be declared at the top of the component stylesheet.
- Prefer existing spacing variables over declaring new `px` or `rem` values; direct `px` or `rem` declarations are reserved for genuinely specific cases such as mobile breakpoints or element-specific max sizes.
- Buttons, selectors, and dropdown triggers must use harmonized heights and border radii unless a documented exception is required.
- All user-facing texts, labels, placeholders, helper texts, aria labels, and menu labels in the application must come from the translation system. No hardcoded UI copy is allowed.

### Process
- When the user gives a new rule about code format, architecture, naming, styling, or file organization, add it to this file in the same task.
- Before creating or editing SCSS, check whether an existing shared token already covers the needed value.
- If no token exists, create a named token first, then use it in the component stylesheet.
- All produced code must be typed appropriately and must respect the project's lint rules.

## Current Recorded Rules
- 2026-03-25: Enforce strict BEM naming in SCSS.
- 2026-03-25: Write BEM SCSS using nested selectors inside the block declaration for readability.
- 2026-03-25: Tokenize non-obvious style values and design constants in shared SCSS variables.
- 2026-03-25: Use generic shared SCSS variables instead of a component-dedicated variables file.
- 2026-03-25: Declare component-specific SCSS variables at the top of the component stylesheet.
- 2026-03-25: Prefer spacing tokens over new `px` or `rem` declarations except for truly specific cases.
- 2026-03-25: Harmonize heights and border radii across buttons, selectors, and dropdown triggers.
- 2026-03-25: Use translations for every user-facing text, label, placeholder, helper text, and aria/menu label.
- 2026-03-25: Ensure all produced code is properly typed and respects the project's lint rules.
- 2026-03-25: Record every new user formatting rule in this file as part of the same task.
