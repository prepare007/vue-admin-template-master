<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="书名">
        <el-input v-model="form.bookName" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="form.publish" />
      </el-form-item>
      <el-form-item label="总页数">
        <el-input v-model="form.totalPage" />
      </el-form-item>

<!--      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>-->
<!--      <el-form-item label="阅读时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>-->
      <el-form-item label="阅读完成">
        <el-switch v-model="form.state" />
      </el-form-item>
<!--      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>-->
<!--      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>-->
<!--      <el-form-item label="读书笔记">
        <el-input v-model="form.note" type="textarea" />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList, creatBook, updateBook } from '@/api/table'
export default {
  data() {
    return {
      form: {
        bookName: '',
        author: '',
        publish: '',
        totalPage: '',
        region: '',
        date1: '',
        date2: '',
        state: false,
        type: [],
        resource: '',
        note: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      creatBook(this.form).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

