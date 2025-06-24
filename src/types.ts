/*
   Copyright 2025 Docker Hub MCP Server authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { z } from "zod";

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) {
  return z
    .object({
      count: z.number(),
      next: z.string().nullable().optional(),
      previous: z.string().nullable().optional(),
      results: z.array(itemSchema),
    })
    // .optional(); // optional because the response can be empty. This is a workaround for https://github.com/modelcontextprotocol/typescript-sdk/issues/654
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
