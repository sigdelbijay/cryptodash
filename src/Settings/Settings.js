import Page from '../Shared/Page'
import CoinGrid from './CoinGrid'
import ConfirmButton from './ConfirmButton'
import WelcomeMessage from './WelcomeMessage'
export default function Settings() {
  return <Page name="settings">
    <WelcomeMessage />
    <CoinGrid topSection/>
    <ConfirmButton />
    <CoinGrid/>
  </Page>
}