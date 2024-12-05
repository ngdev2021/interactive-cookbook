// Conversion constants
const CONVERSIONS = {
  weight: {
    gramToOunce: 0.035274,
    ounceToGram: 28.3495,
    kilogramToPound: 2.20462,
    poundToKilogram: 0.453592,
  },
  volume: {
    milliliterToFluidOunce: 0.033814,
    fluidOunceToMilliliter: 29.5735,
    literToGallon: 0.264172,
    gallonToLiter: 3.78541,
  },
  length: {
    millimeterToInch: 0.0393701,
    inchToMillimeter: 25.4,
    meterToYard: 1.09361,
    yardToMeter: 0.9144,
  },
};

// Utility functions
export const convertWeight = (value, from, to) => {
  if (from === 'gram' && to === 'ounce')
    return value * CONVERSIONS.weight.gramToOunce;
  if (from === 'ounce' && to === 'gram')
    return value * CONVERSIONS.weight.ounceToGram;
  if (from === 'kilogram' && to === 'pound')
    return value * CONVERSIONS.weight.kilogramToPound;
  if (from === 'pound' && to === 'kilogram')
    return value * CONVERSIONS.weight.poundToKilogram;
  return value;
};

export const convertVolume = (value, from, to) => {
  if (from === 'milliliter' && to === 'fluidOunce')
    return value * CONVERSIONS.volume.milliliterToFluidOunce;
  if (from === 'fluidOunce' && to === 'milliliter')
    return value * CONVERSIONS.volume.fluidOunceToMilliliter;
  if (from === 'liter' && to === 'gallon')
    return value * CONVERSIONS.volume.literToGallon;
  if (from === 'gallon' && to === 'liter')
    return value * CONVERSIONS.volume.gallonToLiter;
  return value;
};

export const convertLength = (value, from, to) => {
  if (from === 'millimeter' && to === 'inch')
    return value * CONVERSIONS.length.millimeterToInch;
  if (from === 'inch' && to === 'millimeter')
    return value * CONVERSIONS.length.inchToMillimeter;
  if (from === 'meter' && to === 'yard')
    return value * CONVERSIONS.length.meterToYard;
  if (from === 'yard' && to === 'meter')
    return value * CONVERSIONS.length.yardToMeter;
  return value;
};
