import { Activity, Bell, UserCircle } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Activity className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="font-bold text-slate-900 text-lg">
              SkinGPT
            </h1>

            <p className="text-xs text-slate-500">
              AI Dermatology Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Bell className="h-5 w-5 text-slate-500" />

          <UserCircle className="h-8 w-8 text-slate-600" />
        </div>
      </div>
    </nav>
  );
}