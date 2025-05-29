import * as validateParamId from './validateParamId';
import * as handleControllerResults from './handleControllerResult';

export const UtilsValidation = {
  ...validateParamId,
  ...handleControllerResults,
};
