import crypto from "crypto";

export default {

  //页面调用举个栗子
  // test: function () {
  //   this.$mine.viewReload()
  // }

  viewReload: function () {

    this.displayWindow =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;

    window.onresize = () => {
      return (() => {
        this.displayWindow =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top;
        console.log(this.displayWindow)
      })();
    };
  },
  safe: function (i) {
    const md5 = crypto.createHash("md5");
    md5.update(i);
    const md5Transfer = md5.digest("hex");
    this.listData.sign = md5Transfer;
  }

}
