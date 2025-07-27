import { createContext, useState, ReactNode } from 'react';
import { FilterCriteria } from '../types/cats';

interface FiltersContextType {
  filters: FilterCriteria;
  setFilters: (filters: FilterCriteria) => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  filters: {},
  setFilters: () => {}
});

interface Props {
  children: ReactNode;
}

export const FiltersProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState<FilterCriteria>({});

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};