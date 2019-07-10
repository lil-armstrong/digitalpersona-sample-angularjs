import ng from 'angular';
import route from 'angular-route';

import auth from './tokens/auth.module';
import enroll from './tokens/enroll.module';

import routes from './routes';

import IdentityService from './identity.service';
import UserApiService from './user.service';

import profileNav from './nav/profileNav';
import userInfo from './userInfo/userInfo';
import userCredentials from './userCredentials/userCredentials';
import signin from './signin/signin';
import signup from './signup/signup';

export default ng.module('example.profile', [
    route,
    auth,
    enroll,
])
.config(routes)
.service('Identity', IdentityService)
.service("UserApi", UserApiService)
.component('profileNav', profileNav.Component)
.component('userInfo', userInfo.Component)
.component('userCredentials', userCredentials.Component)
.component('signin', signin.Component)
.component('signup', signup.Component)
.name;

export { IdentityService };