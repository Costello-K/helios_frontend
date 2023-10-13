import i18n from './i18n';
const { t } = i18n.global;

// Base URL for interacting with the backend
export const BASE_URL = `http://${process.env.BACKEND_APP_HOST}:${process.env.BACKEND_APP_PORT}`

// Names for access and refresh tokens in local storage
export const NAME_ACCESS_TOKEN = 'accessToken';
export const NAME_REFRESH_TOKEN = 'refreshToken';

// Name for type social auth in local storage
export const TYPE_SOCIAL_AUTH = 'typeSocialAuth';

// Maximum avatar file size in Mb
export const LIMIT_AVATAR_SIZE = 2;
const maxFileSize = LIMIT_AVATAR_SIZE * 1024 * 1024;

// Application routes
export const ROUTER_DATA = [
  { path: '', pathToComponent: 'views/HomePage' },
  { path: 'registration', pathToComponent: 'views/UserRegistrationPage', meta: { requiresAuth: false } },
  {
    path: 'auth/users/activate/:uid/:token',
    pathToComponent: 'views/AccountConfirmActivation',
    meta: { requiresAuth: false }
  },
  { path: 'auth/users/reset/:property', pathToComponent: 'views/ResetUserData', meta: { requiresAuth: false } },
  {
    path: 'auth/users/reset_confirm/:property/:uid/:token',
    pathToComponent: 'views/ResetUserDataConfirm',
    meta: { requiresAuth: false }
  },
  { path: 'authorization', pathToComponent: 'views/UserAuthorizationPage', meta: { requiresAuth: false } },
  { path: 'users', pathToComponent: 'views/UserListPage', meta: { requiresAuth: true } },
  { path: 'users/:id', pathToComponent: 'views/UserProfilePage', meta: { requiresAuth: true } },
  { path: 'companies', pathToComponent: 'views/CompanyListPage', meta: { requiresAuth: true } },
  { path: 'companies/:id', pathToComponent: 'views/CompanyProfilePage', meta: { requiresAuth: true } },
  { path: 'about', pathToComponent: 'views/AboutPage'},
  { path: 'settings', pathToComponent: 'views/UserProfileSettingsPage', meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', pathToComponent: 'views/NotFoundPage' },
];

// Navigation items in the header for authorized user
export const HEADER_NAVBAR_AUTHORIZED_USER = [
  { path: '/users', title: 'navbar.users' },
  { path: '/companies', title: 'navbar.companies' },
];

// Dropdown menu items in the header for authorized user
export const HEADER_DROPDOWN_MENU_AUTHORIZED_USER = [
  { path: '/settings', title: 'buttons.settings' },
];

// Dropdown menu items in the header for non-authorized user
export const HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER = [
  { path: '/registration', title: 'buttons.registration' },
  { path: '/authorization', title: 'buttons.login' },
];

// Supported languages for internationalization
export const I18N_LANGUAGES = [
  { local: 'en', title: 'English' },
  { local: 'uk', title: 'Українська' },
];

// User information fields
export const USER_INFO_FIELDS = [
  { name: 'first_name', label: 'fields.firstName' },
  { name: 'last_name', label: 'fields.lastName' },
  { name: 'email', label: 'fields.email' },
];

// User information fields for my profile
export const MY_USER_INFO_FIELDS = [
  { name: 'username', label: 'fields.username' },
  ...USER_INFO_FIELDS
];

// Data for social authorization types
export const SOCIAL_AUTH_DATA = {
  google: {
    title: 'Google',
    name: 'google-oauth2',
  },
  facebook: {
    title: 'Facebook',
    name: 'facebook',
  },
};

// Form field validation rules
export const VALIDATION_RULES = {
  username: [v => !!v || t('validations.usernameRequired')],
  email: [
    v => !!v || t('validations.emailRequired'),
    v => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v)
      || t('validations.emailNotValid'),
  ],
  firstName: [v => !!v || t('validations.firstNameRequired')],
  lastName: [],
  avatar: [
    v => !v
      || !v.length
      || v[0].size <= maxFileSize
      || `${t('validations.avatarSize')} ${LIMIT_AVATAR_SIZE} Mb`,
    v => !v
      || !v.length
      || /\.(png|jpeg|jpg|PNG|JPEG|JPG)$/.test(v[0].name)
      || `${t('validations.fileExtensions')}: .png, .jpeg, .jpg`,
  ],
  password: [v => !!v || t('validations.passwordRequired')],
};

// Registration form fields
export const FIELDS_FORM_REGISTRATION = {
  username: { model: 'username', label: 'placeholders.username', type: 'text' },
  firstName: { model: 'first_name', label: 'placeholders.firstName', type: 'text' },
  lastName: { model: 'last_name', label: 'placeholders.lastName', type: 'text' },
  email: { model: 'email', label: 'placeholders.email', type: 'email' },
  password: { model: 'password', label: 'placeholders.password', type: 'password' },
  confirmPassword: { model: 'confirm_password', label: 'placeholders.confirmPassword', type: 'password' },
};

// Company information fields
export const COMPANY_INFO_FIELDS = [
  { name: 'fields.company', value: 'name' },
  { name: 'fields.owner', value: 'owner' },
];
