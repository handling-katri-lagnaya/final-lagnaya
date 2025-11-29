// Guna Matching Utility - Traditional Ashtakoot Guna Milan
// Total Gunas = 36, Compatibility = (Matched Gunas / 36) * 100

export const GUNA_CATEGORIES = [
  { name: "Varna", points: 1, description: "Caste compatibility" },
  { name: "Vashya", points: 2, description: "Dominance compatibility" },
  { name: "Tara", points: 3, description: "Birth star compatibility" },
  { name: "Yoni", points: 4, description: "Sexual compatibility" },
  { name: "Graha Maitri", points: 5, description: "Mental compatibility" },
  { name: "Gana", points: 6, description: "Temperament compatibility" },
  { name: "Bhakoot", points: 7, description: "Love and affection" },
  { name: "Nadi", points: 8, description: "Health and genes" },
];

export const TOTAL_GUNAS = 36;

// Nakshatra data for matching
export const NAKSHATRAS = {
  Ashwini: {
    rashi: "Mesha",
    lord: "Ketu",
    gana: "Deva",
    yoni: "Ashwa",
    nadi: "Adi",
  },
  Bharani: {
    rashi: "Mesha",
    lord: "Shukra",
    gana: "Manushya",
    yoni: "Gaja",
    nadi: "Adi",
  },
  Krittika: {
    rashi: "Mesha",
    lord: "Surya",
    gana: "Rakshasa",
    yoni: "Mesha",
    nadi: "Adi",
  },
  Rohini: {
    rashi: "Vrishabha",
    lord: "Chandra",
    gana: "Manushya",
    yoni: "Sarpa",
    nadi: "Madhya",
  },
  Mrigashira: {
    rashi: "Vrishabha",
    lord: "Mangal",
    gana: "Deva",
    yoni: "Sarpa",
    nadi: "Madhya",
  },
  Ardra: {
    rashi: "Mithuna",
    lord: "Rahu",
    gana: "Manushya",
    yoni: "Shwana",
    nadi: "Madhya",
  },
  Punarvasu: {
    rashi: "Mithuna",
    lord: "Guru",
    gana: "Deva",
    yoni: "Marjara",
    nadi: "Adi",
  },
  Pushya: {
    rashi: "Karka",
    lord: "Shani",
    gana: "Deva",
    yoni: "Mesha",
    nadi: "Adi",
  },
  Ashlesha: {
    rashi: "Karka",
    lord: "Budh",
    gana: "Rakshasa",
    yoni: "Marjara",
    nadi: "Adi",
  },
  Magha: {
    rashi: "Simha",
    lord: "Ketu",
    gana: "Rakshasa",
    yoni: "Mushaka",
    nadi: "Madhya",
  },
  "Purva Phalguni": {
    rashi: "Simha",
    lord: "Shukra",
    gana: "Manushya",
    yoni: "Mushaka",
    nadi: "Madhya",
  },
  "Uttara Phalguni": {
    rashi: "Kanya",
    lord: "Surya",
    gana: "Manushya",
    yoni: "Gau",
    nadi: "Madhya",
  },
  Hasta: {
    rashi: "Kanya",
    lord: "Chandra",
    gana: "Deva",
    yoni: "Mahisha",
    nadi: "Antya",
  },
  Chitra: {
    rashi: "Tula",
    lord: "Mangal",
    gana: "Rakshasa",
    yoni: "Vyaghra",
    nadi: "Antya",
  },
  Swati: {
    rashi: "Tula",
    lord: "Rahu",
    gana: "Deva",
    yoni: "Mahisha",
    nadi: "Antya",
  },
  Vishakha: {
    rashi: "Vrishchika",
    lord: "Guru",
    gana: "Rakshasa",
    yoni: "Vyaghra",
    nadi: "Madhya",
  },
  Anuradha: {
    rashi: "Vrishchika",
    lord: "Shani",
    gana: "Deva",
    yoni: "Harina",
    nadi: "Madhya",
  },
  Jyeshtha: {
    rashi: "Vrishchika",
    lord: "Budh",
    gana: "Rakshasa",
    yoni: "Harina",
    nadi: "Madhya",
  },
  Mula: {
    rashi: "Dhanu",
    lord: "Ketu",
    gana: "Rakshasa",
    yoni: "Shwana",
    nadi: "Adi",
  },
  "Purva Ashadha": {
    rashi: "Dhanu",
    lord: "Shukra",
    gana: "Manushya",
    yoni: "Vaanar",
    nadi: "Adi",
  },
  "Uttara Ashadha": {
    rashi: "Makara",
    lord: "Surya",
    gana: "Manushya",
    yoni: "Nakula",
    nadi: "Adi",
  },
  Shravana: {
    rashi: "Makara",
    lord: "Chandra",
    gana: "Deva",
    yoni: "Vaanar",
    nadi: "Antya",
  },
  Dhanishtha: {
    rashi: "Kumbha",
    lord: "Mangal",
    gana: "Rakshasa",
    yoni: "Simha",
    nadi: "Antya",
  },
  Shatabhisha: {
    rashi: "Kumbha",
    lord: "Rahu",
    gana: "Rakshasa",
    yoni: "Ashwa",
    nadi: "Antya",
  },
  "Purva Bhadrapada": {
    rashi: "Meena",
    lord: "Guru",
    gana: "Manushya",
    yoni: "Simha",
    nadi: "Adi",
  },
  "Uttara Bhadrapada": {
    rashi: "Meena",
    lord: "Shani",
    gana: "Manushya",
    yoni: "Gau",
    nadi: "Adi",
  },
  Revati: {
    rashi: "Meena",
    lord: "Budh",
    gana: "Deva",
    yoni: "Gaja",
    nadi: "Adi",
  },
};

