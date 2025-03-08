/**
 * Types for the IUI Tracker Application
 */

/**
 * IUI Attempt interface - represents a single IUI procedure attempt
 */
export interface IUIAttempt {
  id: string;
  date: string;
  age: number;
  partnerSpermCount: number;
  partnerSpermMotility: number;
  follicleCount: number;
  follicleSize: number[];  // sizes in mm
  endometriumThickness: number;
  medicationsUsed: string[];
  previousPregnancies: number;
  previousMiscarriages: number;
  previousIUIAttempts: number;
  bmi: number;
  amhLevel?: number;  // Anti-Müllerian hormone level (optional)
  notes: string;
  outcome?: 'positive' | 'negative' | 'unknown';
  outcomeDate?: string;
  // New fields for additional success factors
  preOvulationMedication: boolean;
  ovulationTriggerShot: boolean;
  hormoneMedication: boolean;
  endometriosis: boolean;
  pcos: boolean;
  blockedTubes: boolean;
  successProbability?: number;
}

/**
 * User Profile
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  attempts: IUIAttempt[];
}

/**
 * Pregnancy Chance Calculation Result
 */
export interface PregnancyChanceResult {
  overallChance: number;  // 0-100%
  factorBreakdown: {
    [key: string]: {
      impact: number;  // -3 to +3 scale
      description: string;
    }
  };
  recommendations: string[];
}

export type IUICalculatorInput = {
  age: number;
  spermCount: number;
  spermMotility: number;
  follicleCount: number;
  endometriumThickness: number;
  bmi: number;
};

export const calculateIUISuccess = (attempt: IUIAttempt): number => {
  // Base success rate
  let baseRate = 0.15;

  // Age factor
  if (attempt.age <= 35) baseRate *= 1.2;
  else if (attempt.age > 40) baseRate *= 0.6;

  // Sperm quality factors
  if (attempt.partnerSpermCount > 15) baseRate *= 1.2;
  if (attempt.partnerSpermMotility > 40) baseRate *= 1.2;

  // Follicle factors
  baseRate *= (1 + (attempt.follicleCount * 0.1));

  // Medical conditions
  if (attempt.endometriosis) baseRate *= 0.8;
  if (attempt.pcos) baseRate *= 0.9;
  if (attempt.blockedTubes) baseRate *= 0.7;

  // Medications
  if (attempt.medicationsUsed.length > 0) baseRate *= 1.2;

  // Ensure the probability is between 0 and 1
  return Math.min(Math.max(baseRate, 0), 1);
}; 