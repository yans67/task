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
    hour: 1, // time-picker 选中小时
    minutes: minutes,
    minute: 0,
    seconds: seconds,
    second: 0,
    executeHour: 0, // 任务倒计时
    executeMin: 0,
    executeSec: 0,
    indx: 0, // 选中下标
    value: [1, 0, 0],
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
    clearTimeout(this.data.list[idx].timer);
  },
  // 内容input
  onInput: function (e) {
    this.data.content = e.detail;
    // todo- 限制内容在15个字内
    console.log(this.data.content);
  },
  // 弹出层关闭时回调
  onClose: function () {
    this.setData({ isShow: false });
  },
  // 倒计时
  startCountDown: function () {
    var count = this.data.hour * 3600 + this.data.minute * 60 + this.data.second;
    this.data.list.push({
      time: count,
      title: this.data.content,
      hour: this.data.hour,
      min: this.data.minute,
      sec: this.data.second,
    })
    this.onClose();
    var idx = this.data.list.length - 1;
    this.countDown(idx);
  },
  // 倒计时
  countDown: function (idx) {
    var tmp = this.data.list[idx];

    console.log(tmp.time);

    if (tmp.time > 0) {
      var hour = Math.floor(tmp.time / 3600);
      var min = Math.floor(tmp.time / 60) % 60;
      var sec = tmp.time % 60;

      this.data.list[idx].hour = hour;
      this.data.list[idx].min = min;
      this.data.list[idx].sec = sec;
      this.setData({ list: this.data.list });
      
      tmp.time--;
    }
    // this.data.list[idx].timer = setTimeout(this.countDown(idx), 1000);
    setTimeout(this.countDown(idx), 1000);
  },

  onLoad: function () {
    // 获取用户任务列表
    // 有数据-展示
  }
});

