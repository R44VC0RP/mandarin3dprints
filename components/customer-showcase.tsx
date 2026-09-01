import Image from "next/image";

const projects = [
  { image: "big_order.jpeg", title: "A batch of custom nameplates", position: "center 65%" },
  { image: "windsurf_nameplate.jpeg", title: "A nameplate for Windsurf", position: "center" },
  { image: "vercel_key_id.jpeg", title: "A Vercel event badge", position: "center" },
  { image: "mini_apple_cpu.jpeg", title: "A tiny Apple-inspired print", position: "center" },
];

export function CustomerShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {projects.map((project) => (
        <figure key={project.image}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted outline outline-black/10 -outline-offset-1">
            <Image src={`/customerShowcase/${project.image}`} alt={project.title} fill sizes="(max-width: 768px) 45vw, 240px" className="object-cover" style={{ objectPosition: project.position }} />
          </div>
          <figcaption className="mt-2 text-sm text-muted-foreground">{project.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
