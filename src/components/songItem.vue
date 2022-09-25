<template>
  <div>
    <van-cell center :title="name" :label="author + ' ' + name">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" @touchstart="playFn" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    author: String,
    id: Number
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style scoped>
/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
