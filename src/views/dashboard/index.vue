<template>
  <div class="dashboard-container">
    <div class="dashboard-text">亲爱的朱玲莉，欢迎回来！</div>
    <el-image id="dashboard" class="dashboard-image" :src="this.imgSrc"  />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      imgSrc: '',
      cat: ''
    }
  },
  mounted() {
    axios.get('https://api.thecatapi.com/v1/images/search').then(res => {
      console.log(res.data[0].url)
      this.imgSrc = res.data[0].url
    })
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    text-align: center;
  }
}
</style>
