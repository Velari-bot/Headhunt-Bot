export type RoleDefinition = {
  name: string;
  color: number;
  hoist: boolean;
};

export const roles: RoleDefinition[] = [
  { name: "Owner", color: 0x8b0000, hoist: true },
  { name: "Admin", color: 0xef4444, hoist: true },
  { name: "Moderator", color: 0x3b82f6, hoist: true },
  { name: "Developer", color: 0xa855f7, hoist: true },
  { name: "HeadHunt Staff", color: 0xf59e0b, hoist: true },
  { name: "Player", color: 0x22c55e, hoist: false },
  { name: "Linked", color: 0x10b981, hoist: false },
  { name: "Team Leader", color: 0x06b6d4, hoist: true },
  { name: "Outlaw", color: 0x6b7280, hoist: true },
  { name: "Bounty Hunter", color: 0xf97316, hoist: true },
  { name: "Ghost", color: 0x64748b, hoist: true },
  { name: "Eliminated", color: 0x9ca3af, hoist: true },
];

export const staffRoleNames = [
  "Owner",
  "Admin",
  "Moderator",
  "Developer",
  "HeadHunt Staff",
] as const;

export const restrictedStatusRoles = ["Ghost", "Eliminated"] as const;
