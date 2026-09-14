# Zixlab Ltd website

The public company and product website for **Zixlab Ltd**, prepared for deployment as a Render static site.

## Website structure

- `/` — landing page
- `/about/` — company background and approach
- `/products/` — Zixlabs product catalogue, currently featuring PharmaScan
- `/contact/` — company and product contact details

The deployable website is contained in `dist/`. It uses plain HTML, CSS and a small amount of JavaScript, with no package installation or build framework required.

## Deploying on Render

The included `render.yaml` defines a static site with:

- service name: `zixlab-website`
- publish directory: `dist`
- automatic deployment from commits
- custom domains: `zixlab.co.uk` and `zixlabs.co.uk`
- baseline security headers

In Render, create a new **Blueprint**, connect this repository and select the root-level `render.yaml` file. Render will then show the DNS records required for both domains.

`zixlab.co.uk` is the canonical website address. The pages declare canonical URLs on that domain so search engines treat it as the primary version. If an HTTP redirect from `zixlabs.co.uk` is preferred, configure domain forwarding with the DNS/domain provider or a separate redirect service.

## Updating PharmaScan store links

The Apple App Store and Google Play controls in `dist/products/index.html` are intentionally shown as disabled “Coming soon” placeholders.

When the listings are live:

1. Replace each `span.store-placeholder` with an `a.store-placeholder` element.
2. Add the appropriate store URL using an `href` attribute.
3. Remove `aria-disabled="true"`.
4. Change “Coming soon” to the required store wording.
5. Change the visible `Beta testing` status if appropriate.

## Adding a future product

Add the product to `dist/products/index.html`, then add a short featured-product section or link on `dist/index.html` if it should appear on the landing page. Reuse the existing product components and status labels for a consistent presentation.

Future candidates discussed for the portfolio include the Zixlab flight tracker and a pharmaceutical steam-quality testing and calculation tool. They are deliberately not advertised as available products in the current release.

## Contact details

- General: `hello@zixlab.co.uk`
- Products: `hello@zixlabs.co.uk`

## Company information

Zixlab Ltd<br>
Company number 17433963<br>
Registered in England and Wales<br>
Registered office: 8 Telford Avenue, Ellesmere, Shropshire SY12 0GE
