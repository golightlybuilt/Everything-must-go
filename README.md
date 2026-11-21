# Everything Must Go

A responsive, static storefront for the `Everything-must-go` GitHub Pages site.

## Launch steps

1. Edit `products.json` with real products, prices, categories, images, and availability.
2. Add a real checkout URL to `CHECKOUT_URL` near the top of `app.js`.
3. Replace `hello@golightlybuilt.com` in `index.html` if you use the mail fallback.
4. Enable GitHub Pages:
   - Open the repository **Settings** > **Pages**.
   - Under **Build and deployment**, choose **Deploy from a branch**.
   - Choose `main` and the `/ (root)` folder.
5. Open the generated Pages URL and verify the site.

## Inventory format

Each item in `products.json` supports:

- `id`: unique stable identifier
- `name`: display name
- `description`: accurate product description
- `price`: numeric USD price
- `category`: category label
- `image`: public image URL
- `available`: `true` or `false`

Do not add sample listings to a public launch. Verify ownership, condition, dimensions, shipping/pickup terms, taxes, and refund rules before taking payment.

## Checkout

This initial package is a local cart only. GitHub Pages cannot process payments or orders. A real payment service is required. Stripe Payment Links and Gumroad are possible providers, and must be configured under your own account.
