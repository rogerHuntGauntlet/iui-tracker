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