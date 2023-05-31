<template>
  <div class="itemMusicList">
    <!-- 播放全部 -->
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span>
          播放全部
          <span>(共{{ itemList.length }}首)</span>
        </span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jia"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <!-- 歌单列表 -->
    <div class="playList" v-for="(item, index) in itemList" :key="item.id">
      <span>{{ index + 1 }}</span>
      <div @click="playMusic(index)">
        <div class="songTitle">{{ item.al.name }}</div>
        <span class="singerName" v-for="i in item.ar" :key="i.id">
          {{ i.name }}
        </span>
      </div>
      <svg class="icon" aria-hidden="true" v-if="item.mv">
        <use xlink:href="#icon-caozuo-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" fill="#888">
        <use xlink:href="#icon-diandian"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: ['itemList', 'subscribedCount'],
  setup(props) {
    console.log(props);
  },
  methods: {
    ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    playMusic(index) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(index);
    }
  }
};
</script>

<type lang="less" scoped>
.itemMusicList {
  width: 100%;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  margin-bottom: 1.4rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  overflow: hidden;
  .itemListTop {
    width: 100%;
    height: 1rem;
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 100%;
      display: flex;
      justify-content: safe;
      align-items: center;
      .icon {
        margin-right: 0.6rem;
      }
      span > span {
        font-size: 12px;
        color: #999;
      }
    }
    .listRight {
      width: 60%;
      height: 80%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      border-radius: 25px;
      .icon {
        margin-right: 0.1rem;
        width: 0.3rem;
        fill: #fff;
      }
    }
  }
  .playList {
    width: 100%;
    // border: 1px solid red;
    margin: 0.2rem 0;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    span {
      width: 0.4rem;
      text-align: center;
      margin-right: 0.2rem;
    }
    .singerName {
      font-size: 0.24rem;
    }
    div {
      flex: 1;
    }
    .icon {
      margin-left: 0.2rem;
    }
  }
}
</type>
