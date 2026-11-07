# Open Trip Model (OTM5)

This repository is the home of the [Open Trip Model][otm] version 5. It contains:

* the **OTM API specification** (OpenAPI), in [`otm-api/`](otm-api/);
* the **OTM documentation website**, in [`website/`](website/), published at [otm5.opentripmodel.org][otm5-spec];
* the **change request tracker**: the [issues][issues] of this repository.

If you have ideas, a bug report or questions regarding the [Open Trip Model][otm], please report them here as an
issue in this repository.

[otm]: https://opentripmodel.org
[otm5-spec]: https://otm5.opentripmodel.org/
[issues]: https://github.com/opentripmodel/otm5-change-requests/issues

## Repository structure 🗂️

```
.
├── .github/          Issue templates and GitHub Actions workflows (build and deploy of the website)
├── otm-api/          OTM API specification (authoritative source)
│   ├── otm-api-v*.yaml   Bundled specification per released version
│   ├── next/             Split-up working copy of the next, unreleased version
│   ├── archive/          Release candidates of earlier versions
│   └── plugins/          Custom Redocly lint rules
└── website/          Documentation website (Docusaurus)
    ├── app/              Docusaurus site: docs, versioned docs, blog, pages
    ├── nginx-conf/       Nginx configuration of the Docker image
    └── Dockerfile        Docker image serving the built website
```

### API specification

The bundled `otm-api/otm-api-v*.yaml` files are the authoritative specifications. Changes for the next release are made
in `otm-api/next/` and bundled into a new version with [Redocly CLI](https://redocly.com/docs/cli):

```sh
cd otm-api
redocly lint ./next/openapi.yaml
redocly bundle -o otm-api-v5.x.yaml ./next/openapi.yaml
```

See [`otm-api/README.md`](otm-api/README.md) for details.

### Website

The website is built with [Docusaurus](https://docusaurus.io/) and requires Node.js 20+ and Yarn 1.x. The bundled API
specifications from `otm-api/` are copied into the website as downloadable static assets (`/api/otm-api-v*.yaml`) on
every `yarn start` and `yarn build`.

```sh
cd website/app
yarn install
yarn start   # local development server
yarn build   # static build into website/app/build
```

To build and run the Docker image locally (the build context is the repository root):

```sh
docker build -f website/Dockerfile -t otm-documentation .
docker run --rm -p 8080:80 otm-documentation
```

Changes to `website/` or `otm-api/otm-api-v*.yaml` on `main` are deployed automatically by the workflows in
`.github/workflows/`.

## How do I submit a change request? 📈

A change request can be any improvement or addition to the existing specification.

Before opening a change request, please search in the [issues][issues] to make sure that a similar change has not been
previously requested. If so it could be planned for a future version of OTM and you can contribute to the discussion in
the existing issue. If your request is new, open an issue by pressing `New issue` in the upper right corner. Please use
the "Feature request" template to help provide the best possible information.

Pull requests with a proposed change to the specification (in `otm-api/next/`) or the documentation (in `website/`) are
welcome as well; please link them to the related issue.

## How do I submit a bug? 🐛

A bug can be any fault, inconsistency or contradiction in the specification itself or the way the spec is represented
[on the website][otm5-spec]. It can also be something that is unclear in the spec.

The process is similar to change requests: before opening a bug, please search in the [issues][issues] to make sure that
the bug has not been reported already. If the bug is new, open an issue by pressing the `New issue` in the upper right
corner.  Please use the "Bug report" template to help provide the best possible information.

## When will the new feature or bugfix be available? 🚀

TODO: Elaborate here that OTM has a fixed release schedule every half year.
