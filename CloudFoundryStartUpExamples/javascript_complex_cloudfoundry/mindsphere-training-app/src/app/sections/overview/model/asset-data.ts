import { VariableElement } from './variable-element';

export interface AssetData {
// Name of the asset. Shown as headline
  name: string;

  // Description of the asset shown as subheadline
  description: string;

  // List of variables and their values shown as table
  variables: VariableElement[];
}
