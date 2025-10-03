import React, { useState, useEffect, type JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSuggestions } from '../services/mockAPI';
import { type Suggestion } from '../types';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const {
    data: suggestions = [],
    isLoading,
  } = useQuery({
    queryKey: ['suggestions', debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    setDebouncedQuery(suggestion.text);
  };

  const NoSuggestions: JSX.Element = (
    <div className="no-suggestions">
      No suggestions found for "{debouncedQuery}"
    </div>
  );

  const getSuggestions = () => {
    return suggestions.map((suggestion) => (
      <div
        key={suggestion.id}
        onClick={() => handleSuggestionClick(suggestion)}
        className="suggestion-item"
      >
        <div className="suggestion-text">
          {suggestion.text}
        </div>
        <div className="suggestion-category">
          {suggestion.category}
        </div>
      </div>
    ));
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />

      {/* Loading */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner" />
        </div>
      )}

      {/* Suggestions */}
      {debouncedQuery.trim().length > 0 && !isLoading && (
        <div className="suggestions-dropdown">
          {suggestions.length === 0 ? NoSuggestions : getSuggestions()}
        </div>
      )}
    </div>
  );
};

export default SearchBar;