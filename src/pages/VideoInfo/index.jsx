import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Tag,
  Button,
  message,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import {
  getBangumiSubject,
  getBangumiSubjectCharacters,
  getRssInfoMikan,
  getRssSubject,
  postVideoSubscribe,
  getCategoryList,
} from "../../server";
import { MbChange, copyUrl } from "../../utils/index";
import noImg from "../../public/img/noImg.jpg";

import "./style.scss";

const { Option } = Select;

export default function VideoInfo() {
  const location = useLocation();
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);
  const [rssInfoMikan, setRssInfoMikan] = useState({});
  const [rssSubject, setRssSubject] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { state } = location;
  const { id } = state;
  useEffect(() => {
    // 获取Bangumi动画信息
    getBangumiSubject({ id })
      .then((res) => {
        setInfo(res);
        return res;
      })
      .then((res) => {
        const { name_cn, name } = res;
        // 获取字幕组信息
        return getRssInfoMikan({ subject_name: name_cn || name });
      })
      .then((res) => {
        const { mid, group } = res;
        setRssInfoMikan(res);
        // 获取Rss信息
        if (group.length > 0)
          getRssSubjectFn({ mikan_id: mid, mikan_group_id: group[0]["gid"] });
      });

    // 获取动画角色信息
    getBangumiSubjectCharacters({ id }).then((res) => {
      setCharacters(res.items);
    });

    // 获取分类列表
    getCategoryList().then((res) => {
      console.log(res, "getCategoryList");
      setCategoryList(res.items);
    });
  }, []);

  // 获取rss信息
  const getRssSubjectFn = ({ mikan_id, mikan_group_id }) => {
    setRssSubject({});
    getRssSubject({
      mikan_id,
      mikan_group_id,
    }).then((res) => {
      console.log(res, "asasadsada");
      setRssSubject(res);
    });
  };

  const copyClick = (url) => {
    copyUrl(url);
    message.success("复制成功！");
  };

  // 点击订阅
  const onFinish = (values) => {
    console.log("Success:", values);
    const params = {
      bangumi_id: id,
      category: values.category,
      cover: info?.images?.large,
      episode_filter: values.episode_filter,
      must_contain: values.must_contain,
      must_not_contain: values.must_not_contain,
      play_time: new Date(info.date).getTime(),
      rss_url: rssSubject?.url,
      season: values.season,
      smart_filter: values?.smart_filter,
      title: values?.title || info.name_cn || info.name,
      total: info.eps,
    };
    postVideoSubscribe(params).then((res) => {
      console.log(res);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onGenderChange = (value) => {};
  // 渲染
  const renderDetailed = (item) => {
    if (typeof item.value === "string") {
      return (
        <div className="detailed" key={item.key}>
          <span className="detailedKey">{item.key}：</span>
          {item.value}
        </div>
      );
    } else {
      return (
        <>
          <div className="detailed" key={item.key}>
            <span className="detailedKey">{item.key}：</span>
            {item.value[0]["v"]}
          </div>
          {item.value.map((i, index) => {
            if (index > 0)
              return (
                <div className="detailed" key={i["v"]}>
                  <span style={{ opacity: 0 }} className="detailedKey">
                    {item.key}：
                  </span>
                  {i["v"]}
                </div>
              );
          })}
        </>
      );
    }
  };

  // 渲染rss信息
  const renderRssInfo = () => {
    return (
      <div className="rssInfoBox">
        <div className="SubtitleGroupLists">
          <div className="SubtitleGroupTitle">字幕组信息</div>
          {rssInfoMikan?.group?.length ? (
            rssInfoMikan?.group?.map((item) => (
              <div
                className="SubtitleGroup"
                onClick={() => {
                  getRssSubjectFn({
                    mikan_id: rssInfoMikan.mid,
                    mikan_group_id: item.gid,
                  });
                }}
                key={item.gid}
              >
                {item.group_name}
              </div>
            ))
          ) : (
            <div className="SubtitleGroup">暂无字幕组信息</div>
          )}
        </div>
        <div className="rssMain">
          <div className="rssUrl">
            <span>RSS: </span>
            {rssSubject?.url}
          </div>
          {rssSubject?.feed?.items?.map((item, index) => {
            return (
              <div className="rssInfoList" key={index}>
                <div className="rssInfo">{item?.title}</div>
                <div className="rssSize">{MbChange(item.length)}</div>
                <div className="rssCopy">
                  <Button
                    type="link"
                    onClick={() => {
                      copyClick(item.url);
                    }}
                  >
                    复制
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {rssSubject?.url ? renderSubscribe() : null}
      </div>
    );
  };

  const renderSubscribe = () => {
    return (
      <div className="subscribe">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="标题" name="title">
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="分类"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="分类" onChange={onGenderChange} allowClear>
              {categoryList?.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="季" name="season">
            <InputNumber min={1} max={10} defaultValue={""} />
          </Form.Item>

          <Form.Item label="qb必须包含" name="must_contain">
            <Input />
          </Form.Item>

          <Form.Item label="qb必须不包含" name="must_not_contain">
            <Input />
          </Form.Item>

          <Form.Item label="qb剧集过滤" name="episode_filter">
            <Input />
          </Form.Item>

          <Form.Item
            label="开启qb智能剧集过滤"
            name="smart_filter"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox></Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              订阅
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className="content VideoInfo">
      <div className="title">
        {info?.name_cn || info?.name || ""} <span>{info?.platform || ""}</span>
      </div>
      <div className="VideoInfoMain">
        <div className="left">
          <img className="leftImg" src={info?.images?.large || noImg} alt="" />
          {(info?.infobox || []).map((item) => {
            return renderDetailed(item);
          })}
        </div>

        <div className="right">
          <div className="main">
            <div className="mainLeft">
              <div className="mainTitle">动漫简介</div>
              <div className="mainInfo">{info?.summary || ""}</div>
              <div className="tagBox">
                <div className="tagTitle">
                  大家将 {info?.name_cn || info?.name || ""} 标注为
                </div>
                {(info?.tags || []).map((tag) => (
                  <Tag
                    key={tag.name}
                    style={{ marginBottom: "5px" }}
                    color="blue"
                  >
                    {tag.name}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="mainRight">
              <div className="rightTitle">角色介绍</div>
              <div className="charactersBox">
                {characters?.map((item, ind) => {
                  if (ind < 9) {
                    return (
                      <div className="character" key={item.name}>
                        <img
                          src={item?.images?.medium}
                          className="characterImg"
                        />
                        <div className="characterInfo">
                          <div className="characterName">
                            {item.relation}：{item.name}
                          </div>
                          <div className="characterCV">
                            CV：{" "}
                            {item?.actors.map((i, index) => {
                              if (index === 0) {
                                return i.name;
                              } else {
                                return `/${i.name}`;
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>

          <div className="footer">{renderRssInfo()}</div>
        </div>
      </div>
    </div>
  );
}
