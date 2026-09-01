export const socialPages: Record<string, { title: string; detail: string }> = {
  home: { title: "3D printing resources, from Mandarin3D", detail: "Guides, tools, and lessons from a Jacksonville print business." },
  guides: { title: "The 3D printing library", detail: "Materials, model preparation, and running a printing business." },
  consulting: { title: "3D printing business consulting", detail: "Work through your next decision with Ryan Vogel. $300 per session." },
  calculator: { title: "3D print cost & pricing calculator", detail: "Account for materials, machine time, labor, fees, and margin." },
  business: { title: "Build a better 3D printing business", detail: "Practical guides to pricing, capacity, and quoting workflows." },
  "ryan-vogel": { title: "Ryan Vogel", detail: "Founder of Mandarin3D. Developer and 3D printing business consultant." },
};

export function socialImage(slug: string, title: string) {
  return { url: `https://mandarin3d.com/social/${slug}`, width: 1200, height: 630, alt: title };
}
