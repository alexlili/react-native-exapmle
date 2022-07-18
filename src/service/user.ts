import request from '@/request/index';
import {MeetingStatusType, SignupStatusType} from './meeting';
export interface MeetingSimpleVo {
  endTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  startTime: string; // 结束时间 yyyy-MM-dd HH:mm:ss
  id: string;
  meetingStatus: MeetingStatusType; // 会议状态:0-未开始;1-进行中;2-已结束
  signupStatus: SignupStatusType; // 	用户状态:-1-未报名;0-报名审核不通过;1-报名待审核;2-报名成功
  title: string;
  host: string;
}

/**
 * 上传头像
 * @param formData
 */
export function uploadAvatar(formData: any): Promise<string> {
  return request.post('/v1/user/avatar', {
    requestType: 'form',
    data: formData,
  });
}

/**
 * 上传头像
 * @param formData
 */
export function getUserInfo(): Promise<any> {
  return request.get('/v1/user/');
}

/**
 * /roadshow-service/v1/meeting/meetings
 * @param userid
 * @returns
 */
export function getMyRoadshowMeetingList(params: {
  page: number;
  limit?: number;
  type: number;
}): Promise<MeetingSimpleVo[]> {
  return request.get('/v1/meeting/meetings', {
    params: {
      limit: 30,
      ...params,
    },
  });
}
