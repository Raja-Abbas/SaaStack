"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  UserPlus,
  CreditCard,
  Key,
  Settings,
  Shield,
  LogIn,
  Trash2,
  UserMinus,
  ArrowDown,
} from "lucide-react";

type ActionType = "Auth" | "Billing" | "Team" | "Settings";

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  email: string;
  description: string;
  timestamp: string;
  type: ActionType;
}

const activityLogs: ActivityItem[] = [
  { id: "1", action: "User signed up", user: "John Smith", email: "john@example.com", description: "New user registered via email", timestamp: "2m ago", type: "Auth" },
  { id: "2", action: "Subscription upgraded", user: "Sarah Chen", email: "sarah@company.com", description: "Upgraded from Starter to Pro", timestamp: "15m ago", type: "Billing" },
  { id: "3", action: "API key created", user: "Admin", email: "admin@startup.io", description: "Generated production API key", timestamp: "1h ago", type: "Settings" },
  { id: "4", action: "Team member invited", user: "Mike Johnson", email: "mike@team.com", description: "Invited lisa@new.com as Member", timestamp: "3h ago", type: "Team" },
  { id: "5", action: "Settings updated", user: "Admin", email: "admin@demo.com", description: "Changed organization name", timestamp: "5h ago", type: "Settings" },
  { id: "6", action: "Password changed", user: "John Smith", email: "john@example.com", description: "Security: password updated", timestamp: "8h ago", type: "Auth" },
  { id: "7", action: "User removed", user: "Sarah Chen", email: "sarah@company.com", description: "Removed bob@test.com from team", timestamp: "1d ago", type: "Team" },
  { id: "8", action: "Plan downgraded", user: "Admin", email: "admin@demo.com", description: "Downgraded from Pro to Starter", timestamp: "2d ago", type: "Billing" },
  { id: "9", action: "New login", user: "Mike Johnson", email: "mike@team.com", description: "Login from Chrome on Windows", timestamp: "3d ago", type: "Auth" },
  { id: "10", action: "API key revoked", user: "John Smith", email: "john@example.com", description: "Revoked old development key", timestamp: "5d ago", type: "Settings" },
];

const typeIcon: Record<ActionType, { icon: typeof Activity; color: string; bg: string }> = {
  Auth: { icon: Shield, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  Billing: { icon: CreditCard, color: "text-blue-400", bg: "bg-blue-500/10" },
  Team: { icon: UserPlus, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  Settings: { icon: Settings, color: "text-orange-400", bg: "bg-orange-500/10" },
};

const actionIcon: Record<string, typeof Activity> = {
  "User signed up": UserPlus,
  "Subscription upgraded": ArrowDown,
  "API key created": Key,
  "Team member invited": UserPlus,
  "Settings updated": Settings,
  "Password changed": Shield,
  "User removed": UserMinus,
  "Plan downgraded": ArrowDown,
  "New login": LogIn,
  "API key revoked": Trash2,
};

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState<ActionType | "All">("All");

  const filteredLogs =
    activeFilter === "All"
      ? activityLogs
      : activityLogs.filter((log) => log.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity Logs</h1>
          <p className="text-slate-400 mt-1">Track all actions across your organization</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="flex h-10 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            className="flex h-10 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["All", "Auth", "Billing", "Team", "Settings"] as const).map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            {filteredLogs.length} event{filteredLogs.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-700" />
            <div className="space-y-0">
              {filteredLogs.map((log, index) => {
                const typeInfo = typeIcon[log.type];
                const IconComponent = actionIcon[log.action] || Activity;
                const initials = log.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <div key={log.id} className="relative flex gap-4 py-4">
                    <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${typeInfo.bg} ${typeInfo.color} ring-2 ring-[#0f172a]`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-white">{log.action}</p>
                            <Badge variant="outline" className="text-[10px]">
                              {log.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mt-0.5">{log.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[9px] bg-slate-700">{initials}</AvatarFallback>
                            </Avatar>
                            <p className="text-xs text-slate-500">
                              {log.user} &middot; {log.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">{log.timestamp}</span>
                      </div>
                    </div>
                    {index < filteredLogs.length - 1 && <Separator className="absolute bottom-0 left-14 right-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
