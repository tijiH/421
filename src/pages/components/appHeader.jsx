import { TabView, TabPanel } from 'primereact/tabview';

const AppHeader = () => {
    return (
        <div className="header">
            <h1 className="header-title">421</h1>
            <p className="header-by mr-2 mt-5">by Kush Crew</p>
            {/* <TabView>
                <TabPanel header="Jeu"></TabPanel>
                <TabPanel header="Score"></TabPanel>
            </TabView> */}
        </div>
    );
}

export default AppHeader;