import { IUIAttempt, PregnancyChanceResult } from '../types';

/**
 * Calculates pregnancy chances based on IUI attempt data
 * 
 * Note: These calculations are illustrative and should be validated by medical professionals.
 * Actual pregnancy chances depend on many factors and clinical studies.
 * 
 * @param attempt The IUI attempt data
 * @returns Pregnancy chance calculation result
 */
export const calculatePregnancyChances = (attempt: IUIAttempt): PregnancyChanceResult => {
  // Start with a baseline chance (average IUI success rate is around 10-20%)
  let baseChance = 15;
  const factorBreakdown: PregnancyChanceResult['factorBreakdown'] = {};
  const recommendations: string[] = [];

  // Age factor (age significantly impacts IUI success)
  if (attempt.age <= 35) {
    factorBreakdown.age = {
      impact: 1,
      description: 'Age under 35 is favorable for IUI success'
    };
  } else if (attempt.age <= 38) {
    factorBreakdown.age = {
      impact: 0,
      description: 'Age 36-38 has average IUI success rates'
    };
  } else if (attempt.age <= 40) {
    factorBreakdown.age = {
      impact: -1,
      description: 'Age 39-40 may reduce IUI success'
    };
    recommendations.push('Consider discussing age-related fertility factors with your doctor');
  } else {
    factorBreakdown.age = {
      impact: -2,
      description: 'Age over 40 significantly impacts IUI success rates'
    };
    recommendations.push('Discuss with your doctor about age-related factors and whether IVF might be more suitable');
  }

  // Sperm count factor
  if (attempt.partnerSpermCount >= 15) {
    factorBreakdown.spermCount = {
      impact: 1,
      description: 'Normal sperm count improves chances'
    };
  } else if (attempt.partnerSpermCount >= 10) {
    factorBreakdown.spermCount = {
      impact: 0,
      description: 'Borderline sperm count'
    };
  } else {
    factorBreakdown.spermCount = {
      impact: -1,
      description: 'Low sperm count may reduce success rates'
    };
    recommendations.push('Consider sperm quality improvement strategies or discuss alternative options');
  }

  // Sperm motility factor
  if (attempt.partnerSpermMotility >= 40) {
    factorBreakdown.spermMotility = {
      impact: 1,
      description: 'Good sperm motility improves chances'
    };
  } else if (attempt.partnerSpermMotility >= 30) {
    factorBreakdown.spermMotility = {
      impact: 0,
      description: 'Average sperm motility'
    };
  } else {
    factorBreakdown.spermMotility = {
      impact: -1,
      description: 'Low sperm motility may reduce success rates'
    };
    recommendations.push('Discuss sperm motility enhancement options with your fertility specialist');
  }

  // Follicle factors
  if (attempt.follicleCount > 3) {
    factorBreakdown.follicleCount = {
      impact: 1,
      description: 'Multiple mature follicles increase chances'
    };
  } else if (attempt.follicleCount > 1) {
    factorBreakdown.follicleCount = {
      impact: 0.5,
      description: 'More than one follicle is good'
    };
  } else {
    factorBreakdown.follicleCount = {
      impact: 0,
      description: 'Single follicle provides standard chances'
    };
  }
  
  // Check follicle sizes
  const matureFolicles = attempt.follicleSize.filter(size => size >= 18).length;
  if (matureFolicles >= 2) {
    factorBreakdown.follicleSize = {
      impact: 1,
      description: 'Multiple mature follicles (≥18mm) increase chances'
    };
  } else if (matureFolicles === 1) {
    factorBreakdown.follicleSize = {
      impact: 0.5,
      description: 'One mature follicle provides good chances'
    };
  } else {
    factorBreakdown.follicleSize = {
      impact: -0.5,
      description: 'No follicles have reached optimal maturity'
    };
    recommendations.push('Discuss follicle development and timing of IUI with your doctor');
  }

  // Endometrium thickness
  if (attempt.endometriumThickness >= 8 && attempt.endometriumThickness <= 12) {
    factorBreakdown.endometriumThickness = {
      impact: 1,
      description: 'Optimal endometrial thickness (8-12mm)'
    };
  } else if (attempt.endometriumThickness >= 7) {
    factorBreakdown.endometriumThickness = {
      impact: 0,
      description: 'Adequate endometrial thickness'
    };
  } else {
    factorBreakdown.endometriumThickness = {
      impact: -1,
      description: 'Thin endometrium may reduce implantation chances'
    };
    recommendations.push('Discuss endometrial lining optimization strategies with your doctor');
  }

  // Previous IUI attempts
  if (attempt.previousIUIAttempts === 0) {
    factorBreakdown.previousAttempts = {
      impact: 0,
      description: 'First IUI attempt'
    };
  } else if (attempt.previousIUIAttempts < 3) {
    factorBreakdown.previousAttempts = {
      impact: 0.5,
      description: 'Early IUI attempts often have better success rates'
    };
  } else if (attempt.previousIUIAttempts < 6) {
    factorBreakdown.previousAttempts = {
      impact: -0.5,
      description: 'Multiple previous attempts may indicate underlying issues'
    };
    recommendations.push('Consider consulting your doctor about next steps if this attempt is unsuccessful');
  } else {
    factorBreakdown.previousAttempts = {
      impact: -1,
      description: 'Success rates typically decline after 6+ attempts'
    };
    recommendations.push('Discuss with your doctor whether continuing with IUI is the best approach');
  }

  // BMI factor
  if (attempt.bmi >= 18.5 && attempt.bmi <= 24.9) {
    factorBreakdown.bmi = {
      impact: 0.5,
      description: 'Normal BMI range is optimal for fertility'
    };
  } else if ((attempt.bmi >= 17 && attempt.bmi < 18.5) || (attempt.bmi > 24.9 && attempt.bmi <= 29.9)) {
    factorBreakdown.bmi = {
      impact: -0.5,
      description: 'BMI slightly outside optimal range'
    };
    recommendations.push('Consider lifestyle adjustments to optimize BMI if possible');
  } else {
    factorBreakdown.bmi = {
      impact: -1,
      description: 'BMI significantly outside optimal range may impact success'
    };
    recommendations.push('Discuss weight management strategies with your healthcare provider');
  }

  // Calculate overall chance based on base chance and factors
  let modifierSum = Object.values(factorBreakdown).reduce((sum, factor) => sum + factor.impact, 0);
  let overallChance = baseChance + (modifierSum * 2.5); // Each impact point is worth about 2.5% chance

  // Ensure the chance stays within reasonable bounds
  overallChance = Math.max(Math.min(overallChance, 40), 3); // Cap between 3% and 40%

  // Add general recommendations if needed
  if (recommendations.length === 0) {
    recommendations.push('Continue with your current treatment plan');
  }
  
  recommendations.push('Maintain a healthy lifestyle with proper nutrition and stress management');
  recommendations.push('Always consult with your fertility specialist for personalized advice');

  return {
    overallChance: parseFloat(overallChance.toFixed(1)),
    factorBreakdown,
    recommendations
  };
}; 