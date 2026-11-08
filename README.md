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

## SEO and prerendering

The production build prerenders the published routes, including their canonical
URLs, metadata and JSON-LD in the HTML returned before JavaScript runs. Company
structured data is maintained in `src/app/app.ts`. When adding or removing a
published route, update both `public/sitemap.xml` and `public/sitemap.txt`, as
well as the relevant `llms` files. Both sitemaps are advertised in `robots.txt`.
The root `favicon.ico` is used by browsers for non-HTML resources; keep it in
sync with the brand favicon referenced by the HTML pages.

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
