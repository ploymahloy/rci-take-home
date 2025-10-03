import { type Suggestion } from '../types';

const mockSuggestions: Suggestion[] = [
  { id: '1', text: 'React Query', category: 'Library' },
  { id: '2', text: 'React Hooks', category: 'Concept' },
  { id: '3', text: 'TypeScript', category: 'Language' },
  { id: '4', text: 'JavaScript', category: 'Language' },
  { id: '5', text: 'Node.js', category: 'Runtime' },
  { id: '6', text: 'Vite', category: 'Build Tool' },
  { id: '7', text: 'ESLint', category: 'Tool' },
  { id: '8', text: 'Prettier', category: 'Tool' },
  { id: '9', text: 'Webpack', category: 'Build Tool' },
  { id: '10', text: 'CSS', category: 'Language' },
  { id: '11', text: 'HTML', category: 'Language' },
  { id: '12', text: 'API', category: 'Concept' },
  { id: '13', text: 'REST', category: 'Architecture' },
  { id: '14', text: 'GraphQL', category: 'Query Language' },
  { id: '15', text: 'Database', category: 'Concept' },
];

export const fetchSuggestions = (query: string): Suggestion[] => {
  
  if (!query.trim()) {
    return [];
  }
  
  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.category.toLowerCase().includes(query.toLowerCase())
  );
  
  return filteredSuggestions.slice(0, 5);
};
