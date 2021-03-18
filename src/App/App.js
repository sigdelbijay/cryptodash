import './App.css';
import { AppLayout } from './AppLayout'
import AppBar from './AppBar'
import { AppProvider } from './AppProvider'
import WelcomeMessage from '../Settings/WelcomeMessage'
import ConfirmButton from '../Settings/ConfirmButton';
import Page from '../Shared/Page'

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Page name="settings">
          <WelcomeMessage />
          <ConfirmButton />
        </Page>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
