// Compatibility calculation helpers
// Ensures all compatibility percentages are calculated as: (matched gunas / 36) * 100

/**
 * Calculate compatibility percentage from Guna score
 * @param {string} gunaScore - Format "matched/total" e.g., "28/36"
 * @returns {number} - Compatibility percentage rounded to nearest integer
 */
export const calculateCompatibilityFromGunaScore = (gunaScore) => {
  if (!gunaScore || typeof gunaScore !== "string") {
    return 0;
  }

  const [matched, total] = gunaScore.split("/").map(Number);

  if (!matched || !total || total !== 36) {
    console.warn(
      `Invalid Guna score format: ${gunaScore}. Expected format: "matched/36"`
    );
    return 0;
  }

  return Math.round((matched / 36) * 100);
};

/**
 * Create Guna score string from matched gunas
 * @param {number} matchedGunas - Number of matched gunas (0-36)
 * @returns {string} - Guna score in format "matched/36"
 */
export const createGunaScore = (matchedGunas) => {
  if (
    typeof matchedGunas !== "number" ||
    matchedGunas < 0 ||
    matchedGunas > 36
  ) {
    console.warn(
      `Invalid matched gunas: ${matchedGunas}. Must be between 0 and 36.`
    );
    return "0/36";
  }

  return `${matchedGunas}/36`;
};

/**
 * Get compatibility level from percentage
 * @param {number} percentage - Compatibility percentage (0-100)
 * @returns {string} - Compatibility level description
 */
export const getCompatibilityLevel = (percentage) => {
  if (percentage >= 80) return "Excellent";
  if (percentage >= 60) return "Good";
  if (percentage >= 40) return "Average";
  if (percentage >= 20) return "Below Average";
  return "Poor";
};

/**
 * Get compatibility color class for UI
 * @param {number} percentage - Compatibility percentage (0-100)
 * @returns {string} - CSS color class
 */
export const getCompatibilityColor = (percentage) => {
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-blue-600";
  if (percentage >= 40) return "text-yellow-600";
  if (percentage >= 20) return "text-orange-600";
  return "text-red-600";
};

/**
 * Get marriage recommendation based on compatibility
 * @param {number} percentage - Compatibility percentage (0-100)
 * @returns {string} - Marriage recommendation
 */
export const getMarriageRecommendation = (percentage) => {
  if (percentage >= 80) return "Highly recommended for marriage";
  if (percentage >= 60) return "Recommended for marriage";
  if (percentage >= 40) return "Marriage possible with careful consideration";
  if (percentage >= 20) return "Marriage not recommended without remedies";
  return "Not recommended for marriage";
};

/**
 * Validate and correct compatibility data
 * @param {Object} matchData - Match data with compatibility and gunaScore
 * @returns {Object} - Corrected match data
 */
export const validateMatchData = (matchData) => {
  const { compatibility, gunaScore } = matchData;

  if (gunaScore) {
    // If we have a Guna score, calculate compatibility from it
    const calculatedCompatibility =
      calculateCompatibilityFromGunaScore(gunaScore);

    if (Math.abs(compatibility - calculatedCompatibility) > 2) {
      console.warn(
        `Compatibility mismatch: ${compatibility}% vs calculated ${calculatedCompatibility}% from Guna score ${gunaScore}`
      );
    }

    return {
      ...matchData,
      compatibility: calculatedCompatibility,
      compatibilityLevel: getCompatibilityLevel(calculatedCompatibility),
      recommendation: getMarriageRecommendation(calculatedCompatibility),
    };
  }

  return matchData;
};

export default {
  calculateCompatibilityFromGunaScore,
  createGunaScore,
  getCompatibilityLevel,
  getCompatibilityColor,
  getMarriageRecommendation,
  validateMatchData,
};
