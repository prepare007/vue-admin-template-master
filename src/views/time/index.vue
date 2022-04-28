<template>
  <div id="app">
    <div class="background">
      <img src="@/assets/t.jpg" />
    </div>
    <div class="toolbar">
      <div v-show="initialSeen">
<!--        <input id="hour" v-model="hour">

        <input id="minute" v-model="minute">

        <input id="second" v-model="second">-->

<!--        <span id="hourlabel">时</span>

        <span id="minutelabel">分</span>

        <span id="secondlabel">秒</span>-->

        <counter-button id="countup" text="开始" @click-button="startCountUp" />

<!--        <counter-button id="countdown" text="开始倒计时" @click-button="startCountDown" />-->
      </div>

      <span v-show="hintSeen" id="hint">{{ hint }}</span>

<!--      <counter-button v-show="clearSeen" id="clear" :text="clearText" @click-button="clearCounter" />-->
      <counter-button v-show="pauseSeen" id="pause" text="暂停" @click-button="pauseCounter" />
<!--      <counter-button v-show="restartSeen" id="restart" text="重新再计时" @click-button="restartCounter" />-->
      <counter-button v-show="resumeSeen" id="resume" text="恢复" @click-button="resumeCounter" />
      <counter-button v-show="!initialSeen" id="finish" text="完成" @click-button="finish" />
    </div>
    <span id="time">{{ time }}</span>
  </div>
</template>

