import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Container/Pages/Home';
import Login from './Container/Pages/Login';
import Signup from './Container/Pages/Signup';
import SignupDetailEmail from './Container/Pages/SignupDetailEmail';
import SignupDetailSocial from './Container/Pages/SignupDetailSocial';
import ChangePassword from './Container/Pages/ChangePassword';
import ForgotPassword from './Container/Pages/ForgotPassword';
import VerifyEmail from './Container/Pages/VerifyEmail';
import MyPage from './Container/Pages/MyPage';
import UserPage from './Container/Pages/UserPage';
import Settings from './Container/Pages/Settings';
import TopicDetail from './Container/Pages/TopicDetail';
import Search from './Container/Pages/Search';
import MobileSearch from './Container/Pages/MobileSearch';
import PrivacyPolicy from './Container/Pages/PrivacyPolicy';
import TermsOfService from './Container/Pages/TermsOfService';
import AskToBudy from './Container/Pages/AskToBudy';
import Page404 from './Container/Pages/Page404';
import WriteArticle from './Container/Pages/WriteArticle';
import Article from './Container/Pages/Article';
import Question from './Container/Pages/Question';
import HelpCenter from './Container/Pages/HelpCenter';

// sample common components
import Examples from './Examples';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/signup/email" component={SignupDetailEmail} />
      <Route path="/signup/social" component={SignupDetailSocial} />
      <Route path="/change-password" component={ChangePassword} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/userpage/:userId" component={UserPage} />
      <Route path="/settings" component={Settings} />
      <Route path="/topic/:topic" component={TopicDetail} />
      <Route path="/search/:search" component={Search} />
      <Route path="/m-search" component={MobileSearch} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/ask-to-budy" component={AskToBudy} />
      <Route path="/examples" component={Examples} />
      <Route path="/write-article" component={WriteArticle} />
      <Route path="/article/:postId" component={Article} />
      <Route path="/question/:postId" component={Question} />
      <Route path="/error" component={Page404} />
      <Route exact path="/helpcenter" component={HelpCenter} />
      <Route path="/helpcenter/post/:id" component={HelpCenter} />
      <Route path="/helpcenter/ask" component={HelpCenter} />
      <Route path="/helpcenter/search" component={HelpCenter} />
      <Route path="/helpcenter/:category/:section" component={HelpCenter} />
      <Route exact path="/:postType" component={Home} />
      <Route component={Page404} />
    </Switch>
  );
}

export default Routes;
