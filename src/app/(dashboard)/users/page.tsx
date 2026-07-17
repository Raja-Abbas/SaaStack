"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown";
import {
  UserPlus,
  MoreVertical,
  Pencil,
  Trash2,
  Shield,
  Mail,
  X,
  Search,
} from "lucide-react";

type Role = "Owner" | "Admin" | "Member" | "Viewer";
type Status = "Active" | "Pending";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  initials: string;
}

const members: Member[] = [
  { id: "1", name: "John Smith", email: "john@example.com", role: "Owner", status: "Active", joined: "Jan 2026", initials: "JS" },
  { id: "2", name: "Sarah Chen", email: "sarah@company.com", role: "Admin", status: "Active", joined: "Feb 2026", initials: "SC" },
  { id: "3", name: "Mike Johnson", email: "mike@team.com", role: "Member", status: "Active", joined: "Mar 2026", initials: "MJ" },
  { id: "4", name: "Emily Davis", email: "emily@startup.io", role: "Member", status: "Active", joined: "Apr 2026", initials: "ED" },
  { id: "5", name: "Alex Kim", email: "alex@dev.co", role: "Viewer", status: "Active", joined: "May 2026", initials: "AK" },
  { id: "6", name: "Lisa Wang", email: "lisa@new.com", role: "Member", status: "Pending", joined: "Jun 2026", initials: "LW" },
];

const roleVariant: Record<Role, "default" | "secondary" | "outline" | "success"> = {
  Owner: "default",
  Admin: "secondary",
  Member: "success",
  Viewer: "outline",
};

const roleIcon: Record<Role, string> = {
  Owner: "bg-blue-500/10 text-blue-400",
  Admin: "bg-indigo-500/10 text-indigo-400",
  Member: "bg-emerald-500/10 text-emerald-400",
  Viewer: "bg-slate-500/10 text-slate-400",
};

export default function UsersPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Member");
  const [searchQuery, setSearchQuery] = useState("");

  const totalMembers = 8;
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const pendingInvites = 1;

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <p className="text-slate-400 mt-1">Manage your team and their roles</p>
        </div>
        <Button onClick={() => setShowInvite(true)}>
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Total Members</p>
            <p className="text-3xl font-bold text-white mt-1">{totalMembers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Active</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{activeMembers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-400">Pending Invites</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{pendingInvites}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search members..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">User</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">Role</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">Joined</th>
                  <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={roleIcon[member.role]}>
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-slate-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant={roleVariant[member.role]}>
                        <Shield className="h-3 w-3 mr-1" />
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={member.status === "Active" ? "success" : "outline"}>
                        {member.status === "Pending" && <Mail className="h-3 w-3 mr-1" />}
                        {member.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-slate-300">{member.joined}</td>
                    <td className="py-4 text-right">
                      <Dropdown>
                        <DropdownTrigger className="text-slate-400 hover:text-white transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownTrigger>
                        <DropdownContent align="end">
                          <DropdownItem>
                            <Pencil className="h-4 w-4" />
                            Edit
                          </DropdownItem>
                          <DropdownItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invite Team Member</CardTitle>
                <button onClick={() => setShowInvite(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <Separator />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowInvite(false)}>
                  Cancel
                </Button>
                <Button onClick={() => { setShowInvite(false); setInviteEmail(""); }}>
                  <Mail className="h-4 w-4" />
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
