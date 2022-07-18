import Request from '@/request/index';

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
  return Request.get('/v1/common/banners');
}
