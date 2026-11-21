# Everything Must Go

The repository hosts a static storefront for the original **Garage Sale & Clearance Kit** digital product.

## Product

The bundle includes:

- A sale planning checklist
- A three-pass pricing worksheet
- An item inventory tracker
- A sale-day plan
- A closeout worksheet

The source file is `garage-sale-clearance-kit.md`. Export or convert it to a PDF and upload the finished file to a Gumroad account before selling.

## Checkout

1. Create a free Gumroad account at https://gumroad.com
2. Create a product named **Garage Sale & Clearance Kit** priced at **$12**
3. Upload the PDF or bundle
4. Copy the Gumroad product URL
5. Replace `const CHECKOUT_URL = ''` in `app.js` with that URL

## GitHub Pages

In repository settings:

1. Open **Settings** > **Pages**
2. Select **Deploy from a branch**
3. Choose `main` and `/ (root)`
4. Save and wait for deployment

No local server, database, paid hosting, or payment secret is required for the static storefront.
