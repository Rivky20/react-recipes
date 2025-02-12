import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { myStore } from './components/redux/store'; 
const App = () => {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
};
export default App;