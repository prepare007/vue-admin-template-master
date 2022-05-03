<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
<!--      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.bookId }}
        </template>
      </el-table-column>-->
      <el-table-column label="书名">
        <template slot-scope="scope">
          {{ scope.row.bookName }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出版社" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.publish }}
        </template>
      </el-table-column>
      <el-table-column label="完成度" width="110" align="center" cr>
        <template slot-scope="scope">
          {{ scope.row.curPage }}/{{ scope.row.totalPage }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="阅读完成" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state ==="true"?"是":"否"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后操作时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="操作">
        <template slot-scope="scope">
          <router-link :to="{path: '/time/index', query: {bookId: scope.row.bookId }}" >
            <el-link type="primary">
              <i class="el-icon-link"></i>
              <span>开始阅读</span>
            </el-link>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  summaryMethod: function(page, column, row) {
    return '共' + page.total + '条数据'
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.records
        this.listLoading = false
      })
    }
  }
}
</script>
