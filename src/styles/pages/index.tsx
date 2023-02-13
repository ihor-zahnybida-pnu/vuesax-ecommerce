import Page from './../../components/layout/page/page'
import Sidebar from "./../../components/templates/sidebar.component";
const Index = () => {
  return <Page sidebar={<Sidebar />} content={<div>Index</div>} ></Page>
}

export default Index;
