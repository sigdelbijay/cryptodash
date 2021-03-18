import './App.css';
import { AppLayout } from './AppLayout'
import AppBar from './AppBar'
import { AppProvider } from './AppProvider'
import Content from '../Shared/Content'
import Settings from '../Settings/Settings';

function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <Settings/>
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
