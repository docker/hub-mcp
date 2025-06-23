import { z } from "zod";

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z.object({
    count: z.number(),
    next: z.string().nullable().optional(),
    previous: z.string().nullable().optional(),
    results: z.array(itemSchema),
  });
}

export type Organization = {
  id: string;
  uuid: string;
  orgname: string;
  full_name: string;
  location: string;
  company: string;
  profile_url: string;
  date_joined: string;
  gravatar_url: string;
  gravatar_email: string;
  type: string;
  badge: string;
  is_active: boolean;
  user_role: string;
  user_groups: string[];
  org_groups_count: number;
  plan_name: string;
  parent_name: string;
};
