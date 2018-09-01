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
    isShowPicker: false,
    hours: hours,
    hour: 1,
    minutes: minutes,
    minute: 0,
    seconds: seconds,
    second: 0,
    value: [1, 0, 0],
    content: "12321412",
    list:[
      {
        time:0,
        title:"1"
      },
      {      
        time:1,
        title:"2"
      },
      {      
        time:2,
        title:"3"
      },
      {      
        time:3,
        title:"4"
      }
    ]
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]],
      second: this.data.seconds[val[2]],
    })
  },
  formName: function (e) {
    this.setData({ content: e.detail })
  },
  showPicker: function () {
    this.setData({ isShowPicker: !this.data.isShowPicker })
  },
  // 倒计时
  Countdown: function () {
    timer = setTimeout(function () {
      Countdown();
    }, 1000);
  },
  // 取消
  cancel: function () {
    clearTimeout(timer);
  },
  // 确定
  confirm: function () {
    console.log(this.data.content);
    count = this.data.hour * 3600 + this.data.minute * 60 + this.data.second;
    console.log(count);
    // Countdown();
  },
  onLoad: function () {
    // 获取用户任务列表
    // 有数据-展示
  }
});

// 倒计时
function Countdown() {
  timer = setTimeout(function () {
    count--;
    Countdown();
  }, 1000);
};

