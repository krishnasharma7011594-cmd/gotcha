'use server';

/**
 * @fileOverview This file defines the AI Chat Assistant flow, which provides an optional AI assistant
 * within the chat page to help users with quick answers and information.
 *
 * @exports aiChatAssistant - The main function to interact with the AI chat assistant.
 * @exports AIChatAssistantInput - The input type for the aiChatAssistant function.
 * @exports AIChatAssistantOutput - The output type for the aiChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  query: z.string().describe('The user query for the AI chat assistant.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  response: z.string().describe('The AI chat assistant response to the user query.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI chat assistant. Answer the following user query: {{{query}}}`,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
