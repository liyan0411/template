import router from "./index";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  next()
  // 是否登录相关校验
  setTimeout(() => {
    NProgress.done();
  }, 1000);
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
