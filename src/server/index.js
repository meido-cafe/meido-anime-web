import { get, post } from "./serverFun";
import { mock } from "../utils";

// 登录
export const postLogin = (params) => {
  return post("/api/v1/user/login", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    }
  });
};

// 获取番剧日历
export const getBangumiCalendar = (params) => {
  return get("/api/v1/bangumi/calendar", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};

// 获取番剧详情
export const getBangumiSubject = (params) => {
  return get("/api/v1/bangumi/subject", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};
// 获取角色信息
export const getBangumiSubjectCharacters = (params) => {
  return get("/api/v1/bangumi/subject/characters", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};

// 获取字幕组信息
export const getRssInfoMikan = (params) => {
  return get("/api/v1/rss/info/mikan", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};

// 获取rss信息
export const getRssSubject = (params) => {
  return get("/api/v1/rss/subject", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};

// 获取分类列表
export const getCategoryList = (params) => {
  return get("/api/v1/category/list", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    } else {
      throw new Error("异常");
    }
  });
};

// 订阅
export const postVideoSubscribe = (params) => {
  return post("/api/v1/video/subscribe", params).then((res) => {
    if (res.code === 200) {
      return res.data;
    }
  });
};
