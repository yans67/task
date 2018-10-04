//task.js
//获取应用实例
const app = getApp()

const hours = []
const minutes = []
const seconds = []

var timer

var count

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

for (let i = 0; i <= 59; i++) {
  seconds.push(i)
}


Page({
  data: {
    isShow: false,
    hours: hours, // time-picker 小时
    hour: 0, // time-picker 选中小时
    minutes: minutes,
    minute: 0,
    seconds: seconds,
    second: 3,
    executeHour: 0, // 任务倒计时
    executeMin: 0,
    executeSec: 0,
    indx: 0, // 选中下标
    value: [0, 0, 3],
    content: "", // 任务内容
    list: [
      {
        time: 0,
        title: "任务1",
        hour: 0,
        min: 0,
        sec: 0,
        timer: null
      },
      {
        time: 1,
        title: "任务2",
        hour: 0,
        min: 0,
        sec: 0,
        timer: null
      }
    ]
  },
  newTask: function () {
    this.setData({ isShow: !this.data.isShow })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]],
      second: this.data.seconds[val[2]],
    })
  },
  // 初始化倒计时器
  initTimer(e) {
    const idx = e.currentTarget.dataset.location;
    console.log(idx);
  },
  // 完成
  complete: function (event) {
    var idx = event.target.dataset.index;
    this.setData({ indx: idx });

    console.log("选中下标为：" + idx)
    // clearTimeout(this.data.list[idx].timer);
    clearTimeout(timer);

  },
  // 内容input
  onInput: function (e) {
    this.data.content = e.detail;
    // todo- 限制内容在15个字内
    // console.log(this.data.content);
  },
  // 弹出层关闭时回调
  onClose: function () {
    this.setData({ isShow: false });
  },
  // 倒计时
  startCountDown: function () {
    count = this.data.hour * 3600 + this.data.minute * 60 + this.data.second;
    this.data.list.push({
      time: count,
      title: this.data.content,
      hour: this.data.hour,
      min: this.data.minute,
      sec: this.data.second,
    })
    this.onClose();
    var that = this;
    nowTime(that, count);
  },
  onLoad: function () {
    // 获取用户任务列表
    // 有数据-展示
  }
});

// test倒计时
function nowTime(that, count) {

  var len = that.data.list.length
  for (var idx = 0; idx < len; idx++) {
    var count = that.data.list[idx].time
    if (count > 0) {
      var hour = Math.floor(count / 3600);
      var min = Math.floor(count / 60) % 60;
      var sec = count % 60;

      that.data.list[idx].hour = hour;
      that.data.list[idx].min = min;
      that.data.list[idx].sec = sec;
      that.data.list[idx].time--;
      that.setData({ list: that.data.list });
    } else {
      clearTimeout(timer);
    }
    count--;
  }

  timer = setTimeout(function () {
    nowTime(that, count)
  }, 1000);
};



