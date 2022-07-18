import request from '@/request/index';
export enum AuthStatusType {
  NotAuth = -1, // 未认证
  AuthFailed, // 认证失败
  AuthSuccess, // 认证成功
  WaitAuth = 99, // 待审核
}
export enum FirewallType {
  NotFind,
  RoadshowWhite,
  LiveShowWhite,
  RoadshowBlack,
  LiveShowBlack,
}
export enum MgrType {
  ManagementUser = 1,
  TrsUser,
  User,
}
export enum SignupStatusType {
  NotSignup = -1, // 未报名
  SignupFailed, // 报名失败
  SignupSuccess, // 报名成功
  WaitAuth = 99, // 待审核
}
export interface UserLoginInfo {
  announcement?: string; // 机构公告
  authStatus?: AuthStatusType; // -1-未认证;0-认证失败;1-认证成功;99-待审核
  bizCardUrl?: string; // 名片URL
  corp?: string; // 机构
  email?: string; // 用户邮箱
  firewallType?: FirewallType; //名单类型:0-非名单用户;1-路演白名单;2-直播白名单;3-路演黑名单;4-直播黑名单
  hasLaunchPerm?: boolean; // 能否发起路演
  hasNewUser?: boolean; // 新用户标识
  hasRoadshowVip?: boolean; // 路演白名单
  instCode?: string; // 机构编号
  instId?: string; // 机构ID
  instName?: string; // 机构名称
  instQrCode?: string; // 机构二维码
  mgrType?: MgrType; // 	用户类型:1-运营后台用户;2-TRS;3-普通用户
  userid: string; // 用户ID
  name?: string; // 用户名
  position?: string; // 职位
  signupStatus?: SignupStatusType; // 报名状态:负1-未报名;0-报名失败;1-报名成功;99-待审核
  wemeetUserid?: string; // 腾讯会议用户id
  hasSdkVip?: boolean; // 是否具有SDK权限
}
/**
 * 校验会议登录短信验证码
 * /roadshow-assistant-service/v1/login/meeting/sms/{phone}/{code}
 * @param phone
 */
export function verifyMeetingLoginAuthCode(
  phone: string,
  code: string,
  meetingId: string,
  source: LoginDeviceType.Android,
): Promise<UserLoginInfo> {
  return request.post(`/v1/login/meeting/sms/${phone}/${code}`, {
    params: {
      source,
      meetingId,
    },
  });
}

/**
 * 获取登录短信验证码
 * @param phone
 */
export function getLoginAuthCode(phone: string): Promise<any> {
  return request.get(`/v1/login/sms/${phone}`);
}

export enum LoginDeviceType {
  MiniProgram = 1,
  iOS,
  Android,
  Web,
}

/**
 * 校验登录短信验证码
 * @param phone
 * @param code
 */
export function verifyLoginAuthCode(
  phone: string,
  code: string,
  source: LoginDeviceType.Android,
): Promise<UserLoginInfo> {
  return request.post(`/v1/login/sms/${phone}/${code}?source=${source}`);
}

/**
 * 获取token
 * @param userid
 * @param pubKey
 */
export function getToken(userid: string, pubKey: string): Promise<any> {
  return request.get(`/v1/admin/jwt?userid=${userid}&pubKey=${pubKey}`);
}
