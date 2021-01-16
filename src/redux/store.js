import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import contactsReduser from './contacts/contacts-reducer';

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

export const store = createStore(
  persistReducer(contactsPersistConfig, contactsReduser),
  composeWithDevTools(),
);

export const persistor = persistStore(store);
