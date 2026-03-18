<template name="skeleton">
  <view class="sk-container">
    <!-- <view is="pages/home/components/CustomNavbar" class="data-v-0cd09a48 data-v-0cd09a48">
      <view class="container CustomNavbar--container data-v-cae80c19 CustomNavbar--data-v-cae80c19">
        <view class="header CustomNavbar--header data-v-cae80c19 CustomNavbar--data-v-cae80c19">
          <image class="data-v-cae80c19 CustomNavbar--data-v-cae80c19 sk-image" mode="widthFix"
            style="height: 20.6747px;"></image>
          <text
            class="logo-text CustomNavbar--logo-text data-v-cae80c19 CustomNavbar--data-v-cae80c19 sk-transparent sk-text-14-2857-954 sk-text">新鲜
            · 亲民 · 快捷</text>
        </view>
        <view class="search CustomNavbar--search data-v-cae80c19 CustomNavbar--data-v-cae80c19">
          <view class="data-v-cae80c19 CustomNavbar--data-v-cae80c19 sk-image" placeholder="请输入搜索内容"
            placeholder-class="placeholder-style" type="text"></view>
        </view>
      </view>
    </view> -->
    <scroll-view refresher-enabled="true" scroll-y="true" class="scroll scroll data-v-0cd09a48 data-v-0cd09a48"
      style="margin-top:140px" enable-back-to-top="true">
      <view is="components/XtxSwiper" class="data-v-0cd09a48 data-v-0cd09a48">
        <view class="xtx-swiper XtxSwiper--xtx-swiper data-v-17cc3903 XtxSwiper--data-v-17cc3903">
          <swiper circular="true" class="swiper XtxSwiper--swiper data-v-17cc3903 XtxSwiper--data-v-17cc3903"
            interval="3000" current="0" autoplay="false">
            <swiper-item class="swiper-item XtxSwiper--swiper-item data-v-17cc3903 XtxSwiper--data-v-17cc3903"
              style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
              <navigator class="navigator XtxSwiper--navigator data-v-17cc3903 XtxSwiper--data-v-17cc3903">
                <image class="data-v-17cc3903 XtxSwiper--data-v-17cc3903 sk-image" mode="widthFix"
                  style="height: 157.416px;"></image>
              </navigator>
            </swiper-item>
          </swiper>
          <view class="swiper-indicators XtxSwiper--swiper-indicators data-v-17cc3903 XtxSwiper--data-v-17cc3903">
            <view
              class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903 active XtxSwiper--active">
            </view>
            <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903"></view>
            <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903"></view>
            <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903"></view>
            <view class="indicator XtxSwiper--indicator data-v-17cc3903 XtxSwiper--data-v-17cc3903"></view>
          </view>
        </view>
      </view>
      <view is="pages/home/components/CategoryPanel" class="data-v-0cd09a48 data-v-0cd09a48">
        <view class="category-panel CategoryPanel--category-panel data-v-529bcd34 CategoryPanel--data-v-529bcd34">
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-438 sk-text">
              居家</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-153 sk-text">
              锦鲤</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-885 sk-text">
              服饰</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-351 sk-text">
              母婴</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-286 sk-text">
              个护</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-538 sk-text">
              严选</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-33 sk-text">
              数码</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-80 sk-text">
              运动</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-41 sk-text">
              杂项</view>
          </view>
          <view class="category-item CategoryPanel--category-item data-v-529bcd34 CategoryPanel--data-v-529bcd34">
            <image class="data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-image"></image>
            <view
              class="category-item-text CategoryPanel--category-item-text data-v-529bcd34 CategoryPanel--data-v-529bcd34 sk-transparent sk-text-14-2857-260 sk-text">
              品牌</view>
          </view>
        </view>
      </view>
      <view is="pages/home/components/HotPanel" class="data-v-0cd09a48 data-v-0cd09a48">
        <view class="hot-panel HotPanel--hot-panel data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
          <view class="hot-item HotPanel--hot-item data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
            <view class="title HotPanel--title data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent">特惠推荐
              <text
                class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent sk-text-14-2857-901 sk-text">精选全攻略</text>
            </view>
            <view class="image HotPanel--image data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
            </view>
          </view>
          <view class="hot-item HotPanel--hot-item data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
            <view class="title HotPanel--title data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent">爆款推荐
              <text
                class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent sk-text-14-2857-841 sk-text">最受欢迎</text>
            </view>
            <view class="image HotPanel--image data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
            </view>
          </view>
          <view class="hot-item HotPanel--hot-item data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
            <view class="title HotPanel--title data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent">一站买全
              <text
                class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent sk-text-14-2857-403 sk-text">精心优选</text>
            </view>
            <view class="image HotPanel--image data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
            </view>
          </view>
          <view class="hot-item HotPanel--hot-item data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
            <view class="title HotPanel--title data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent">新鲜好物
              <text
                class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-transparent sk-text-14-2857-741 sk-text">生活加分项</text>
            </view>
            <view class="image HotPanel--image data-v-c23c4e1c HotPanel--data-v-c23c4e1c">
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
              <image class="data-v-c23c4e1c HotPanel--data-v-c23c4e1c sk-image"></image>
            </view>
          </view>
        </view>
      </view>
      <view is="components/XtxGuess" class="r r data-v-0cd09a48 data-v-0cd09a48">
        <view class="xtu-guess XtxGuess--xtu-guess data-v-e94a02da XtxGuess--data-v-e94a02da">
          <view class="title XtxGuess--title data-v-e94a02da XtxGuess--data-v-e94a02da">
            <text
              class="data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-14-2857-675 sk-text">猜你喜欢</text>
          </view>
          <view class="guess-list XtxGuess--guess-list data-v-e94a02da XtxGuess--data-v-e94a02da">
            <view class="guess-item XtxGuess--guess-item data-v-e94a02da XtxGuess--data-v-e94a02da">
              <view class="image XtxGuess--image data-v-e94a02da XtxGuess--data-v-e94a02da">
                <image class="data-v-e94a02da XtxGuess--data-v-e94a02da sk-image" mode="aspectFill"></image>
              </view>
            </view>
            <view class="guess-item XtxGuess--guess-item data-v-e94a02da XtxGuess--data-v-e94a02da">
              <view class="image XtxGuess--image data-v-e94a02da XtxGuess--data-v-e94a02da">
                <image class="data-v-e94a02da XtxGuess--data-v-e94a02da sk-image" mode="aspectFill"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<style scoped lang="scss">
.sk-transparent {
  color: transparent !important;
}

.sk-text-14-2857-954 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text-14-2857-438 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-153 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-885 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-351 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-286 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-538 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-33 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-80 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-41 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-260 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 40.3846rpx;
  position: relative !important;
}

.sk-text-14-2857-901 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.0000rpx;
  position: relative !important;
}

.sk-text-14-2857-841 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.0000rpx;
  position: relative !important;
}

.sk-text-14-2857-403 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.0000rpx;
  position: relative !important;
}

.sk-text-14-2857-741 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 35.0000rpx;
  position: relative !important;
}

.sk-text-14-2857-675 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 43.0769rpx;
  position: relative !important;
}

.sk-image {
  background: #EFEFEF !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>