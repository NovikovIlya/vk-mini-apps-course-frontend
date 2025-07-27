import { useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormItem,
  Slider,
  Checkbox,
  Button,
  Div,
  Spacing,
  FormLayoutGroup
} from '@vkontakte/vkui';
import { FilterCriteria } from '../../types/cats';
import styles from './FilterPanel.module.css';

interface Props {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  onClose: () => void;
}

const FilterPanel = ({ filters, onFiltersChange, onClose }: Props) => {
  const [localFilters, setLocalFilters] = useState<FilterCriteria>(filters);

  const handleSliderChange = (key: keyof FilterCriteria, value: number) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setLocalFilters(prev => {
      const currentSizes = prev.size || [];
      if (checked) {
        return {
          ...prev,
          size: [...currentSizes, size]
        };
      } else {
        return {
          ...prev,
          size: currentSizes.filter(s => s !== size)
        };
      }
    });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const emptyFilters: FilterCriteria = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    onClose();
  };

  return (
    <Panel>
      <PanelHeader before={<PanelHeaderBack onClick={onClose} />}>
        Фильтры
      </PanelHeader>
      
      <Group header="Характеристики">
        <FormLayoutGroup>
          <FormItem top="Энергичность">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.energy || 3}
              onChange={(value) => handleSliderChange('energy', value)}
            />
          </FormItem>
          
          <FormItem top="Дружелюбие">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.friendliness || 3}
              onChange={(value) => handleSliderChange('friendliness', value)}
            />
          </FormItem>
          
          <FormItem top="Игривость">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.playfulness || 3}
              onChange={(value) => handleSliderChange('playfulness', value)}
            />
          </FormItem>
          
          <FormItem top="Дружелюбие к детям">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.childFriendly || 3}
              onChange={(value) => handleSliderChange('childFriendly', value)}
            />
          </FormItem>
          
          <FormItem top="Независимость">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.independence || 3}
              onChange={(value) => handleSliderChange('independence', value)}
            />
          </FormItem>
          
          <FormItem top="Уход за шерстью">
            <Slider
              step={1}
              min={1}
              max={5}
              value={localFilters.grooming || 3}
              onChange={(value) => handleSliderChange('grooming', value)}
            />
          </FormItem>
        </FormLayoutGroup>
      </Group>
      
      <Group header="Размер">
        <FormLayoutGroup>
          <FormItem>
            <Checkbox
              checked={localFilters.size?.includes('small') || false}
              onChange={(e) => handleSizeChange('small', e.target.checked)}
            >
              Маленький
            </Checkbox>
          </FormItem>
          <FormItem>
            <Checkbox
              checked={localFilters.size?.includes('medium') || false}
              onChange={(e) => handleSizeChange('medium', e.target.checked)}
            >
              Средний
            </Checkbox>
          </FormItem>
          <FormItem>
            <Checkbox
              checked={localFilters.size?.includes('large') || false}
              onChange={(e) => handleSizeChange('large', e.target.checked)}
            >
              Большой
            </Checkbox>
          </FormItem>
        </FormLayoutGroup>
      </Group>
      
      <Div>
        <Spacing size={16} />
        <Button size="l" stretched onClick={applyFilters}>
          Применить фильтры
        </Button>
        <Spacing size={8} />
        <Button size="l" stretched mode="secondary" onClick={resetFilters}>
          Сбросить фильтры
        </Button>
      </Div>
    </Panel>
  );
};

export default FilterPanel;