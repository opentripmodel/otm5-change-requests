# The OTM API specification


## Bundled versions

This folder contains bundled API specifications of (previous) OTM versions.

We use the OpenAPI Specifications (OAS) standard and YAML format to specify the OTM API. Several (open source) tools, including [Redocly CLI](https://redocly.com/docs/cli), are available to work with these specifications.

## Next unreleased version

The working directory `./next` contains an unpacked/splitted latest version of the API specification.

Here all components, schemas, paths and more can be updated in preparation of a next release

## Releasing next version

To release a next version we use the [redocly cli]() to bundle all parts of the API spec located in `next` into a single specification file.

The command to use is: `redocly bundle -o otm-api-v5.x.yaml ./next/openapi.yaml`
