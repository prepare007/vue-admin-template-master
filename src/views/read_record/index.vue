<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="开始阅读页码">
        <el-input v-model="form.startPage" />
      </el-form-item>
      <el-form-item label="结束阅读页码">
        <el-input v-model="form.endPage" />
      </el-form-item>
<!--      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
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
      <el-form-item label="读书笔记">
        <el-input v-model="form.note" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addRecord } from '@/api/record'
export default {
  data() {
    return {
      form: {
        bookId: '',
        startTime: '',
        endTime: '',
        bookName: '',
        region: '',
        startPage: '',
        endPage: '',
        date1: '',
        date2: '',
        state: false,
        type: [],
        resource: '',
        note: ''
      }
    }
  },
  mounted() {
    this.form.bookId = this.$route.query.bookId
    this.form.startTime = this.$route.query.startTime
    this.form.endTime = this.$route.query.endTime
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      // eslint-disable-next-line no-undef
      addRecord(this.form).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/table/index')
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

