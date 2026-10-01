import Link from "next/link";

export function Sidebar() {
  return <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white px-5 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
    <Link href="/partners" className="flex items-center gap-2 text-lg font-bold text-slate-900"><span className="grid size-8 place-items-center rounded-lg bg-emerald-600 text-white">P</span>PartnerFlow</Link>
    <nav className="mt-6 flex gap-2 md:flex-col"><Link className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800" href="/partners">Partners</Link><Link className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" href="/leads">Leads & attribution</Link></nav>
    <div className="mt-auto hidden rounded-xl bg-slate-900 p-4 text-sm text-slate-300 md:block"><b className="block text-white">Partner attribution</b><span className="mt-1 block">Capture every conversion.</span></div>
  </aside>;
}
