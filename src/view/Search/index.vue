<template>
  <div>
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" shape="round" />

    <div class="search_wrap" v-if="searchValue.length === 0">
      <p class="hot_title">热门搜索</p>
      <ul class="hot_name_wrap">
        <li
          class="hot_item"
          v-for="(item, index) in hotSearchList"
          :key="index"
          @click="btn(item.first)"
        >
          {{ item.first }}
        </li>
      </ul>
    </div>

    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>

      <song-item
        v-for="item in searchList"
        :key="item.id"
        :name="item.name"
        :author="item.ar[0].name"
        :id="item.id"
      ></song-item>
    </div>
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { hotSearch } from '@/api'

import songItem from '@/components/songItem.vue'
export default {
  name: 'SearchIndex',
  components: {
    songItem
  },
  data() {
    return {
      searchValue: '',
      hotSearchList: [],
      searchList: [],
      timer: null
    }
  },
  async created() {
    const { data: res } = await hotSearch()
    this.hotSearchList = res.result.hots
  },
  methods: {
    async btn(str) {
      this.searchValue = str
      const { data: res } = await searchResult({ keywords: this.searchValue, type: 1 })
      this.searchList = res.result.songs
      setTimeout(() => {
        clearTimeout(this.timer)
      })
    }
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.timer)
      if (val.length === 0) return (this.searchList = [])
      this.timer = setTimeout(async () => {
        const { data: res } = await searchResult({ keywords: val, type: 1 })
        this.searchList = res.result.songs
      }, 500)
    }
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
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
