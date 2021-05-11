Component({
    data: {
      selected: 0,
      color: "#7A7E83",
      selectedColor: "#3cc51f",
      list: [{
        pagePath: "src/pages/Index/index",
        iconPath: "/src/images/home.png",
        selectedIconPath: "/src/images/home_active.png",
        text: "首页"
      }, {
        pagePath: "src/pages/My/index",
        iconPath: "/src/images/my_icon.png",
        selectedIconPath: "/src/images/my_icon_active.png",
        text: "我的"
      }]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        console.log(url,'-------------',data.index);
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  });