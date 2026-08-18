export interface AnalysisResponse {
  analysis_id: string;
  image_filename: string;
  symptoms: string;
  status: string;
  message: string;
  visual_observations: string[];
  possible_conditions: string[];
  confidence: string | null;
  recommendations: string[];
  seek_professional_help: boolean;
  disclaimer: string;
}