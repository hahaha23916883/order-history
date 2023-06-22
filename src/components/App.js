import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import liff from "@line/liff";
import OrderCard from "./OrderCard";
import ServeCard from "./ServeCard";
import "../index.css";

export default function App() {
  const [liffID, setLiffID] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [leagueData, setLeagueData] = useState([]);
  const [serveData, setServeData] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const bot_sid = params.get("bot_sid");
  const uid = params.get("uid");
  const list_type = params.get("list_type");
  useEffect(() => {
    // 一般商品
    const define = "general";
    const url = `https://flashfalcon.ngrok.io/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=${list_type}&define=${define}`;

    axios
      .get(url)
      .then((response) => {
        setOrderData(response.data[0].contents);
        setLiffID(response.data[0].liffid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    // 聯合商品
    const define = "league_on";
    const url = `https://flashfalcon.ngrok.io/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=${list_type}&define=${define}`;
    axios
      .get(url)
      .then((response) => {
        setLeagueData(response.data[0].contents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // 預約活動
    const define = "serve_info";
    const url = `https://flashfalcon.ngrok.io/product_transaction_list_api/?bot_sid=${bot_sid}&uid=${uid}&list_type=${list_type}&define=${define}`;
    axios
      .get(url)
      .then((response) => {
        setServeData(response.data[0].contents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [openDetail, setOpenDetail] = useState(false);
  function listDetailHandle(id) {
    if (openDetail == false) {
      document.querySelectorAll(".list-detail-content")[id].style.display =
        "block";
      document.querySelectorAll(".up-icon")[id].style.display = "inline-block";
      document.querySelectorAll(".down-icon")[id].style.display = "none";
      setOpenDetail(true);
    } else {
      document.querySelectorAll(".list-detail-content")[id].style.display =
        "none";
      document.querySelectorAll(".up-icon")[id].style.display = "none";
      document.querySelectorAll(".down-icon")[id].style.display =
        "inline-block";
      setOpenDetail(false);
    }
  }

  // 點擊付款>傳送指定訂單sn>關閉網頁liff
  function payHandle(id) {
    console.log(liffID);
    var liffid = liffID;

    liff
      .init({
        liffId: liffid,
      })
      .then(function () {
        console.log("LIFF init");

        var context = liff.getContext();
        console.log(context);

        // 取得使用者公開資料
        // 後台的「Scopes」要設定開啟 profile, openid
        liff.getProfile().then(function (profile) {
          console.log(profile);
        });

        liff
          .sendMessages([
            {
              type: "text",
              text: orderData[id].sn,
            },
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log("error", err);
          });
        // 取得使用者 email
        // 後台的 Email address permission 要是「Applied」
        // LIFF 的設定，Scopes 的「email*」要打勾
        // 使用者在登入時，「電子郵件帳號」也要是「許可」的
        var user = liff.getDecodedIDToken();
        // var email = user.email;
        var userid = user.sub;
        document.getElementById("uid").value = userid;
        // console.log(email);
      })
      .catch(function (error) {
        console.log(error);
      });

    window.onload = function () {
      var auto = setTimeout(function () {
        autoRefresh();
      }, 100);

      function autoRefresh() {
        clearTimeout(auto);
        auto = setTimeout(function () {
          liff.closeWindow();
        }, 500);
      }
    };
  }
  return (
    <div>
      <header>訂單紀錄</header>
      <div className="tab-body"></div>
      <Tabs>
        <TabList>
          <Tab>一般商品</Tab>
          <Tab>聯合採購商品</Tab>
          <Tab>預約活動</Tab>
        </TabList>
        <TabPanel>
          <div className="order">
            {orderData.length > 0 ? (
              orderData.map((content, index) => {
                return (
                  <OrderCard
                    key={index}
                    id={index}
                    sn={content.sn}
                    date={content.deadline}
                    ship={content.info.shipping}
                    add={content.info.add}
                    total={content.product_amount + content.shipping_amount}
                    state={content.state}
                    payState={content.state_pay}
                    content={content.content}
                    listDetailHandle={listDetailHandle}
                    payHandle={payHandle}
                  />
                );
              })
            ) : (
              <p className="no-value-p">尚無紀錄</p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="order">
            {leagueData.length > 0 ? (
              leagueData.map((content, index) => {
                return (
                  <OrderCard
                    key={index}
                    id={index}
                    sn={content.sn}
                    date={content.deadline}
                    ship={content.info.shipping}
                    add={content.info.add}
                    total={content.product_amount + content.shipping_amount}
                    state={content.state}
                    payState={content.state_pay}
                    content={content.content}
                    listDetailHandle={listDetailHandle}
                  />
                );
              })
            ) : (
              <p className="no-value-p">尚無紀錄</p>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="order">
            {serveData.length > 0 ? (
              serveData.map((content, index) => {
                return (
                  <ServeCard
                    key={index}
                    id={index}
                    sn={content.sn}
                    amount={content.product_amount}
                    state={content.state}
                    payState={content.state_pay}
                    deadline={content.deadline}
                    time={content.time}
                    name={content.content[0].name}
                    hangman={content.content[0].hangman}
                    price={content.content[0].price}
                  />
                );
              })
            ) : (
              <p className="no-value-p">尚無紀錄</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
