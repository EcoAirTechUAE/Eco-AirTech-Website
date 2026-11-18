/**
 * Shopify Storefront API, the two calls the store needs:
 *   - read The MOVE's live price and stock
 *   - create a cart and send the shopper to Shopify's checkout
 *
 * Checkout itself (card details, Apple Pay, VAT, address) happens on Shopify,
 * so no payment data ever touches our site.
 */
import { store, storeLive } from "@/config/store";

export interface LiveProduct {
  title: string;
  variantId: string;
  price: number;
  currency: string;
  available: boolean;
}

async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${store.shopifyDomain}/api/${store.apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": store.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length || !json.data) throw new Error(json.errors?.[0]?.message ?? "Shopify returned no data");
  return json.data;
}

export async function fetchProduct(handle: string): Promise<LiveProduct | null> {
  if (!storeLive()) return null;
  const data = await storefront<{
    product: {
      title: string;
      variants: { nodes: { id: string; availableForSale: boolean; price: { amount: string; currencyCode: string } }[] };
    } | null;
  }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        title
        variants(first: 1) { nodes { id availableForSale price { amount currencyCode } } }
      }
    }`,
    { handle },
  );
  const v = data.product?.variants.nodes[0];
  if (!data.product || !v) return null;
  return {
    title: data.product.title,
    variantId: v.id,
    price: Number(v.price.amount),
    currency: v.price.currencyCode,
    available: v.availableForSale,
  };
}

/** Creates a cart with the chosen quantity and returns Shopify's checkout address. */
export async function checkoutUrl(variantId: string, quantity: number): Promise<string> {
  const data = await storefront<{
    cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
  }>(
    `mutation Buy($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines, buyerIdentity: { countryCode: AE } }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );
  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) throw new Error(data.cartCreate.userErrors[0]?.message ?? "Could not start checkout");
  return url;
}

export const formatAed = (n: number) =>
  `AED ${n.toLocaleString("en-GB", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
