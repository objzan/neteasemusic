<template>
  <div>
    <van-nav-bar title="评论" left-text="返回" left-arrow @click-left="$router.back()" fixed />

    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <template>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in commentList" :key="item.id">
              <div class="warp">
                <div class="img_warp">
                  <img :src="item.user.avatarUrl" alt="" />
                </div>
                <div class="content_warp">
                  <div class="header_warp">
                    <div class="info_warp">
                      <p>{{ item.user.nickname }}</p>
                      <p>{{ item.time }}</p>
                    </div>
                    <div>{{ item.likedCount }}赞</div>
                  </div>
                  <div class="footer_warp">{{ item.content }}</div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </template>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getComment } from '@/api'
export default {
  name: 'CommentIndex',
  data() {
    return {
      commentList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async getCommentListFn() {
      const { data: res } = await getComment({
        id: this.$route.query.id,
        limit: 20,
        offset: (this.page - 1) * 20
      })
      res.comments.forEach(obj => this.commentList.push(obj))
      this.isLoading = false
      this.loading = false
    },
    onRefresh() {
      this.commentList = []
      this.page = 1
      this.getCommentListFn()
    },
    onLoad() {
      this.page++
      this.getCommentListFn()
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
}

.warp {
  display: flex;
}

.img_warp {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}

.img_warp img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.content_warp {
  flex: 1;
}

.header_warp {
  display: flex;
}

.info_warp {
  flex: 1;
}

.info_warp p:first-child {
  font-size: 0.373333rem;
  color: #666;
}

.info_warp p:last-of-type {
  font-size: 0.24rem;
  color: #999;
}

.header_warp div:last-of-type {
  font-size: 0.293333rem;
  color: #999;
}

.footer_warp {
  font-size: 0.4rem;
  color: #333;
}
</style>
