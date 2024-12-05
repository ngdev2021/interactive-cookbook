export const getGroceryStoreSize = async (
  name,
  quantity,
  unit,
  options = {},
  storeQuantities,
  unitGraph
) => {
  if (!name || !quantity || quantity <= 0) {
    throw {
      type: 'INPUT_ERROR',
      message: 'Name and positive quantity are required.',
    };
  }
  if (!storeQuantities) {
    throw {
      type: 'SYSTEM_ERROR',
      message: 'Store quantities database is required.',
    };
  }

  const normalizeName = name.toLowerCase();
  const item = storeQuantities[normalizeName];
  if (!item) {
    throw { type: 'INPUT_ERROR', message: `Unknown item: ${name}` };
  }

  const {
    unit: storeUnit,
    size,
    bulkOptions = [],
    pricePerUnit = null,
  } = item;

  // Convert to store unit
  const convertedQuantity = unit
    ? convertUnit(quantity, unit, storeUnit, {
        ingredient: options.ingredient,
        state: options.state,
      })
    : quantity;

  // Calculate required packages and leftover
  const requiredPackages = Math.ceil(convertedQuantity / size);
  const leftover = convertedQuantity % size;

  // Optimize bulk options
  const bulkBreakdown = optimizeBulk(convertedQuantity, [
    size,
    ...bulkOptions,
  ]);

  // Calculate total cost dynamically if pricePerUnit is missing
  const totalCost =
    pricePerUnit ||
    (typeof options.fetchPricing === 'function'
      ? await options.fetchPricing(normalizeName, convertedQuantity)
      : null);

  // Use localization for numeric outputs
  const numberFormatter = new Intl.NumberFormat(
    options.language || 'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return {
    name: normalizeName,
    originalQuantity: `${quantity} ${unit || ''}`.trim(),
    storeUnit,
    recommendedPackages: `${requiredPackages} ${storeUnit}s (${size} each)`,
    bulkOption: bulkBreakdown,
    leftover: leftover
      ? `${numberFormatter.format(leftover)} ${storeUnit}`
      : null,
    estimatedCost: totalCost
      ? `$${numberFormatter.format(totalCost)}`
      : 'Price not available',
    localization: options.language || 'en-US',
  };
};

export const convertUnit = (
  quantity,
  fromUnit,
  toUnit,
  options = {}
) => {
  const unitGraph = {
    tsp: { tbsp: 1 / 3, cup: 1 / 48 },
    tbsp: { tsp: 3, cup: 1 / 16 },
    cup: { tbsp: 16, gallon: 1 / 16 },
    gallon: { cup: 16 },
    oz: { lb: 1 / 16 },
    lb: { oz: 16 },
    g: { kg: 1 / 1000 },
    kg: { g: 1000 },
    ml: { liter: 1 / 1000 },
    liter: { ml: 1000 },
  };

  const weightToVolume = {
    flour: { cup: 120 },
    sugar: { cup: 200 },
    butter: { cup: 227 },
  };

  const temperatureConversions = {
    butter: { solid: 1, melted: 0.75 },
  };

  if (!quantity || quantity <= 0) {
    throw {
      type: 'INPUT_ERROR',
      message: 'Quantity must be a positive number.',
    };
  }
  if (!fromUnit || !toUnit) {
    throw {
      type: 'INPUT_ERROR',
      message: 'Both fromUnit and toUnit are required.',
    };
  }

  if (unitGraph[fromUnit]?.[toUnit]) {
    return quantity * unitGraph[fromUnit][toUnit];
  }

  const visited = new Set();
  const traverseGraph = (
    currentUnit,
    targetUnit,
    currentQuantity
  ) => {
    if (visited.has(currentUnit)) return null;
    visited.add(currentUnit);

    const conversions = unitGraph[currentUnit];
    for (const [nextUnit, factor] of Object.entries(conversions)) {
      if (nextUnit === targetUnit) {
        return currentQuantity * factor;
      }
      const result = traverseGraph(
        nextUnit,
        targetUnit,
        currentQuantity * factor
      );
      if (result !== null) return result;
    }
    return null;
  };

  const multiStepResult = traverseGraph(fromUnit, toUnit, quantity);
  if (multiStepResult !== null) return multiStepResult;

  if (
    options.ingredient &&
    weightToVolume[options.ingredient]?.[toUnit]
  ) {
    return quantity * weightToVolume[options.ingredient][toUnit];
  }

  if (
    options.state &&
    temperatureConversions[options.ingredient]?.[options.state]
  ) {
    return (
      quantity *
      temperatureConversions[options.ingredient][options.state]
    );
  }

  throw {
    type: 'CONVERSION_ERROR',
    message: `Conversion from ${fromUnit} to ${toUnit} not supported.`,
  };
};

export const optimizeBulk = (quantity, sizes) => {
  const sortedSizes = sizes.sort((a, b) => b - a); // Descending order
  const breakdown = [];
  let remaining = quantity;

  for (const size of sortedSizes) {
    const count = Math.floor(remaining / size);
    if (count > 0) {
      breakdown.push({ size, count });
      remaining -= count * size;
    }
  }

  return breakdown.length > 0
    ? breakdown
        .map((item) => `${item.count} x ${item.size}`)
        .join(', ')
    : 'No bulk option available';
};
