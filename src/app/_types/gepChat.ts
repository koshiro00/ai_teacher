export type GPTMessages = {
  role: 'assistant' | 'user' | 'system';
  content: string;
}[];
