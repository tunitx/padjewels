/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
// import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PaymentChange from "./pages/PaymentChange";
import Subcategories from "./components/Subcategories";
import Main from "./components/layout/Main";
import Orders from "./components/chart/OrderTable";
import Carts from "./components/Carts";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Product from "./pages/Product";
import SalesReportPage from "./pages/Sales";
import Category from "./pages/Category";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} /> */}
        {/* <Route path="/sign-in" exact component={SignIn} /> */}
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          {/* <Route exact path="/billing" component={Billing} /> */}
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sales" component={SalesReportPage} />
          <Route exact path="/subcategories" component={Subcategories} />
          <Route exact path="/category" component={Category} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/payment" component={PaymentChange} />
          <Route exact path="/carts" component={Carts} />
          {/* <Redirect from="*" to="/dashboard" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