// Rashi compatibility for Bhakoot matching
export const RASHI_COMPATIBILITY = {
  Mesha: ["Simha", "Dhanu", "Mithuna", "Kumbha"],
  Vrishabha: ["Kanya", "Makara", "Karka", "Meena"],
  Mithuna: ["Tula", "Kumbha", "Mesha", "Simha"],
  Karka: ["Vrishchika", "Meena", "Vrishabha", "Kanya"],
  Simha: ["Mesha", "Dhanu", "Mithuna", "Tula"],
  Kanya: ["Vrishabha", "Makara", "Karka", "Vrishchika"],
  Tula: ["Mithuna", "Kumbha", "Simha", "Dhanu"],
  Vrishchika: ["Karka", "Meena", "Kanya", "Makara"],
  Dhanu: ["Mesha", "Simha", "Tula", "Kumbha"],
  Makara: ["Vrishabha", "Kanya", "Vrishchika", "Meena"],
  Kumbha: ["Mithuna", "Tula", "Mesha", "Dhanu"],
  Meena: ["Karka", "Vrishchika", "Vrishabha", "Makara"],
};

/**
 * Calculate Guna matching between two profiles
 * @param {Object} profile1 - First profile with astrology details
 * @param {Object} profile2 - Second profile with astrology details
 * @returns {Object} - Matching results with detailed breakdown
 */
