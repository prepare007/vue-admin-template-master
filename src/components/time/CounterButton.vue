<template>
  <div>
    <button v-bind:class="styleObject" v-on:click="$emit('click-button')">{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    text: String
  },
  data: function() {
    return {
      styleObject: {
        countup: false,
        countdown: false,
        clear: false,
        pause: false,
        restart: false,
        resume: false
      }
    };
  },
  created: function() {
    if (this.text == "开始正计时") {
      this.styleObject.countup = true;
    } else if (this.text == "开始倒计时") {
      this.styleObject.countdown = true;
    } else if (this.text == "清空倒计时" || this.text == "清空正计时") {
      this.styleObject.clear = true;
    } else if (this.text == "暂停计时器") {
      this.styleObject.pause = true;
    } else if (this.text == "重新再计时") {
      this.styleObject.restart = true;
    } else if (this.text == "恢复计时器") {
      this.styleObject.resume = true;
    }
  }
};
</script>

<style>
.countup {
  background-color: #2188e9;
  border-radius: 5px;
  border-color: #2188e9;
  position: absolute;
  left: 310px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}

.countdown {
  background-color: #2188e9;
  border-radius: 5px;
  border-color: #2188e9;
  position: absolute;
  left: 428px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}

.clear {
  background-color: #dd2e1d;
  border-radius: 5px;
  border-color: #dd2e1d;
  position: absolute;
  left: 964px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}

.pause {
  background-color: #2188e9;
  border-radius: 5px;
  border-color: #2188e9;
  position: absolute;
  left: 227px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}

.restart {
  background-color: #ffb020;
  border-radius: 5px;
  border-color: #ffb020;
  position: absolute;
  left: 1082px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}

.resume {
  background-color: #2188e9;
  border-radius: 5px;
  border-color: #2188e9;
  position: absolute;
  left: 227px;
  top: 15px;
  width: 98px;
  height: 40px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  color: #ffffff;
}
</style>
