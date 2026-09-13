import { forwardRef, useCallback } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";
import { localePath, useLocale } from "./locale";
import { translate, type UiKey } from "./ui";

export { LocaleProvider, useLocale, localePath, stripLocale, LANGS } from "./locale";
export type { Lang } from "./locale";
export { ui } from "./ui";
export type { UiKey } from "./ui";

/** UI string lookup for the active language. */
export function useT() {
  const { lang } = useLocale();
  return useCallback((key: UiKey) => translate(lang, key), [lang]);
}

/**
 * Drop-in replacements for react-router's Link and NavLink that keep the
 * active language in the URL.
 *
 * Components import these instead of the router's own, so no individual
 * `to` prop has to know about languages — otherwise every one of the
 * ~90 links on the site would silently drop an Arabic visitor back to
 * English the moment they clicked it.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  const { lang } = useLocale();
  const href = typeof to === "string" ? localePath(to, lang) : to;
  return <RouterLink ref={ref} to={href} {...rest} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, ...rest },
  ref,
) {
  const { lang } = useLocale();
  const href = typeof to === "string" ? localePath(to, lang) : to;
  return <RouterNavLink ref={ref} to={href} {...rest} />;
});
