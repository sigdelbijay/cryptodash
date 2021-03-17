import './App.css';
import { AppLayout } from './AppLayout'
import AppBar from './AppBar'
import { AppProvider } from './AppProvider'
import WelcomeMessage from '../Settings/WelcomeMessage'
import ConfirmButton from '../Settings/ConfirmButton';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <WelcomeMessage />
        <ConfirmButton />
      </AppProvider>
    </AppLayout>
  );
}

export default App;