export const calculateGunaMatching = (profile1, profile2) => {
  if (!profile1?.astrologyDetails || !profile2?.astrologyDetails) {
    throw new Error("Both profiles must have astrology details");
  }

  const astro1 = profile1.astrologyDetails;
  const astro2 = profile2.astrologyDetails;

  const nakshatra1 = NAKSHATRAS[astro1.nakshatram];
  const nakshatra2 = NAKSHATRAS[astro2.nakshatram];

  if (!nakshatra1 || !nakshatra2) {
    throw new Error("Invalid nakshatra names provided");
  }

  const results = [];
  let totalMatchedGunas = 0;

  // 1. Varna (1 point) - Based on Rashi lords
  const varnaMatch = calculateVarna(nakshatra1, nakshatra2);
  results.push({
    name: "Varna",
    points: 1,
    scored: varnaMatch ? 1 : 0,
    compatible: varnaMatch,
    description: "Caste compatibility",
  });
  if (varnaMatch) totalMatchedGunas += 1;

  // 2. Vashya (2 points) - Based on Rashi compatibility
  const vashyaMatch = calculateVashya(astro1.rashi, astro2.rashi);
  results.push({
    name: "Vashya",
    points: 2,
    scored: vashyaMatch ? 2 : 0,
    compatible: vashyaMatch,
    description: "Dominance compatibility",
  });
  if (vashyaMatch) totalMatchedGunas += 2;

  // 3. Tara (3 points) - Based on Nakshatra positions
  const taraMatch = calculateTara(astro1.nakshatram, astro2.nakshatram);
  const taraScore = taraMatch ? 3 : 0;
  results.push({
    name: "Tara",
    points: 3,
    scored: taraScore,
    compatible: taraMatch,
    description: "Birth star compatibility",
  });
  totalMatchedGunas += taraScore;

  // 4. Yoni (4 points) - Based on animal compatibility
  const yoniMatch = calculateYoni(nakshatra1.yoni, nakshatra2.yoni);
  const yoniScore =
    yoniMatch === "excellent" ? 4 : yoniMatch === "good" ? 2 : 0;
  results.push({
    name: "Yoni",
    points: 4,
    scored: yoniScore,
    compatible: yoniScore > 0,
    description: "Sexual compatibility",
  });
  totalMatchedGunas += yoniScore;

  // 5. Graha Maitri (5 points) - Based on Nakshatra lords
  const grahaMaitriMatch = calculateGrahaMaitri(
    nakshatra1.lord,
    nakshatra2.lord
  );
  const grahaMaitriScore =
    grahaMaitriMatch === "excellent" ? 5 : grahaMaitriMatch === "good" ? 3 : 0;
  results.push({
    name: "Graha Maitri",
    points: 5,
    scored: grahaMaitriScore,
    compatible: grahaMaitriScore > 0,
    description: "Mental compatibility",
  });
  totalMatchedGunas += grahaMaitriScore;

  // 6. Gana (6 points) - Based on temperament
  const ganaMatch = calculateGana(nakshatra1.gana, nakshatra2.gana);
  const ganaScore =
    ganaMatch === "excellent" ? 6 : ganaMatch === "good" ? 3 : 0;
  results.push({
    name: "Gana",
    points: 6,
    scored: ganaScore,
    compatible: ganaScore > 0,
    description: "Temperament compatibility",
  });
  totalMatchedGunas += ganaScore;

  // 7. Bhakoot (7 points) - Based on Rashi compatibility
  const bhakootMatch = calculateBhakoot(astro1.rashi, astro2.rashi);
  const bhakootScore = bhakootMatch ? 7 : 0;
  results.push({
    name: "Bhakoot",
    points: 7,
    scored: bhakootScore,
    compatible: bhakootMatch,
    description: "Love and affection",
  });
  totalMatchedGunas += bhakootScore;

  // 8. Nadi (8 points) - Based on health compatibility
  const nadiMatch = calculateNadi(nakshatra1.nadi, nakshatra2.nadi);
  const nadiScore = nadiMatch ? 8 : 0;
  results.push({
    name: "Nadi",
    points: 8,
    scored: nadiScore,
    compatible: nadiMatch,
    description: "Health and genes",
  });
  totalMatchedGunas += nadiScore;

  // Calculate final compatibility percentage
  const compatibilityPercentage = Math.round(
    (totalMatchedGunas / TOTAL_GUNAS) * 100
  );

  // Determine compatibility level
  let compatibilityLevel = "Poor";
  let recommendation = "Not recommended for marriage";

  if (compatibilityPercentage >= 80) {
    compatibilityLevel = "Excellent";
    recommendation = "Highly recommended for marriage";
  } else if (compatibilityPercentage >= 60) {
    compatibilityLevel = "Good";
    recommendation = "Recommended for marriage";
  } else if (compatibilityPercentage >= 40) {
    compatibilityLevel = "Average";
    recommendation = "Marriage possible with careful consideration";
  } else if (compatibilityPercentage >= 20) {
    compatibilityLevel = "Below Average";
    recommendation = "Marriage not recommended without remedies";
  }

  return {
    results,
    totalMatchedGunas,
    totalPossibleGunas: TOTAL_GUNAS,
    compatibilityPercentage,
    compatibilityLevel,
    recommendation,
    gunaScore: `${totalMatchedGunas}/${TOTAL_GUNAS}`,
  };
};

