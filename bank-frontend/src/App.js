import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AccountDetails from "./components/AccountDetails";
import AccountHistory from "./components/AccountHistory";
import SendMoney from "./components/SendMoney";
import DepositMoney from "./components/DepositMoney";
import WithdrawMoney from "./components/WithdrawMoney";
import PrivateRoute from "./utils/PrivateRoute";
import RecoverAccount from "./components/RecoverAccount"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <div className="backgroundimg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path ="/recoveracc" element ={<RecoverAccount/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/details"
            element={
              <PrivateRoute>
                <AccountDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <AccountHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendMoney />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <PrivateRoute>
                <DepositMoney />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <WithdrawMoney />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
