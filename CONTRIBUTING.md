# Contributing

Thanks for helping improve the portfolio project.

## Run it locally

1. Fork the repository.
2. Clone your fork or open it in a GitHub Codespace.
3. Install dependencies with `pnpm install`.
4. Start the development server with `pnpm dev`.
5. Use the ignored `local-config/` folder for development-only configuration. It overrides `public/config/` while `NODE_ENV=development` is active.

The project uses Node.js `26.13.0` and pnpm `12.18.0`. See `package.json` for the supported versions and available scripts.

## Make a contribution

1. Create a focused change in your fork.
2. Run `pnpm lint` and, when relevant, `pnpm build`.
3. Push your branch to your fork.
4. Open a pull request against `nightmaregaurav/portfolio`.

## Contribution rules

- Read [AGENTS.md](AGENTS.md) before changing code.
- Keep changes focused and follow existing patterns.
- Do not commit secrets, generated build output, or `local-config/`.
- Preserve the project's personal-use, attribution, and non-commercial license requirements.
- Update relevant documentation when behavior or setup changes.
- Keep configuration migrations backward-compatible. When changing a configuration shape, update the migration manager and add the required transition.
- Use clear commit messages and describe user-visible changes in pull requests.

## Templates

The portfolio uses a template system to separate page styling and content from configuration and routing. Content pages and their styles are loaded from `templates/` based on the `template` value in the core configuration. Every template uses the shared `SiteShell`; a template can style the shared sidebar, controls, and page frame without replacing their structure.

### How it works

1. The `template` field in `configuration/core.ts` stores the active template name (default: `"default"`).
2. Each content page in `app/(app)/` uses `next/dynamic` with string interpolation to import its template-specific component:
   ```ts
   const PageContent = dynamic(
     () => import(`@/templates/${CoreConfig.template}/about/page.content`),
     {ssr: true}
   );
   ```
3. The template folder mirrors the content route structure. Each route requires a `page.content.tsx` entry and can use `page.module.css` for its styles.
4. `home/page.content.tsx` is optional. When it is absent, `/` renders the built-in homepage.
5. `theme.tsx` is optional and independent of the custom homepage. The public layout renders it on every public route when present. Setup pages are outside the public shell.

### Sidebar and floating controls

The app owns sidebar state, structure, route visibility, active links, mobile drawer behavior, attribution, back-to-top behavior, and control placement. Templates style the shared `SiteShell`; they do not add another sidebar provider or reposition the built-in controls.

- Let the shared frame reserve desktop sidebar space; size page content against its container rather than `100vw` or a hardcoded sidebar offset.
- Style navigation and controls through the shared shell's `[data-slot]` attributes and `[aria-current="page"]` hook.

### Optional template theme

Place shared shell styling in `templates/<template-name>/theme.css`. Add a `theme.tsx` entry beside it:

```tsx
import "./theme.css";

export default function Theme() {
  return null;
}
```

The public layout dynamically loads the JavaScript component; the component statically imports the CSS. Do not dynamically import `theme.css` directly: Turbopack cannot place CSS assets in JavaScript chunks. Individual content pages do not need to import the shared theme.

Scope theme rules to the matching `data-template` value. For a template named `minimol`:

```css
body:has([data-template="minimol"]) {
  /* Template colors, typography, and shared shell styles. */
}
```

Use your own template name in this selector. A selector such as `body:has([data-template])` matches every public template and does not isolate its styles.

### Optional custom homepage

Add `home/page.content.tsx` to replace the built-in homepage. Its default export takes no props; use a Server Component to import the configuration it needs from `@/configuration`, and render Client Components for interactive children. Each template owns its homepage's data dependencies.

Honor enabled menus when showing links or sections. Metadata and the fallback for templates without a homepage remain in the app route. Theme loading works with either a custom homepage or the built-in fallback.

### Available template pages

The following routes have template content pages:

- `home/page.content.tsx` (optional; used for `/`)
- `about/page.content.tsx`
- `blogs/page.content.tsx`
- `blogs/[blogSlug]/page.content.tsx`
- `gallery/page.content.tsx`
- `gallery/[collectionSlug]/page.content.tsx`
- `journey/page.content.tsx`
- `projects/page.content.tsx`
- `projects/[projectSlug]/page.content.tsx`
- `services/page.content.tsx`
- `skills/page.content.tsx`
- `testimonials/page.content.tsx`

### Adding a new template

1. Create a new folder inside `templates/` using a lowercase, hyphenated name (e.g., `templates/minimal/`).
2. Copy the `templates/default/` folder structure into your new template folder as a starting point.
3. Customize the content components and styles. For unchanged routes, re-export the corresponding default template component while preserving its props.
4. Optionally add `theme.tsx` and `theme.css` as described above, and `home/page.content.tsx` for a custom homepage.
5. Set the `template` value in the core configuration via the Setup page at `/setup/core` (dropdown will automatically list available template folders).

**Important rules:**

- Each template page must export a default component. Use `"use client"` when the component needs client hooks or browser APIs; server entries can load configuration and render interactive Client Components.
- The component interface (props) must match the corresponding app page's dynamic import — check `app/(app)/<route>/page.tsx` for the prop types passed to the template component.
- Routes other than home pass configuration or resolved content through typed props. Check the owning app route for the exact types. Custom homepages take no props and load their own configuration on the server.
- Do not rename or remove `page.content.tsx` files — the dynamic import path is fixed by the app route.
- Keep template content available for server rendering and static generation; do not disable SSR for the page entry.

### Updating an existing template

- All content routes except home require a component in each template. There is no automatic fallback for those routes; re-export a default template component when reusing it.
- When adding a required content route to the app, create the corresponding template page in **all** existing template folders, not just the active one.
- If you change the props passed to a template component from an app page, update the same component across all template folders.
- After changing a template's component interface, verify the build with `pnpm build` to catch type mismatches.
- The Setup page at `/setup/core` reads available templates from the `templates/` directory using `node:fs` — new folders appear automatically in the dropdown.
- Verify desktop sidebar opening and closing, the mobile drawer and focus return, configured navigation and active links, floating controls after scrolling, and `/setup` independence. Test the selected template as well as `default`. Production output is static, so changing the template configuration requires a rebuild; use ignored `local-config/` overrides for local previews.
