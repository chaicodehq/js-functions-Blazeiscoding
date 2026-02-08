/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  const rates = {
    veg: 80,
    nonveg: 120,
    jain: 90,
  };

  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }

  if (!(mealType in rates)) {
    return null;
  }

  if (typeof days !== "number" || Number.isNaN(days) || days <= 0) {
    return null;
  }

  const dailyRate = rates[mealType];
  const totalCost = dailyRate * days;

  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost,
  };
}

export function combinePlans(...plans) {
  if (plans.length === 0) {
    return null;
  }

  const mealBreakdown = {};
  let totalRevenue = 0;

  for (const plan of plans) {
    if (!plan || typeof plan !== "object") {
      continue;
    }

    totalRevenue += typeof plan.totalCost === "number" ? plan.totalCost : 0;

    if (typeof plan.mealType === "string") {
      mealBreakdown[plan.mealType] = (mealBreakdown[plan.mealType] || 0) + 1;
    }
  }

  return {
    totalCustomers: plans.length,
    totalRevenue,
    mealBreakdown,
  };
}

export function applyAddons(plan, ...addons) {
  if (!plan || typeof plan !== "object") {
    return null;
  }

  let addonTotal = 0;
  const addonNames = [];

  for (const addon of addons) {
    if (!addon || typeof addon !== "object") {
      continue;
    }

    if (typeof addon.price === "number" && !Number.isNaN(addon.price)) {
      addonTotal += addon.price;
    }

    if (typeof addon.name === "string") {
      addonNames.push(addon.name);
    }
  }

  const dailyRate = (typeof plan.dailyRate === "number" ? plan.dailyRate : 0) + addonTotal;
  const days = typeof plan.days === "number" ? plan.days : 0;
  const totalCost = dailyRate * days;

  return {
    ...plan,
    dailyRate,
    totalCost,
    addonNames,
  };
}
