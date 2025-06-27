export enum ValidationMessage {
  USERNAME_REQUIRED = 'Tên đăng nhập không được để trống',
  USERNAME_MIN = 'Tên đăng nhập phải có ít nhất 4 ký tự',
  USERNAME_MAX = 'Tên đăng nhập tối đa 20 ký tự',

  PASSWORD_REQUIRED = 'Mật khẩu không được để trống',
  PASSWORD_MIN = 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORD_MAX = 'Mật khẩu tối đa 32 ký tự',

  ROLE_INVALID = 'Vai trò không hợp lệ (admin | user)',

  LOGIN_USERNAME_REQUIRED = 'Vui lòng nhập tên đăng nhập',
  LOGIN_PASSWORD_REQUIRED = 'Vui lòng nhập mật khẩu',
}

