import { useContext, useEffect, useState, useMemo } from 'react';
import { View, Epic, SplitLayout, SplitCol, ModalRoot, ModalPage } from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  usePopout,
  useParams,
} from '@vkontakte/vk-mini-apps-router';
import '@vkontakte/vkui/dist/vkui.css';

import CatsPanel from './panels/CatsPanel';
import FiltersPanel from './panels/FiltersPanel';
import CatDetailModal from './components/CatDetailModal';
import { FiltersProvider } from './context/FiltersContext';
import { catBreeds } from './data/catBreeds';

import styles from './App.module.css';

const App = () => {
  const { panel: activePanel = 'cats', modal: activeModal } =
    useActiveVkuiLocation();
  const routerPopout = usePopout();
  const params = useParams<'id'>();

  const selectedBreed = useMemo(() => {
    if (params?.id) {
      return catBreeds.find(breed => breed.id === parseInt(params.id));
    }
    return null;
  }, [params?.id]);

  const onModalClose = () => {
    // Логика закрытия модального окна будет обрабатываться роутером
  };

  return (
    <FiltersProvider>
      <SplitLayout 
        modal={
          <ModalRoot activeModal={activeModal} onClose={onModalClose}>
            <ModalPage id="cat-detail" onClose={onModalClose}>
              {selectedBreed && (
                <CatDetailModal breed={selectedBreed} onClose={onModalClose} />
              )}
            </ModalPage>
          </ModalRoot>
        } 
        popout={routerPopout}
      >
        <SplitCol className={styles.col}>
          <View activePanel={activePanel}>
            <CatsPanel id="cats" />
            <FiltersPanel id="filters" />
          </View>
        </SplitCol>
      </SplitLayout>
    </FiltersProvider>
  );
};

export default App;
