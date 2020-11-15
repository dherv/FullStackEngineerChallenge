import "./App.css";
import { Layout, Menu } from "antd";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import EmployeeSidebar from "./components/EmployeeSidebar";
import PageAdminEmployees from "./pages/PageAdminEmployees";
import PageAdminReviews from "./pages/PageAdminReviews";
import PageEmployeeReviews from "./pages/PageEmployeeReviews";

const { Header, Content, Footer, Sider } = Layout;

const routes = [
  {
    path: "/admin/employees",
    exact: true,
    sidebar: () => <AdminSidebar />,
    header: () => <h2>employees</h2>,
    main: () => <PageAdminEmployees />,
  },
  {
    path: "/admin/reviews",
    exact: true,
    sidebar: () => <AdminSidebar />,
    header: () => <h2>reviews</h2>,
    main: () => <PageAdminReviews />,
  },
  {
    path: "/employee/:id/reviews",
    exact: true,
    sidebar: () => <EmployeeSidebar />,
    header: () => <h2>employee</h2>,
    main: () => <PageEmployeeReviews />,
  },
];

function App() {
  return (
    <Router>
      <Layout>
        <Sider
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div
            style={{
              height: 32,
              background: "rgba(255, 255, 255, 0.2)",
              margin: 16,
            }}
          >
            PayPay
          </div>
          <Menu>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.sidebar />}
                />
              ))}
            </Switch>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.header />}
                />
              ))}
            </Switch>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              minHeight: "100vh",
            }}
          >
            <div className="site-layout-background" style={{ padding: 24 }}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                  />
                ))}
              </Switch>
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
