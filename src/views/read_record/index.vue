<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="开始阅读页码">
        <el-input v-model="form.startPage" />
      </el-form-item>
      <el-form-item label="结束阅读页码">
        <el-input v-model="form.endPage" />
      </el-form-item>
      <el-form-item label="阅读时间">
        <el-col :span="11">
          <el-date-picker v-model="form.startTime" :picker-options="startDatePicker" type="datetime" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.endTime" :picker-options="endDatePicker" type="datetime" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
<!--        <el-col :span="11">
          <el-time-picker v-model="form.endTime" :picker-options="endDatePicker" type="datetime" placeholder="Pick a time" style="width: 100%;" />
        </el-col>-->
      </el-form-item>

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
  beginDate() {
    return {
      disabledDate(time) {
        if (this.form.endTime) {
          // 如果结束时间不为空，则小于结束时间
          return new Date(this.form.endTime).getTime() < time.getTime()
        } else {
          // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
        }
      }
    }
  },
  processDate() {
    return {
      disabledDate(time) {
        if (this.form.startTime) {
          // 如果开始时间不为空，则结束时间大于开始时间
          return new Date(this.form.startTime).getTime() > time.getTime()
        } else {
          // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
        }
      }
    }
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

