import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  const location = useLocation();
  return (
    <div className="">
      <AnimateSharedLayout>
        <AnimatePresence>
      <Switch location={ location } key={ location.key }>
        <Route exact path="/trybe-19-trivia" component={ Login } />
        <Route exact path="/trivia" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route path="*" component={ Login } />
      </Switch>
      </AnimatePresence>

      </AnimateSharedLayout>
    </div>
  );
}