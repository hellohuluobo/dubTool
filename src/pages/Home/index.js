Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  methods: {
    switchTab: function (){
      wx.navigateTo({
        url:'/src/pages/Voice/index'
      })
    }
  }
})
