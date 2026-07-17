"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Settings,
  Key,
  Shield,
  Bell,
  Save,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: "Active" | "Revoked";
  lastUsed: string;
}

const apiKeys: ApiKey[] = [
  { id: "1", name: "Production Key", key: "sk_live_****...****a8f2", status: "Active", lastUsed: "2 hours ago" },
  { id: "2", name: "Development Key", key: "sk_test_****...****3b1d", status: "Active", lastUsed: "1 day ago" },
  { id: "3", name: "Staging Key", key: "sk_test_****...****7c9e", status: "Revoked", lastUsed: "5 days ago" },
];

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Acme Inc");
  const [slug, setSlug] = useState("acme-inc");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your organization and account settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api-keys">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Update your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/50 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-pointer">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Upload your logo</p>
                    <p className="text-xs text-slate-500">PNG, JPG or SVG, max 2MB</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button>
                <Shield className="h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Enable 2FA</p>
                  <p className="text-xs text-slate-400">Require a verification code when signing in</p>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    twoFactor ? "bg-blue-600" : "bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      twoFactor ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for authentication</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700">
                        <Key className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{apiKey.name}</p>
                          <Badge variant={apiKey.status === "Active" ? "success" : "destructive"}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-slate-400 font-mono">{apiKey.key}</code>
                          <button className="text-slate-500 hover:text-white transition-colors">
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Last used: {apiKey.lastUsed}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Email Notifications", description: "Receive email updates about your account", state: emailNotifications, setter: setEmailNotifications },
                { label: "Security Alerts", description: "Get notified about security events", state: securityAlerts, setter: setSecurityAlerts },
                { label: "Weekly Reports", description: "Receive a weekly summary of activity", state: weeklyReports, setter: setWeeklyReports },
                { label: "Marketing Emails", description: "Receive tips, product updates, and inspiration", state: marketingEmails, setter: setMarketingEmails },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                  <button
                    onClick={() => item.setter(!item.state)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.state ? "bg-blue-600" : "bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.state ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
