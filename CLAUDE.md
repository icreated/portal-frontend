# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Node version

**Requires Node 22.12+ or 24** (Angular 21's `@angular/compiler-cli` is ESM-only). Use `.nvmrc`:
```bash
nvm use   # picks up Node 24 from .nvmrc
```

## Commands

```bash
npm install          # install dependencies
ng serve             # dev server at http://localhost:4200
ng build             # development build
ng build --configuration production  # production build
ng test              # run Karma/Jasmine tests (all specs)
ng lint              # ESLint check
npm run ng-openapi-gen  # regenerate src/app/api/ from openapi.yaml
```

To run a single spec file:
```bash
ng test --include='**/invoices.component.spec.ts'
```

## Architecture

**Angular 21** SPA backed by a REST API (default: `http://localhost:8080/portal/api`). Backend pairing: [portal-api](https://github.com/icreated/portal-api). Dev login: `gardenusr / GardenUser`.

### Module layout

```
src/app/
  api/          # auto-generated from openapi.yaml via ng-openapi-gen — do not hand-edit
  core/
    guards/     # AuthGuard (JWT-based route protection)
    interceptors/  # JwtInterceptor (attaches Bearer token), ErrorInterceptor (401 → logout)
    models/     # app-internal models (not API DTOs)
    pipes/      # doc-status-value, tender-type
    services/   # authentication (localStorage), session (sessionStorage), toast, theme, loader, route-state
  features/     # lazy-loaded route modules: login, forgot-password, update-password, dashboard, invoices, payments, settings
  shared/
    components/ # reusable form controls (InputComponent, PasswordComponent)
    layout/     # LayoutComponent (authenticated shell), Header, Footer, DockerSidebar, HeaderBreadcrumb
    error/      # ErrorComponent
```

### Key conventions

- **API client**: `src/app/api/` is fully generated. To add/modify an endpoint, edit `openapi.yaml` then run `npm run ng-openapi-gen`. Import from `src/app/api/services` and `src/app/api/models`.
- **Auth**: JWT token is kept in `localStorage` under `currentUser`. `AuthenticationService` exposes `currentUser$` (Observable) and `currentUserValue` (sync). `JwtInterceptor` attaches the token to every request matching `environment.apiUrl`.
- **Shared module**: `AppCommonModule` re-exports PrimeNG, ReactiveFormsModule, CommonModule, TranslateModule, and the two shared form components. Feature modules import `AppCommonModule` instead of individual pieces.
- **i18n**: `@ngx-translate` with JSON translation files loaded via `TranslateHttpLoader`. Language codes mapped to locale strings in `environment.langMap`.
- **Forms**: `@rxweb/reactive-form-validators` is used alongside Angular's built-in validators.
- **API URL**: change `environment.apiUrl` in `src/environments/environment.ts` to point at a different backend (e.g. the json-server mock at port 3000).
- **Templates**: use Angular 21 built-in control flow (`@for`, `@if`, `@switch`) — not the legacy `*ngFor`/`*ngIf` directives.

### PrimeNG 21 notes

- Theme: `providePrimeNG({ theme: { preset: Aura } })` in `AppModule`. Preset imported from `@primeuix/themes/aura` (not `@primeng/themes`).
- No static CSS in `angular.json` styles — PrimeNG styles are injected at runtime by the theme engine.
- Component renames from older PrimeNG: `OverlayPanel→Popover`, `Calendar→DatePicker`, `Sidebar→Drawer`, `Dropdown→Select`, `InputTextarea→Textarea`.
- `ora` is pinned to v5 via `"overrides": { "ora": "5" }` in `package.json` to keep `@angular-devkit/build-angular` spinner working under Node 24 (ora v8+ is ESM-only and incompatible with the CJS spinner wrapper).
