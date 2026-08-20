export interface PossibleCondition {
  name: string;
  reason: string;
}

export interface Reference {
  title: string;
  source: string;
  url: string;
}

export interface AnalysisResponse {
  analysis_id: string;
  image_filename: string;
  symptoms: string;
  status: string;
  message: string;

  image_quality: string;

  visual_observations: string[];
  uncertainties: string[];

  possible_conditions: PossibleCondition[];
  confidence: string | null;

  recommendations: string[];

  seek_professional_help: boolean;

  disclaimer: string;

  references: Reference[];

  skin_score: number;
  skin_level: string;
}

