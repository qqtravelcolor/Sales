import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
export function LayoutShell({ children }: { children: ReactNode }) { return <div className="min-h-screen bg-slate-50 md:flex"><Sidebar/><main className="w-full p-5 md:p-10">{children}</main></div>; }
