import i18n from './i18n';
const { t } = i18n.global;

// Base URL for interacting with the backend
export const BASE_URL = process.env.BACKEND_APP_URL

export const MIN_COUNT_QUIZ_ANSWERS = 2;
export const MIN_COUNT_QUIZ_QUESTIONS = 2;

export const NUMBER_OF_RATING_STARS = 5;

export const EXPORT_FILE_FORMAT = [
  { format: 'json' },
  { format: 'csv' },
];

export const REQUEST_STATUS = {
  pending: 'PENDING',
  approved: 'APPROVED',
  rejected: 'REJECTED',
  cancelled: 'CANCELLED',
}

export const INVITATION_STATUS = {
  pending: 'PENDING',
  accepted: 'ACCEPTED',
  declined: 'DECLINED',
  revoked: 'REVOKED',
}

export const NOTIFICATION_STATUS = {
  sent: 'SENT',
  viewed: 'VIEWED',
};

// Names for access and refresh tokens in local storage
export const NAME_ACCESS_TOKEN = 'accessToken';
export const NAME_REFRESH_TOKEN = 'refreshToken';

// Name for type social auth in local storage
export const TYPE_SOCIAL_AUTH = 'typeSocialAuth';

// Maximum file size in Mb
export const LIMIT_AVATAR_SIZE = 4;
const maxFileSize = LIMIT_AVATAR_SIZE * 1024 * 1024;
export const LIMIT_EXCEL_FILE_SIZE = 0.5;
const maxExcelFileSize = LIMIT_EXCEL_FILE_SIZE * 1024 * 1024;

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
  {
    path: 'users/:id/notifications',
    pathToComponent: 'views/NotificationListPage',
    meta: { requiresAuth: true }
  },
  { path: 'companies', pathToComponent: 'views/CompanyListPage', meta: { requiresAuth: true } },
  { path: 'companies/:id', pathToComponent: 'views/CompanyProfilePage', meta: { requiresAuth: true } },
  {
    path: 'companies/:companyId/quizzes/:quizId',
    pathToComponent: 'views/QuizPage',
    meta: { requiresAuth: true },
  },
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

export const USER_QUIZ_RESULT_TIME_FIELDS = [
  { name: 'created_at', label: 'fields.startTime' },
  { name: 'updated_at', label: 'fields.completeTime' },
];

export const USER_QUIZ_RESULT_INFO_FIELDS = [
  { name: 'correct_answers', label: 'fields.correctAnswers' },
  { name: 'total_questions', label: 'fields.totalQuestions' },
  { name: 'company_average_score', label: 'fields.companyAverageScore' },
  { name: 'user_rating', label: 'fields.rating' },
  { name: 'progress_status', label: 'fields.status' },
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
  new_username: [v => !!v || t('validations.usernameRequired')],
  email: [
    v => !!v || t('validations.emailRequired'),
    v => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v)
      || t('validations.emailNotValid'),
  ],
  first_name: [v => !!v || t('validations.firstNameRequired')],
  name: [v => !!v || t('validations.nameRequired')],
  title: [v => !!v || t('validations.nameRequired')],
  text: [v => !!v || t('validations.answerRequired')],
  question_text: [v => !!v || t('validations.questionTextRequired')],
  description: [v => !!v || t('validations.descriptionRequired')],
  frequency: [v => !v || /^[1-9]\d*$/.test(v) || t('validations.mustBePositiveInteger')],
  is_right: [],
  id: [],
  visibility: [],
  last_name: [],
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
  excelFile: [
    v => !v
      || !v.length
      || v[0].size <= maxExcelFileSize
      || `${t('validations.fileSize')} ${LIMIT_EXCEL_FILE_SIZE} Mb`,
    v => !v
      || !v.length
      || /\.(xls|xlsx)$/.test(v[0].name)
      || `${t('validations.fileExtensions')}: .xls, .xlsx`,
  ],
  password: [v => !!v || t('validations.passwordRequired')],
  current_password: [v => !!v || t('validations.passwordRequired')],
  new_password: [v => !!v || t('validations.passwordRequired')],
};

// Registration form fields
export const FIELDS_FORM_REGISTRATION = {
  username: { model: 'username', label: 'placeholders.username', type: 'text' },
  first_name: { model: 'first_name', label: 'placeholders.firstName', type: 'text' },
  last_name: { model: 'last_name', label: 'placeholders.lastName', type: 'text' },
  email: { model: 'email', label: 'placeholders.email', type: 'email' },
  password: { model: 'password', label: 'placeholders.password', type: 'password' },
  confirm_password: { model: 'confirm_password', label: 'placeholders.confirmPassword', type: 'password' },
};

// Company information fields
export const COMPANY_INFO_FIELDS = [
  { name: 'fields.company', value: 'name' },
  { name: 'fields.description', value: 'description' },
];

// Immutable fields in user settings
export const NON_CHANGEABLE_USER_SETTINGS_FIELDS = ['username', 'email'];

// Password change fields
export const CHANGE_PASSWORD_FIELDS = [
  { field: 'current_password',  label: 'currentPassword' },
  { field: 'new_password',  label: 'newPassword' },
  { field: 're_new_password',  label: 'confirmNewPassword' },
];

export const COMPANY_NAVBAR = [
  { value: 'all-users', icon: 'mdi-account', text: 'navbar.addMember' },
  { value: 'members', icon: 'mdi-account-group', text: 'navbar.members' },
  { value: 'admins', icon: 'mdi-account-star', text: 'navbar.admins' },
  { value: 'invitations', icon: 'mdi-lock', text: 'navbar.invitations' },
  { value: 'requests', icon: 'mdi-cursor-default-click-outline', text: 'navbar.requests' },
];

export const USER_NAVBAR = [
  { value: 'my-companies', icon: 'mdi-folder-account', text: 'navbar.myCompany' },
  { value: 'all-companies', icon: 'mdi-domain', text: 'navbar.companies' },
  { value: 'admins', icon: 'mdi-account-star', text: 'navbar.admins' },
  { value: 'members', icon: 'mdi-account-group', text: 'navbar.members' },
  { value: 'invitations', icon: 'mdi-lock', text: 'navbar.invitations' },
  { value: 'requests', icon: 'mdi-cursor-default-click-outline', text: 'navbar.requests' },
  { value: 'notifications', icon: 'mdi-bell-ring', text: 'navbar.notifications' },
  { value: 'user-quizzes', icon: 'mdi-book-open-variant', text: 'navbar.quizzes' },
  { value: 'user-quiz-results', icon: 'mdi-file-chart', text: 'navbar.quizResults' },
  { value: 'user-results-analytics', icon: 'mdi-poll', text: 'navbar.resultsAnalytics' },
];
