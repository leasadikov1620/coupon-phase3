import { BrowserRouter } from "react-router-dom";

import ClientRouting from "../../clientRouting/clientRouting";
import "./mainLayout.css";
import MyFooter from "./myFooter/myFooter";
import MyHeader from "./myHeader/myHeader";
import MyMain from "./myMain/myMain";
import MyMenu from "./myMenu/myMenu";

function MainLayout(): JSX.Element {
    return (
        <div className="mainLayout">
            <BrowserRouter>
            	{/* <header>
                <MyHeader/>
            </header> */}
            {/* <aside>
                <MyMenu/>
            </aside> */}
            <main>
            <MyHeader/>
                <ClientRouting/>
            </main>
            <footer>
                <MyFooter/>
            </footer>
            </BrowserRouter>
		
        </div>
    );
}

export default MainLayout;
