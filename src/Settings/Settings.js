import Page from '../Shared/Page'
import CoinGrid from './CoinGrid'
import ConfirmButton from './ConfirmButton'
import WelcomeMessage from './WelcomeMessage'
import Search from './Search'
export default function Settings() {
  return <Page name="settings">
    <WelcomeMessage />
    <CoinGrid topSection/>
    <ConfirmButton />
    <Search />
    <CoinGrid/>
  </Page>
}