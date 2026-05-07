export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-border/80 bg-background">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6">
        <div className="rounded-[22px] bg-black px-5 py-7 text-white sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-center">
            <h2 className="font-emotion max-w-lg text-3xl font-semibold leading-[0.95] tracking-tight sm:text-4xl">
              Stay upto date about our latest offers
            </h2>
            <div className="space-y-3">
              <input
                placeholder="Enter your email address"
                className="h-11 w-full rounded-full bg-white px-4 text-sm text-black outline-none"
              />
              <button className="h-11 w-full cursor-pointer rounded-full bg-white text-sm font-medium text-black">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-5">
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-structure text-3xl font-bold tracking-tight">SHOP.CO</h3>
            <p className="text-sm text-muted-foreground">
              We have clothes that suits your style and which you&apos;re proud to wear.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26L23 21.75h-6.797l-5.32-6.953-6.084 6.953H1.49l7.73-8.835L1 2.25h6.97l4.81 6.36z" },
                { label: "Facebook", path: "M13 21v-7h3l1-4h-4V8c0-1.1.9-2 2-2h2V2h-3c-3.3 0-6 2.7-6 6v2H5v4h3v7z" },
                { label: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m5 5.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5m6.25-1.75a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25M12 9.5a3.5 3.5 0 1 1-3.5 3.5A3.5 3.5 0 0 1 12 9.5" },
                { label: "Github", path: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.69-3.88-1.38-3.88-1.38-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.04c.97 0 1.95.13 2.86.38 2.19-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold"
                  aria-label={item.label}
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-black" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <FooterColumn
            title="Company"
            links={["About", "Features", "Works", "Career"]}
          />
          <FooterColumn
            title="Help"
            links={["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"]}
          />
          <FooterColumn
            title="Faq"
            links={["Account", "Manage Deliveries", "Orders", "Payment"]}
          />
          <FooterColumn
            title="Resources"
            links={["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"]}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Shop.co @ 2000-2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ links, title }: { links: string[]; title: string }) {
  return (
    <div>
      <h4 className="font-structure text-sm font-semibold uppercase tracking-[0.2em]">{title}</h4>
      <ul className="mt-4 space-y-3 text-muted-foreground">
        {links.map((link) => (
          <li key={link} className="text-sm">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
