import { config } from 'dotenv';
config();

import '@/ai/flows/product-comparison.ts';
import '@/ai/flows/skin-condition-diagnosis.ts';
import '@/ai/flows/skin-nutrition-flow.ts';
import '@/ai/flows/anti-aging-flow.ts';
import '@/ai/flows/onboarding-flow.ts';
import '@/ai/flows/conversational-diagnosis-flow.ts';
import '@/ai/flows/catalog-flow.ts';
import '@/ai/tools/product-catalog-tool.ts';
import '@/ai/flows/tts-flow.ts';
