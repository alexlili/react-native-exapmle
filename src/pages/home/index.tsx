/* eslint-disable react-native/no-inline-styles */
import ListFooter from '@/components/listFooter/index';
import SearchMeetingInput from '@/components/searchMeetingInput/index';
import { BannerInfoVo, getBanners } from '@/service/common';
import { AuthStatusType, UserLoginInfo } from '@/service/login';
import { getHomeMeetingList, MeetingSimpleVo } from '@/service/meeting';
import DeviceStorage from '@/util/storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text, View
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ArrayUtils, ObjectUtils } from 'ts-type-utils';
const DeviceWidth = Dimensions.get('window').width; //full width
const DeviceHeight = Dimensions.get('window').height; //full width
const EmptyImage = require('@/assets/img/empty.png');
const limit: number = 5;

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [stateLoading, setLoading] = useState<boolean>(true);
  const [stateRefreshing, setRefreshing] = useState<boolean>(false);
  const [stateDataSource, setDataSource] = useState<MeetingSimpleVo[]>([]);
  const [statePageNumber, setPageNumber] = useState<number>(1);
  const [stateHasNextPage, setHasNextPage] = useState<boolean>(true);
  const [stateBanners, setBanners] = useState<BannerInfoVo[]>([]);
  const [stateUserInfo, setUserInfo] = useState<UserLoginInfo>({
    userid: '',
  });

  useEffect(() => {
    const getAsyncStorageData = async () => {
      // 获取userInfo
      const currentUserInfo = await DeviceStorage.get('userInfo');
      setUserInfo(currentUserInfo);
    };
    getAsyncStorageData();
  }, []);
  useEffect(() => {
    loadBannners();
  }, []);
  const loadBannners = async () => {
    const banners = await getBanners();
    setBanners(banners ?? []);
  };

  useEffect(() => {
    if (
      Number(stateUserInfo?.authStatus) === AuthStatusType.AuthSuccess &&
      stateUserInfo?.userid
    ) {
      initData(stateUserInfo?.userid);
    }
  }, [stateUserInfo]);

  const _renderItem = (carouselItem: any) => {
    const { item } = carouselItem;
    return (
      <View key={item.id} style={{ width: DeviceWidth }}>
        <Image
          style={{ height: (DeviceWidth * 636) / 1500 }}
          source={{
            uri: item.imageUrl,
          }}
        />
      </View>
    );
  };
  /**
   * 初始化数据
   */
  async function initData(userid: string, refresh?: boolean) {
    // Toast('初始化数据');
    try {
      if (refresh) {
        setRefreshing(true);
      }
      setHasNextPage(true);
      setPageNumber(1);
      const data = await getHomeMeetingList({
        page: 1,
        limit,
        userid: userid,
      });

      if (ObjectUtils.hasValue(data) && ArrayUtils.isNotEmpty(data)) {
        if (data.length < limit) {
          // 下一页没有数据了
          setHasNextPage(false);
        }
        setDataSource(data);
      } else {
        // 下一页没有数据了
        setHasNextPage(false);
      }
    } finally {
      if (refresh) {
        setRefreshing(false);
      }
      setLoading(false);
    }
  }

  // 请求加载下一页
  async function loadMore(params: { pageNumber: number }) {
    const { pageNumber } = params;
    try {
      setLoading(true);
      setPageNumber(pageNumber);
      const data = await getHomeMeetingList({
        page: pageNumber,
        limit,
        userid: stateUserInfo?.userid,
      });
      if (ObjectUtils.hasValue(data) && ArrayUtils.isNotEmpty(data)) {
        if (data.length < limit) {
          // 下一页没有数据了
          setHasNextPage(false);
        }
        const currentDataSource = stateDataSource.concat(data)
        setDataSource(currentDataSource);
      } else {
        // 下一页没有数据了
        setHasNextPage(false);
      }
    } finally {
      setLoading(false);
    }
  }
  /**
   * 加载更多
   */
  async function onEndReached() {
    if (stateLoading || stateRefreshing || !stateHasNextPage) {
      return;
    }
    console.log(statePageNumber + 1)
    loadMore({ pageNumber: statePageNumber + 1 });
  }
  /**
   * 下拉刷新
   */
  async function onRefresh() {
    initData(stateUserInfo?.userid, true);
  }

  return (
    <View style={{ height: DeviceHeight, display: 'flex', width: '100%' }}>
      <SearchMeetingInput />
      <View style={[styles.bannerWrap, { height: (DeviceWidth * 636) / 1500 }]}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination
          data={stateBanners}
          renderItem={_renderItem}
          paginationDefaultColor={'rgba(255, 255, 255, 0.6)'}
          paginationActiveColor={'#0e9fff'}
          paginationStyleItem={{
            width: 20,
            height: 3,
            borderRadius: 3,
          }}
        />
      </View>
      <View style={styles.wrap}>
        {/* userid存在且已经认证则渲染列表 */}
        {stateUserInfo?.userid ? (
          Number(stateUserInfo?.authStatus) === AuthStatusType.AuthSuccess ? (
            <FlatList
              style={{ width: '100%' }}
              data={stateDataSource}
              renderItem={({ item, index }) => (
                <View style={styles.meetingItem} key={item.id}>
                  <Image style={styles.meetingImg} source={{ uri: item.thumbnailUrl }} />
                  <View style={styles.meetingContent}>
                    <Text>{item.title}</Text>
                    <Text>{item.host}</Text>
                    <Text>{item.startTime}</Text>
                  </View>
                </View>
              )}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => (
                <ListFooter
                  loading={stateLoading}
                  isEmpty={stateDataSource.length ? false : true}
                  hasNextPage={stateHasNextPage}
                />
              )}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.emptyWrap}>
                    <Image style={styles.icon} source={EmptyImage} />
                    <Text>空空如也</Text>
                  </View>
                );
              }}
              refreshing={stateRefreshing}
              onRefresh={onRefresh}
            />
          ) : (
            <View style={styles.emptyWrap}>
              <Text>您还未认证！</Text>
              <Text
                onPress={() => {
                  navigation.navigate('PersonalCenter');
                }}>
                去认证
              </Text>
            </View>
          )
        ) : (
          <View style={styles.notLoginWrap}>
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}>
              点击登录后查看
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 80
  },

  bannerWrap: {
    position: 'relative',
  },
  meetingItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    marginBottom: 10
  },
  meetingImg: {
    resizeMode: 'contain',
    width: '25%'
  },
  meetingContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  icon: {
    width: '25%',
    resizeMode: 'contain',
  },
  emptyWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notLoginWrap: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
