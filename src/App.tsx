import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from "./components/SearchBar";
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <h1 className="app-title">
          Search Suggestions Demo
        </h1>
        <SearchBar />
      </div>
    </QueryClientProvider>
  )
}

export default App;
