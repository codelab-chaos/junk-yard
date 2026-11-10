import { ELSEWHERE_MODELS } from './models-elsewhere';
import { IMAGE_MODELS } from './models-image';
import { OTHER_MODELS } from './models-other';
import { VIDEO_MODELS } from './models-video';
import type { Model } from './types';

export const MODELS: Model[] = [...IMAGE_MODELS, ...VIDEO_MODELS, ...OTHER_MODELS, ...ELSEWHERE_MODELS];
