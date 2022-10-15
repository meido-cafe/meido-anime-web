import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {} from "antd";
import { getBangumiCalendar } from "../../server";
import noImg from "../../public/img/noImg.jpg";
import "./style.scss";

export default function VideoCalendar() {
  const navigate = useNavigate();
  const [weekDay, setWeekDay] = useState([]);
  useEffect(() => {
    getBangumiCalendar()
      .then((res) => {
        const { items } = res || {};
        setWeekDay(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const gotoInfo = (id) => {
    navigate("/VideoInfo", { state: { id } });
  };

  return (
    <div className="content VideoCalendar">
      {weekDay.map((day) => {
        const { weekday, items } = day;
        return (
          <div className="calendar" key={weekday?.id}>
            <div className="title">{weekday?.cn}</div>
            {items.map((item) => {
              return (
                <div className="videoInfo" key={item.id}>
                  <img
                    className="videoImg"
                    src={item?.images?.medium || noImg}
                    alt=""
                    onClick={() => {
                      gotoInfo(item.id);
                    }}
                  />
                  <div
                    className="videoName"
                    onClick={() => {
                      gotoInfo(item.id);
                    }}
                  >
                    {item?.name_cn || item?.name}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
