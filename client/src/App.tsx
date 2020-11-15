import './App.css';
import { Button, Divider, Layout, Menu, PageHeader } from 'antd';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import EmployeeSidebar from './components/EmployeeSidebar';
import PageAdminEmployees from './pages/PageAdminEmployees';
import PageAdminReviews from './pages/PageAdminReviews';
import PageEmployeeReviews from './pages/PageEmployeeReviews';

const { Header, Content, Footer, Sider } = Layout;

const routes = [
  {
    path: "/admin/employees",
    exact: true,
    sidebar: () => <AdminSidebar />,
    header: "Admin",
    main: () => <PageAdminEmployees />,
  },
  {
    path: "/admin/reviews",
    exact: true,
    sidebar: () => <AdminSidebar />,
    header: "Admin",
    main: () => <PageAdminReviews />,
  },
  {
    path: "/employee/:id/reviews",
    exact: true,
    sidebar: () => <EmployeeSidebar />,
    header: "Employee",
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
            height: "100%",
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
            <span style={{ fontWeight: 600, color: "#ff3333" }}>PayPay</span>
            <br />
            <span>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<span> {route.header}</span>}
                  />
                ))}
              </Switch>
            </span>
          </div>
          <Divider></Divider>
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
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              minHeight: "calc(100vh - 70px - 24px)",
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
          <Footer>
            <span style={{ fontWeight: 600 }}>PayPay</span>
            <span style={{ fontWeight: 300 }}>
              {" "}
              - Full Stack Developer Challenge 2020
            </span>
          </Footer>
        </Layout>
      </Layout>
      <Switch>
        <Route path="/admin/employees" />
        <Route path="/admin/reviews" />
        <Route path="/employee/:id/reviews" />
        <Route component={() => <Redirect to="/admin/employees" />} />
      </Switch>
    </Router>
  );
}

export default App;
