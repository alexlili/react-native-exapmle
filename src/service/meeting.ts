import request from '@/request/index';
import {UserLoginInfo} from './login';
export interface MeetingRecentVo {
  title: string;
  endTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  startTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  id: string;
}

export interface MeetingAttachmentItemVo {
  id?: string; // 	附件id
  name?: string; //	名称
  size?: string;
  url?: string; //
  type?: number;
}

export interface MeetingInfoVo {
  creatorId?: string; // 创建者id
  intervalTs?: number; // 毫秒时间戳
  endTime?: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  host?: string; // 会议主办方
  id?: string; // 	会议id
  intro?: string; // 会议简介
  meetingStatus?: MeetingStatusType; // 会议状态:0-未开始;1-进行中;2-已结束
  recents?: MeetingRecentVo[];
  startTime?: string;
  title?: string; // 	会议标题
  poster?: string; // 海报
  signupStatus?: SignupStatusType; //	用户状态:0-未报名;1-已报名审核中;2-已报名审核通过
  wechatGroupCode?: string; //	微信群码
  videoUrl?: string; // 录像URL
  wemeetJoinUrl?: string; // 腾讯会议-参会链接
  wemeetLiveAddr?: string; // 腾讯会议-直播地址
  wemeetCode?: string;
  wemeetId?: string; // 腾讯会议-id
  qnaCount?: number;
  attachmentCount?: number;
  hasLiveVip?: boolean;
  hasRoadshowVip?: boolean;
  hasAdminVip?: boolean;
  remark?: string;
  thumbnailUrl?: string; // 缩略图
  topPicUrl?: string; // 大尺寸缩略图
}
export interface MeetingQnaVo {
  answer?: string; // 回答
  answerTime?: string; //	回答时间 yyyy/MM/dd HH:mm:ss	string(date-time)
  id?: string; //	问答id	string
  meetingId?: string; // 会议id
  question?: string; //	提问
  questionTime?: string; // 提问时间yyyy/MM/dd HH:mm:ss	(date-time)
  status?: number; // 状态:0-审核不通过;1-审核中;2-审核通过	integer(int32)
  userid?: string;
}

export enum MeetingStatusType {
  /**
   * 未开始
   */
  NotStarted,
  /**
   * 进行中
   */
  OnGoing,
  /**
   * 已结束
   */
  Ended,
}

export enum SignupStatusType {
  /**
   * 未报名
   */
  NotSignUp = -1,
  /**
   * 报名审核不通过
   */
  SignUpFailReview = 0,
  /**
   * 已报名审核中
   */
  UnderReview = 99,
  /**
   * 已报名审核通过
   */
  SignedUp = 1,
}

export interface MeetingSimpleVo {
  endTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  startTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  id: string;
  meetingStatus: MeetingStatusType; // 会议状态:0-未开始;1-进行中;2-已结束
  signupStatus: SignupStatusType; // 	用户状态:-1-未报名;0-报名审核不通过;1-报名待审核;2-报名成功
  title: string;
  host: string;
  thumbnailUrl: string; // 缩略图URL
  replayEnable: number;
}

/**
 * /roadshow-service/v1/meeting/common/home
 * @param userid
 * @returns
 */
export function getHomeMeetingList(params: {
  page: number;
  limit: number;
  userid?: string;
}): Promise<MeetingSimpleVo[]> {
  return request.get('/v1/meeting/common/home', params);
}

export interface BannerInfoVo {
  id: string; //	轮播项id
  imageUrl: string; //	图片url
  linkUrl: string; //	链接url
  title: string; //	标题
}

/**
 * /roadshow-service/v1/common/banners
 * @param userid
 * @returns
 */
export function getBanners(): Promise<BannerInfoVo[]> {
  return request.get('/v1/common/banners');
}

/**
 * 通知主办方
 * @param userid
 * @returns
 */
export function getInformTheOrganizer(): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

/**
 * 会议用户报名
 * /roadshow-service/v1/meeting/signup/{meetingId}
 * @param userid
 * @returns
 */
export function getMeetingSignUp(meetingId: string): Promise<SignupStatusType> {
  return request.post(`/v1/meeting/signup/${meetingId}`);
}

/**
 * 获取会议详情
 * /roadshow-service/v1/meeting/common/{meetingId}
 * @param userid
 * @returns
 */
export function getMeetingDetail(
  meetingId: string,
  userid?: string,
): Promise<MeetingInfoVo> {
  return request.get(`/v1/meeting/common/${meetingId}`, {
    params: {
      userid,
    },
  });
}

/**
 * 获取用户是否属于会议白名单
 * /roadshow-service/v1/user/meeting/{mid}
 * @param mid
 * @returns
 */
export function getUserIsInMeetingWhiteList(mid: string): Promise<boolean> {
  return request.get(`/v1/user/meeting/${mid}`);
}

export interface MeetingAttachmentAggrVo {
  files?: MeetingAttachmentItemVo[];
  minutes?: MeetingAttachmentItemVo[];
}

/**
 * 获取会议的附件列表
 * /roadshow-service/v1/meeting/{meetingId}/attachments
 * @param mid
 * @returns
 */
export function getMeetingAttachments(
  meetingId: string,
): Promise<MeetingAttachmentAggrVo> {
  return request.get(`/v1/meeting/${meetingId}/attachments`);
}

/**
 * 获取会议我的问答列表
 * /roadshow-service/v1/meeting/{meetingId}/my/qnas
 * @param mid
 * @returns
 */
export function getMeetingMyQnas(meetingId: string): Promise<MeetingQnaVo[]> {
  return request.get(`/v1/meeting/${meetingId}/my/qnas`);
}

/**
 * 获取会议的问答列表
 * /roadshow-service/v1/meeting/{meetingId}/qnas
 * @param mid
 * @returns
 */
export function getMeetingQnas(meetingId: string): Promise<MeetingQnaVo[]> {
  return request.get(`/v1/meeting/${meetingId}/qnas`);
}

interface MeetingQnaInsertParam {
  meetingId?: string; // 会议id		true
  question?: string; // 提问内容
}

/**
 * 保存会议的问答
 * /roadshow-service/v1/meeting/qna
 * @param mid
 * @returns
 */
export function saveMeetingQna(
  data: MeetingQnaInsertParam,
): Promise<MeetingQnaVo[]> {
  return request.post('/v1/meeting/qna', {data});
}

/**
 * 会议报名-更新用户资料
 * /roadshow-assistant-service/v1/meeting/signup/update/{meetingId}
 * @param mid
 * @returns
 */
export function saveMeetingUserInfoData(
  meetingId: string,
  data: UserLoginInfo,
): Promise<number> {
  return request.post(`/v1/meeting/signup/update/${meetingId}`, {
    data,
  });
}
