<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(item, index) in state.images" :key="index">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { getBanner } from '@/request/api/home';
export default {
  setup() {
    let state = reactive({
      images: []
    });
    onMounted(async () => {
      let { data } = await getBanner();
      state.images = data.banners
    });
    return { state };
  }
};
</script>

<style lang="less" scoped>
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    /deep/ .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
