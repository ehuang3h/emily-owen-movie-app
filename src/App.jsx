import { Provider } from 'react-redux';
import { store } from './store/store.js';
import AppRouter from './routers/AppRouter';

function App() {
  return (
    <>
    <Provider store={store}>
      <AppRouter />
    </Provider>
    </>
  )
}

export default App