// Helper functions for individual Guna calculations
const calculateVarna = (nakshatra1, nakshatra2) => {
  // Simplified Varna matching based on Gana
  const varnaOrder = { Deva: 3, Manushya: 2, Rakshasa: 1 };
  return varnaOrder[nakshatra1.gana] >= varnaOrder[nakshatra2.gana];
};

const calculateVashya = (rashi1, rashi2) => {
  const compatible = RASHI_COMPATIBILITY[rashi1];
  return compatible && compatible.includes(rashi2);
};

const calculateTara = (nakshatra1, nakshatra2) => {
  // Simplified Tara calculation - in real implementation, this would be more complex
  const nakshatraList = Object.keys(NAKSHATRAS);
  const pos1 = nakshatraList.indexOf(nakshatra1);
  const pos2 = nakshatraList.indexOf(nakshatra2);
  const diff = Math.abs(pos1 - pos2);

  // Favorable Tara positions: 1, 3, 5, 7 (from each other)
  const favorableDiffs = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
  return favorableDiffs.includes(diff % 27);
};

const calculateYoni = (yoni1, yoni2) => {
  if (yoni1 === yoni2) return "excellent";

  const friendlyYonis = {
    Ashwa: ["Gaja", "Mesha"],
    Gaja: ["Ashwa", "Simha"],
    Mesha: ["Ashwa", "Vaanar"],
    Sarpa: ["Gau", "Mahisha"],
    Shwana: ["Vaanar", "Simha"],
    Marjara: ["Mushaka", "Harina"],
    Mushaka: ["Marjara", "Gau"],
    Gau: ["Mushaka", "Sarpa"],
    Mahisha: ["Sarpa", "Harina"],
    Vyaghra: ["Harina", "Nakula"],
    Harina: ["Vyaghra", "Marjara"],
    Vaanar: ["Shwana", "Mesha"],
    Nakula: ["Vyaghra", "Simha"],
    Simha: ["Nakula", "Gaja"],
  };

  if (friendlyYonis[yoni1] && friendlyYonis[yoni1].includes(yoni2)) {
    return "good";
  }

  return "poor";
};

const calculateGrahaMaitri = (lord1, lord2) => {
  if (lord1 === lord2) return "excellent";

  const friendlyPlanets = {
    Surya: ["Chandra", "Mangal", "Guru"],
    Chandra: ["Surya", "Budh"],
    Mangal: ["Surya", "Chandra", "Guru"],
    Budh: ["Surya", "Shukra"],
    Guru: ["Surya", "Chandra", "Mangal"],
    Shukra: ["Budh", "Shani"],
    Shani: ["Budh", "Shukra"],
    Rahu: ["Shukra", "Shani"],
    Ketu: ["Mangal", "Guru"],
  };

  if (friendlyPlanets[lord1] && friendlyPlanets[lord1].includes(lord2)) {
    return "good";
  }

  return "poor";
};

const calculateGana = (gana1, gana2) => {
  if (gana1 === gana2) return "excellent";

  const ganaCompatibility = {
    Deva: ["Manushya"],
    Manushya: ["Deva", "Rakshasa"],
    Rakshasa: ["Manushya"],
  };

  if (ganaCompatibility[gana1] && ganaCompatibility[gana1].includes(gana2)) {
    return "good";
  }

  return "poor";
};

const calculateBhakoot = (rashi1, rashi2) => {
  const compatible = RASHI_COMPATIBILITY[rashi1];
  return compatible && compatible.includes(rashi2);
};

const calculateNadi = (nadi1, nadi2) => {
  // Nadi should be different for good compatibility
  return nadi1 !== nadi2;
};

export default {
  calculateGunaMatching,
  GUNA_CATEGORIES,
  TOTAL_GUNAS,
  NAKSHATRAS,
};
