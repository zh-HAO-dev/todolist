
Page({
    data: {
      inputVal: '', //输入框的内容
      todolist: [],
      allCount: 0,
      allCompleted: false,
      selCount: 0,
      show:false,
      inputShowed: true,
    },
    //数据流 单向 so给文本框绑定事件
    inputChange(e) {
      // console.log(e.detail.value);
      this.setData({
        inputVal: e.detail.value
      })
    },
    //点击按钮触发回调函数 给数组添加数据
    addNew() {
      if (!this.data.inputVal) {
        return
      }
      // console.log(this.data.inputVal);
      this.data.todolist.unshift({
        name: this.data.inputVal,
        completed: false,
       
      });
  
      // 必须通过setData() 页面才会发生变化
      this.setData({
        todolist: this.data.todolist,
        inputVal: '',
        allCount: this.data.allCount + 1,
        show:false,
      });
      this.save()
  
    },
    //点击 选中状态
    selClick(e) {
      //当前的索引
      var item = this.data.todolist[e.currentTarget.dataset.index]
      console.log(item);
      item.completed = !item.completed;
      let selCount = this.data.selCount + (item.completed ? 1 : -1);
  
  
      this.setData({
        selCount: selCount,
        todolist: this.data.todolist
      })
      this.save()
    },
    //点击删除
    clickClear(e) {
      // console.log(e.currentTarget.dataset.index);
      let item = this.data.todolist.splice(e.currentTarget.dataset.index, 1)[0];
      console.log(item);
  
      this.setData({
        todolist: this.data.todolist,
        allCount: this.data.allCount - 1,
        selCount: this.data.selCount - (item.completed ? 1 : 0)
      })
      this.save()
    },
    //全选
    selAll() {
      this.data.allCompleted = !this.data.allCompleted;
      var that = this;
      this.data.todolist.forEach(function (item) {
        item.completed = that.data.allCompleted
      });
  
      this.setData({
        todolist: this.data.todolist,
        allCount:this.data.todolist.length,
        selCount: this.data.allCompleted ? this.data.todolist.length : 0,
      })
      this.save()
    },
    //删除
    clearAll() {
      // let todo = this.data.todolist.filter(function (item) {
      //   return !item.completed
      // })
      this.setData({
        todolist: [],
        allCount: 0,
        selCount: 0,
        show:true,
      })
      this.save()
    },
    //本地存储
    save() {
      //本地存储
      try {
        wx.setStorageSync('todolist', this.data.todolist)
      } catch (e) {
        console.error(e)
      }
    },
    onLoad: function (options) {
      //初始化数据
      let list = wx.getStorageSync('todolist')
      var num = [];
      if (list) {
        list.forEach(function (item) {
          if (item.completed) {
            num.push(item)
          }
        })
        this.setData({
          todolist: list,
          allCount: list.length, //总数
          selCount: num.length, //选中个数
        })
      }
    }
  })