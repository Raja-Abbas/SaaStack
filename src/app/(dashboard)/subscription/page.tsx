"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Check,
  ArrowUp,
  ArrowDown,
  Receipt,
  Shield,
} from "lucide-react";

interface PlanFeature {
  name: string;
  starter: string;
  pro: string;
  enterprise: string;
}

const plans = [
  { name: "Starter", price: 0, period: "/mo", description: "For individuals getting started" },
  { name: "Pro", price: 49, period: "/mo", description: "For growing teams" },
  { name: "Enterprise", price: 199, period: "/mo", description: "For large organizations" },
];

const features: PlanFeature[] = [
  { name: "Team members", starter: "3", pro: "10", enterprise: "Unlimited" },
  { name: "API calls", starter: "1,000/mo", pro: "10,000/mo", enterprise: "100,000/mo" },
  { name: "Storage", starter: "1 GB", pro: "5 GB", enterprise: "50 GB" },
  { name: "Organizations", starter: "1", pro: "10", enterprise: "Unlimited" },
  { name: "Priority support", starter: "-", pro: "✓", enterprise: "✓" },
  { name: "Custom roles", starter: "-", pro: "✓", enterprise: "✓" },
  { name: "SSO & SAML", starter: "-", pro: "-", enterprise: "✓" },
  { name: "SLA guarantee", starter: "-", pro: "-", enterprise: "99.9%" },
];

const invoices = [
  { id: "INV-001", date: "Jun 17, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-002", date: "May 17, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-003", date: "Apr 17, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-004", date: "Mar 17, 2026", amount: "$49.00", status: "Paid" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<"Starter" | "Pro" | "Enterprise">("Pro");

  const apiUsage = { used: 8450, total: 10000 };
  const memberUsage = { used: 6, total: 10 };
  const storageUsage = { used: 2.4, total: 5 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Subscription & Billing</h1>
        <p className="text-slate-400 mt-1">Manage your plan, usage, and billing</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </div>
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Shield className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-slate-400">/month</span>
            </div>
            <p className="text-sm text-slate-400">Renews in 18 days</p>
            <Separator />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <ArrowUp className="h-4 w-4" />
                Upgrade
              </Button>
              <Button variant="outline" className="flex-1 text-slate-400">
                <ArrowDown className="h-4 w-4" />
                Downgrade
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Current billing period usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">API Calls</span>
                <span className="text-white font-medium">{formatNumber(apiUsage.used)} / {formatNumber(apiUsage.total)}</span>
              </div>
              <Progress value={(apiUsage.used / apiUsage.total) * 100} />
              <p className="text-xs text-slate-500 mt-1">{((apiUsage.used / apiUsage.total) * 100).toFixed(1)}% used</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Team Members</span>
                <span className="text-white font-medium">{memberUsage.used} / {memberUsage.total}</span>
              </div>
              <Progress value={(memberUsage.used / memberUsage.total) * 100} />
              <p className="text-xs text-slate-500 mt-1">{((memberUsage.used / memberUsage.total) * 100).toFixed(0)}% used</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Storage</span>
                <span className="text-white font-medium">{storageUsage.used} GB / {storageUsage.total} GB</span>
              </div>
              <Progress value={(storageUsage.used / storageUsage.total) * 100} />
              <p className="text-xs text-slate-500 mt-1">{((storageUsage.used / storageUsage.total) * 100).toFixed(0)}% used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compare Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-white text-sm font-semibold">{plan.name}</span>
                        <span className="text-slate-400 normal-case">${plan.price}/mo</span>
                        {currentPlan === plan.name && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">Current Plan</Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {features.map((feature) => (
                  <tr key={feature.name} className="hover:bg-slate-800/50">
                    <td className="py-3 text-sm text-slate-300">{feature.name}</td>
                    <td className="py-3 text-center text-sm text-slate-300">
                      {feature.starter === "✓" ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : feature.starter}
                    </td>
                    <td className="py-3 text-center text-sm text-white font-medium">
                      {feature.pro === "✓" ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : feature.pro}
                    </td>
                    <td className="py-3 text-center text-sm text-slate-300">
                      {feature.enterprise === "✓" ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : feature.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" onClick={() => setCurrentPlan("Starter")}>
              <ArrowDown className="h-4 w-4" />
              Downgrade to Starter
            </Button>
            <Button onClick={() => setCurrentPlan("Enterprise")}>
              <ArrowUp className="h-4 w-4" />
              Upgrade to Enterprise
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex h-12 w-16 items-center justify-center rounded-md bg-blue-600 text-white font-bold text-sm tracking-wider">
                VISA
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                <p className="text-xs text-slate-400">Expires 12/2028</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Download past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                      <Receipt className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{invoice.id}</p>
                      <p className="text-xs text-slate-400">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">{invoice.amount}</span>
                    <Badge variant="success" className="text-[10px]">{invoice.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
