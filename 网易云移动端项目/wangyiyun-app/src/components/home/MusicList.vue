<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true" fill="#fff">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getMusicList } from '@/request/api/home';
import { reactive, onMounted } from 'vue';
export default {
  name: 'MusicList',
  setup() {
    let state = reactive({
      musicList: []
    });
    onMounted(async () => {
      let { data } = await getMusicList();
      state.musicList = data.result;
    });

    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿';
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
      }
    }
    return { state, changeCount };
  }
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  margin-top: -0.4rem;
  .musicTop {
    width: 100%;
    height: 0 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .my-swpie {
      height: 100%;
      position: relative;
      .van-swipe-item {
        padding: 0 0.05rem;
      }
      img {
        width: 100%;
        height: 140px;
        border-radius: .3rem;
      }
      .playCount {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0.03rem;
        right: 0.2rem;
        color: #fff;
        .icon {
          height: 0.4rem;
          margin-right: -0.1rem;
        }
      }
    }
  }
}
</style>
