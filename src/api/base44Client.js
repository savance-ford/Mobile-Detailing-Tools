/**
 * base44Client (local replacement)
 *
 * This project was originally generated with Base44.
 * The pages/components expect a `base44` object with an `entities.*` API.
 *
 * To run this app without Base44, we provide a tiny in-memory client that reads
 * from local mock data. Later, you can swap these functions for real API calls.
 */

import { categories, tools, guides } from "@/data/mockData";

const sortByField = (items, field) => {
  if (!field) return [...items];
  return [...items].sort((a, b) => {
    const av = a?.[field];
    const bv = b?.[field];
    // undefined values go last
    if (av === undefined && bv === undefined) return 0;
    if (av === undefined) return 1;
    if (bv === undefined) return -1;
    if (typeof av === "number" && typeof bv === "number") return av - bv;
    return String(av).localeCompare(String(bv));
  });
};

const matchesCriteria = (item, criteria = {}) => {
  // Simple equality matching (good enough for our current pages)
  return Object.entries(criteria).every(([key, value]) => {
    if (value === undefined) return true;
    return item?.[key] === value;
  });
};

const createEntityApi = (dataset) => ({
  /**
   * list(sortField?, limit?)
   */
  list: async (sortField, limit) => {
    const sorted = sortByField(dataset, sortField);
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  },

  /**
   * filter(criteria, sortField?, limit?)
   */
  filter: async (criteria = {}, sortField, limit) => {
    const filtered = dataset.filter((item) => matchesCriteria(item, criteria));
    const sorted = sortByField(filtered, sortField);
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  },
});

export const base44 = {
  // Keep the same shape the app expects.
  entities: {
    Category: createEntityApi(categories),
    Tool: createEntityApi(tools),
    Guide: createEntityApi(guides),
  },

  // Optional auth stubs (not used in the standalone build)
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {},
  },
};
