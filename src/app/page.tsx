"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import {
  Shield,
  Users,
  CreditCard,
  Activity,
  Building2,
  ArrowRight,
  Check,
  Menu,
  X,
} from "lucide-react";

const features = [
  { icon: Shield, title: "Authentication", description: "Secure sign-in with email, OAuth, and magic links powered by NextAuth." },
  { icon: Building2, title: "Multi-Tenancy", description: "Complete data isolation between organizations with shared infrastructure." },
  { icon: Users, title: "Role-Based Access", description: "Granular permissions with admin, editor, and viewer roles per organization." },
  { icon: CreditCard, title: "Subscription Billing", description: "Stripe-powered billing with multiple tiers, trials, and invoice management." },
  { icon: Users, title: "Team Management", description: "Invite team members, manage roles, and handle organization invitations." },
  { icon: Activity, title: "Activity Logs", description: "Track every action across your organization with detailed audit trails." },
];

const steps = [
  { step: "1", title: "Sign up", description: "Create your account in seconds with email or OAuth." },
  { step: "2", title: "Configure your workspace", description: "Set up your organization, invite team members, and choose a plan." },
  { step: "3", title: "Start building", description: "Use the dashboard, APIs, and tools to build your SaaS product." },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["Up to 3 users", "1 organization", "Basic analytics", "Community support"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For growing teams",
    features: ["Unlimited users", "Up to 10 organizations", "Advanced analytics", "Priority support", "Custom roles", "API access"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/mo",
    description: "For large organizations",
    features: ["Unlimited everything", "Dedicated support", "SSO & SAML", "Custom integrations", "SLA guarantee", "Audit logs export"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo dark />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Docs</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button href="/dashboard">Open Dashboard</Button>
          </div>
          <button className="md:hidden text-slate-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-slate-600">Features</a>
            <a href="#pricing" className="block text-sm font-medium text-slate-600">Pricing</a>
            <a href="#docs" className="block text-sm font-medium text-slate-600">Docs</a>
            <div className="flex flex-col gap-2 pt-2">
              <Button className="w-full" href="/dashboard">Open Dashboard</Button>
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tOC04aDR2NGgtNHptOC00aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 sm:px-6 text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
            Open Source &middot; Production Ready
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Build SaaS products, not infrastructure
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Authentication, multi-tenancy, subscriptions, and team management — all pre-built and ready to integrate into your Next.js application.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8" href="/dashboard">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" className="text-base px-8 bg-white text-slate-900 hover:bg-slate-100" href="#features">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Everything you need to ship fast</h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Stop building auth flows, billing systems, and permission layers from scratch.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How it works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Up and running in minutes</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)]">
                    <div className="h-px bg-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-slate-500">Start free, scale as you grow.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.highlighted ? "border-blue-600 shadow-lg relative" : ""}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white border-blue-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  variant={plan.highlighted ? "default" : "outline"}
                  href="/dashboard"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Start building today</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Join developers shipping SaaS products faster with SaaStack.
          </p>
          <div className="mt-8">
            <Button size="lg" className="text-base px-8" href="/dashboard">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo dark />
            <p className="text-sm text-slate-500">&copy; 2026 Raja Abbas Affandi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