<script>
import CounterButton from '../../components/time/CounterButton'
export default {
  name: 'App',
  components: {
    CounterButton
  },
  data: function() {
    return {
      bookId: this.$route.query.bookId,
      start: null,
      end: null,
      status: 1,
      // status---1: before start; 2: up timing; 3: down timing; 4: up pausing;
      // 5: down pausing; 6: down finished;
      hour: null,
      minute: null,
      second: null,
      time: '00:00:00',
      timer: null,
      Hour: 0,
      Minute: 0,
      Second: 0,
      Millisecond: 0,
      hourString: '',
      minuteString: '',
      secondString: '',
      recordHour: 0,
      recordMinute: 0,
      recordSecond: 0,
      recordMillisecond: 0,
      hint: '正在倒计时 12:20:00',
      clearText: '',
      initialSeen: true,
      clearSeen: false,
      pauseSeen: false,
      restartSeen: false,
      resumeSeen: false,
      hintSeen: false
    }
  },
  mounted: function() {
    window.addEventListener('keyup', this.handleKeyup)
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    mounted() {
      // init the default selected tab
      console.info('bookId: ')
    },
    format: function(Hour, Minute, Second) {
      if (Second < 10) {
        this.secondString = '0' + Second
      } else {
        this.secondString = Second
      }

      if (Minute < 10) {
        this.minuteString = '0' + Minute
      } else {
        this.minuteString = Minute
      }

      if (Hour < 10) {
        this.hourString = '0' + Hour
      } else {
        this.hourString = Hour
      }
      return (
        this.hourString + ':' + this.minuteString + ':' + this.secondString
      )
    },
    changeStatus: function(aimStatus) {
      if (aimStatus === 1) {
        // before start
        this.initialSeen = true
        this.clearSeen = false
        this.pauseSeen = false
        this.restartSeen = false
        this.resumeSeen = false
        this.hintSeen = false
      } else if (aimStatus === 2 || aimStatus === 3) {
        // up timing || down timing
        this.initialSeen = false
        this.clearSeen = true
        this.pauseSeen = true
        this.restartSeen = true
        this.resumeSeen = false
        this.hintSeen = true

        if (aimStatus === 2) {
          this.hint = ''
        } else if (aimStatus === 3) {
          this.recordHour = parseInt(this.recordMillisecond / 3600000)
          this.recordMinute = parseInt(
            (this.recordMillisecond % 3600000) / 60000
          )
          this.recordSecond = parseInt((this.recordMillisecond % 60000) / 1000)
          this.hint =
            '正在倒计时 ' +
            this.format(this.recordHour, this.recordMinute, this.recordSecond)
        }
      } else if (aimStatus === 4 || aimStatus === 5) {
        // up pausing || down pausing
        this.initialSeen = false
        this.clearSeen = true
        this.pauseSeen = false
        this.restartSeen = true
        this.resumeSeen = true
        this.hintSeen = true

        if (aimStatus === 4) {
          // up pausing
          this.clearText = '清空正计时'
        } else if (aimStatus === 5) {
          // down pausing
          this.recordHour = parseInt(this.recordMillisecond / 3600000)
          this.recordMinute = parseInt(
            (this.recordMillisecond % 3600000) / 60000
          )
          this.recordSecond = parseInt((this.recordMillisecond % 60000) / 1000)
          this.hint =
            '暂停倒计时 ' +
            this.format(this.recordHour, this.recordMinute, this.recordSecond)
        }
      } else if (aimStatus === 6) {
        // down finished
        this.initialSeen = false
        this.clearSeen = true
        this.pauseSeen = false
        this.restartSeen = true
        this.resumeSeen = false
        this.hintSeen = true

        this.recordHour = parseInt(this.recordMillisecond / 3600000)
        this.recordMinute = parseInt(
          (this.recordMillisecond % 3600000) / 60000
        )
        this.recordSecond = parseInt((this.recordMillisecond % 60000) / 1000)
        this.hint =
          '倒计时 ' +
          this.format(this.recordHour, this.recordMinute, this.recordSecond) +
          ' 已结束'
      }
    },
    CountUp: function() {
      this.Millisecond += 50
      this.Hour = parseInt(this.Millisecond / 3600000)
      this.Minute = parseInt((this.Millisecond % 3600000) / 60000)
      this.Second = parseInt((this.Millisecond % 60000) / 1000)
      this.time = this.format(this.Hour, this.Minute, this.Second)
    },
    CountDown: function() {
      this.Millisecond -= 50
      this.Hour = parseInt(this.Millisecond / 3600000)
      this.Minute = parseInt((this.Millisecond % 3600000) / 60000)
      this.Second = parseInt((this.Millisecond % 60000) / 1000)
      if (this.Millisecond <= 0) {
        clearInterval(this.timer)
        this.changeStatus(6)
      }
      this.time = this.format(this.Hour, this.Minute, this.Second)
    },
    startCountUp: function() {
      this.start = new Date().getTime()
      this.status = 2
      this.Millisecond = 0
      this.changeStatus(this.status)
      this.timer = setInterval(this.CountUp, 50)
    },
    startCountDown: function() {
      this.status = 3
      this.Hour = this.hour
      if (this.minute > 59) {
        this.Minute = 59
      } else {
        this.Minute = this.minute
      }
      if (this.second > 59) {
        this.Second = 59
      } else {
        this.Second = this.second
      }

      this.hour = null
      this.minute = null
      this.second = null

      this.Millisecond =
        this.Hour * 3600000 + this.Minute * 60000 + this.Second * 1000
      this.recordMillisecond = this.Millisecond
      this.changeStatus(this.status)

      this.timer = setInterval(this.CountDown, 50)
    },
    clearCounter: function() {
      this.status = 1
      this.changeStatus(this.status)
      clearInterval(this.timer)
      this.time = this.format(0, 0, 0)
    },
    pauseCounter: function() {
      if (this.status === 2) {
        // Now count up
        this.status = 4
        this.changeStatus(this.status)
        clearInterval(this.timer)
      } else if (this.status === 3) {
        // now count down
        this.status = 5
        this.changeStatus(this.status)
        clearInterval(this.timer)
      }
    },
    restartCounter: function() {
      if (this.status === 2 || this.status === 4) {
        this.status = 2
        this.Millisecond = 0
        this.changeStatus(this.status)
        clearInterval(this.timer)
        this.timer = setInterval(this.CountUp, 50)
      } else if ((this.status = 3 || this.status === 5 || this.status === 6)) {
        this.status = 3
        this.Millisecond = this.recordMillisecond
        this.changeStatus(this.status)
        clearInterval(this.timer)
        this.timer = setInterval(this.CountDown, 50)
      }
    },
    resumeCounter: function() {
      if (this.status === 4) {
        this.status = 2
        this.changeStatus(this.status)
        this.timer = setInterval(this.CountUp, 50)
      } else if ((status === 5)) {
        this.status = 3
        this.changeStatus(this.status)
        this.timer = setInterval(this.CountDown, 50)
      }
    },
    finish: function() {
      this.end = new Date().getTime()
      this.status = 6
      this.changeStatus(this.status)
      clearInterval(this.timer)
      console.info('finish' + this.start + ' ' + this.end)
      this.$router.push({
        path: '/record/index',
        query: {
          bookId: this.$route.query.bookId,
          startTime: this.start,
          endTime: this.end
        }
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.toolbar {
  width: 1220px;
  height: 70px;
}

#hour {
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: 40px;
  top: 15px;
  width: 69px;
  height: 34px;
  font-size: 15px;
}

#hourlabel {
  position: absolute;
  left: 86px;
  top: 24px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #222222;
}

#minute {
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: 130px;
  top: 15px;
  width: 69px;
  height: 34px;
  font-size: 15px;
}

#minutelabel {
  position: absolute;
  left: 177px;
  top: 24px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #222222;
}

#second {
  background-color: white;
  border-radius: 5px;
  position: absolute;
  left: 220px;
  top: 15px;
  width: 69px;
  height: 34px;
  font-size: 15px;
}

#secondlabel {
  position: absolute;
  left: 268px;
  top: 24px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #222222;
}

#time {
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 110px;
  font-family: PTMono-Bold, "PT Mono", monospace;
  font-weight: 700;
  color: #3c5181;
}

#hint {
  position: absolute;
  left: 40px;
  top: 24px;
  font-family: PTMono-Bold, "PT Mono", monospace;
  font-size: 16px;
  color: white;
}
/*#finish {
  width: fit-content;
  position: absolute;
  top: 400px;
  font-size: 50px;
  font-weight: 700;
  color: #2188e9;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
}*/
.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}
button {
  width: 15%;
  color: red;
  background: antiquewhite;
  border-radius: 10px;
}

</style>

