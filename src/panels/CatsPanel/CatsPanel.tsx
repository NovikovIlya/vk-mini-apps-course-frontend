import { useState, useMemo } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Group,
  Div,
  Placeholder,
  Search,
  Spacing
} from '@vkontakte/vkui';
import { Icon28TuneOutline, Icon56SearchOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import CatCard from '../../components/CatCard';
import { catBreeds } from '../../data/catBreeds';
import { CatBreed, FilterCriteria } from '../../types/cats';
import styles from './CatsPanel.module.css';

interface Props {
  id: string;
}

const CatsPanel = ({ id }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({});
  const routeNavigator = useRouteNavigator();

  const filteredBreeds = useMemo(() => {
    let result = catBreeds;

    // Поиск по названию
    if (searchValue) {
      result = result.filter(breed =>
        breed.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        breed.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Фильтрация по характеристикам
    result = result.filter(breed => {
      // Проверяем размер
      if (filters.size && filters.size.length > 0) {
        if (!filters.size.includes(breed.size)) {
          return false;
        }
      }

      // Проверяем характеристики (допускаем отклонение ±1)
      const characteristics = Object.keys(filters).filter(key => key !== 'size') as Array<keyof FilterCriteria>;
      
      for (const char of characteristics) {
        const filterValue = filters[char];
        const breedValue = breed.characteristics[char as keyof typeof breed.characteristics];
        
        if (filterValue !== undefined && breedValue !== undefined) {
          if (Math.abs(breedValue - filterValue) > 1) {
            return false;
          }
        }
      }

      return true;
    });

    return result;
  }, [searchValue, filters]);

  const openFilters = () => {
    void routeNavigator.push('/filters');
  };

  const openCatDetail = (breed: CatBreed) => {
    void routeNavigator.push(`/cat/${breed.id}`);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <Panel id={id}>
      <PanelHeader
        after={
          <PanelHeaderButton onClick={openFilters}>
            <Icon28TuneOutline />
          </PanelHeaderButton>
        }
      >
        Породы кошек
      </PanelHeader>

      <Group>
        <Div>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск породы..."
          />
        </Div>
      </Group>

      {hasActiveFilters && (
        <Group>
          <Div className={styles.filtersInfo}>
            Применены фильтры • Найдено: {filteredBreeds.length}
          </Div>
        </Group>
      )}

      <Group>
        <Div>
          {filteredBreeds.length === 0 ? (
            <Placeholder
              icon={<Icon56SearchOutline />}
              header="Породы не найдены"
            >
              Попробуйте изменить параметры поиска или фильтры
            </Placeholder>
          ) : (
            <div className={styles.breedsGrid}>
              {filteredBreeds.map(breed => (
                <CatCard
                  key={breed.id}
                  breed={breed}
                  onClick={() => openCatDetail(breed)}
                />
              ))}
            </div>
          )}
        </Div>
      </Group>

      <Spacing size={20} />
    </Panel>
  );
};

export default CatsPanel;