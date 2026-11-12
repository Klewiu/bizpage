# Bizpage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Firebase Hosting serves the static production build from `dist/bizpage/browser`.
Unknown URLs use `public/404.html` as the custom HTTP 404 page; Angular also
handles unknown routes during client-side navigation. Keep both error views
consistent when updating their content. The sitemap and `llms` files should
list only published routes.

## Languages

The site supports Polish, English and German. Polish pages use the existing
unprefixed URLs; English and German pages use `/en` and `/de` respectively.
Each published route is prerendered in all three languages and includes
language-specific canonical and alternate links. The language switcher
navigates to the equivalent localized URL, preserving query and fragment.
Unprefixed URLs always display Polish, so crawlers and visitors see the same
content. Internal links retain the selected language across navigation.

Polish and English translations are in `src/app/i18n/translations.ts`, with
German translations in `src/app/i18n/translations.de.ts`. When adding a key,
provide all three translations.
Update all three `public/llms*.txt` files and the sitemap when published
pages or product descriptions change.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
