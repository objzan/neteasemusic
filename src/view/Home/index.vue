<template>
  <div>
    <p class="title">歌单推荐</p>

    <van-row gutter="20">
      <van-col span="8" v-for="item in recommendMusicList" :key="item.id">
        <van-image width="100%" height="100%" :src="item.picUrl" />
        <p class="song_name">{{ item.name }}</p>
      </van-col>
    </van-row>

    <p class="title">最新音乐</p>

    <song-item
      v-for="item in hotMusicList"
      :key="item.id"
      :name="item.name"
      :author="item.song.artists[0].name + ' ' + item.name"
      :id="item.id"
    ></song-item>
  </div>
</template>

<script>
import { recommendMusic, getNewSong } from '@/api'
import songItem from '@/components/songItem.vue'
export default {
  name: 'HomeIndex',
  components: {
    songItem
  },
  data() {
    return {
      limit: {
        limit: 6
      },
      songLimit: {
        limit: 20
      },
      recommendMusicList: [],
      hotMusicList: []
    }
  },
  async created() {
    const { data: res } = await recommendMusic(this.limit)
    this.recommendMusicList = res.result

    const { data: songRes } = await getNewSong(this.songLimit)
    this.hotMusicList = songRes.result
  }
}
</script>

<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}

/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
