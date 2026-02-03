import "../styles/main.scss";

function markActiveNav(): void {
  const path = window.location.pathname;
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-nav .nav-link"));

  for (const link of links) {
    const href = link.getAttribute("href") ?? "";
    const isActive =
      href === "/"
        ? path === "/"
        : href.length > 1 && (path === href || path.startsWith(href.endsWith("/") ? href : `${href}/`));

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

markActiveNav();
