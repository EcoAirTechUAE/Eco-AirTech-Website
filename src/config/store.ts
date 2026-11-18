/**
 * Online store (UAE): The MOVE (manufacturer's name: Portable ARC Home), sold
 * through Shopify behind our own pages.
 *
 * Our site renders the product page; Shopify runs the cart, payment, VAT and
 * order record, and Quiqup collects and delivers through its Shopify app.
 *
 * Until the Shopify values below are set, the store never pretends to take
 * money: the buy button becomes "Register interest" and opens WhatsApp.
 *
 * Set in Vercel (Project → Settings → Environment Variables):
 *   VITE_SHOPIFY_DOMAIN             e.g. eco-airtech.myshopify.com
 *   VITE_SHOPIFY_STOREFRONT_TOKEN   the Storefront API *public* access token
 * The public token is designed to ship in the browser; never put the Admin API
 * token here.
 */

export const store = {
  shopifyDomain: (import.meta.env.VITE_SHOPIFY_DOMAIN as string | undefined) ?? "",
  storefrontToken: (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string | undefined) ?? "",
  apiVersion: "2025-01",
  /** The one product on sale: its name and Shopify handle. */
  productName: "The MOVE",
  portableHandle: "portable-arc-home",
  /**
   * Shown only while Shopify is not connected. Leave null rather than guess:
   * the page then says the price is confirmed at launch.
   */
  launchPriceAed: 2995 as number | null,
  /**
   * Buy now, pay later, offered in Shopify's checkout through the Tabby and Tamara apps.
   * List a provider here only once its merchant account is approved and live at checkout,
   * so the page never promises a payment option the shopper cannot use.
   */
  bnpl: [] as ("Tabby" | "Tamara")[],
  /** Number of interest-free instalments both providers offer. */
  bnplInstalments: 4,
  delivery: "Delivered across the UAE by our courier partner, Quiqup.",
  /** UAE only for now. */
  shipsTo: "United Arab Emirates",
};

export const storeLive = () => !!(store.shopifyDomain && store.storefrontToken);
