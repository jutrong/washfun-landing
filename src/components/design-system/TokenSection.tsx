import type { ReactNode } from "react";

export default function TokenSection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-stroke-neutral-muted py-x10">
      <h2 className="text-t8 font-bold text-fg-neutral">{title}</h2>
      {lead ? <p className="mt-x2 text-t4 text-fg-neutral-muted">{lead}</p> : null}
      <div className="mt-x6">{children}</div>
    </section>
  );
}
