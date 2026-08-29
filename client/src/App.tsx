/**
 * IMPORTANT DEVELOPMENT GUIDELINE: 
 * DO NOT REMOVE ANY FEATURES, COMPONENTS, OR FUNCTIONALITY WITHOUT EXPLICIT APPROVAL.
 * Always get permission before removing or replacing anything in the codebase.
 * See DEVELOPMENT_GUIDELINES.md for more details.
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Violations from "@/pages/Violations";
import ReportIssue from "@/pages/ReportIssue";
import Buildings from "@/pages/Buildings";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Search from "@/pages/Search";
import Upload from "@/pages/Upload";
import BuildingMap from "@/pages/BuildingMap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/violations" component={Violations} />
          <Route path="/report" component={ReportIssue} />
          <Route path="/buildings" component={Buildings} />
          <Route path="/resources" component={Resources} />
          <Route path="/about" component={About} />
          <Route path="/search" component={Search} />
          <Route path="/upload" component={Upload} />
          <Route path="/map" component={BuildingMap} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
