<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true" fill="#fff">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true" fill="#fff">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true" fill="#fff">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true" fill="#fff">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true" fill="#fff">
        <use xlink:href="#icon-download"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true" fill="#fff">
        <use xlink:href="#icon-danxuan_xuanzhong"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['playlist'],
  setup(props) {
    // console.log(props);
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem('itemDetail').playlist
      ).creator;
    }
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿';
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
      }
    }
    return { changeCount };
  }
};
</script>
<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -999;
    filter: blur(30px);
  }
}

.itemTopContent {
  width: 100%;
  height: 5.5rem;
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;
  .contentLeft,
  .contentRight {
    width: 100%;
    height: 6rem;
    position: relative;
    img {
      width: 85%;
      border-radius: 0.4rem;
    }
    .palyCount {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0.05rem;
      right: 0.8rem;
      font-size: 0.24rem;
      .icon {
        width: 0.3rem;
      }
      span {
        color: #fff;
      }
    }
    .rightP_one {
      color: #fff;
    }
    .right_img {
      padding: 0.2rem 0;
      display: flex;
      justify-content: safe;
      align-items: center;
      img {
        width: 18%;
        border-radius: 2rem;
      }
      span {
        color: #f3f3f3;
        margin: 0 0.1rem;
      }
      .icon {
        fill: #fff;
      }
    }
  }
  .rightP_two {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
    span {
      width: 100%;
      font-size: 0.26rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      max-height: 5.2em;
      color: #f3f3f3;
    }
  }
}
.itemTopFooter {
  width: 100%;
  // height: 1rem;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 4.8rem;
  .footerItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      margin-top: .25rem;
    }
  }
}
</style>
