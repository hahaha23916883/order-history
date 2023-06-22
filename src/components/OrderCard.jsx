import React, { useState } from "react";
import DetailCard from "./DetailCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function OrderCard(props) {
  return (
    <div className="order-body">
      <div className="list-content">
        <p className="list-title">訂單編號</p>
        <p>{props.sn}</p>
      </div>
      <div className="list-content">
        <p className="list-title">訂單日期</p>
        <p>{props.date.substring(0, 10)}</p>
      </div>
      <div className="list-content">
        <p className="list-title">配送方式</p>
        <p>{props.ship}</p>
      </div>
      <div className="list-content">
        <p className="list-title">付款方式</p>
        <p>{props.payState}</p>
      </div>
      {props.payState.includes("待付款") && (
        <div
          className="pay-btn"
          onClick={() => {
            props.payHandle(props.id);
          }}
        >
          <p>付款</p>
        </div>
      )}
      <div className="list-content">
        <p className="list-title">收件資訊</p>
        <p>{props.add}</p>
      </div>
      <div className="image-list">
        {props.content.map((content, index) => {
          return <img className="image" key={index} src={content.url} />;
        })}
      </div>
      <div className="list-content">
        <p className="list-title">訂單金額</p>
        <div className="total">
          $ <p className="total-content">{props.total}</p>
        </div>
      </div>
      <div className="list-detail-content">
        {props.content.map((content, index) => {
          return (
            <DetailCard
              key={index}
              id={index}
              url={content.url}
              name={content.name}
              pcs={content.pcs}
              price={content.price}
              state={props.state}
            />
          );
        })}
      </div>
      <div
        className="list-detail"
        onClick={() => {
          props.listDetailHandle(props.id);
        }}
      >
        <p>訂單詳情</p>
        <FontAwesomeIcon className="down-icon" icon={faChevronDown} />
        <FontAwesomeIcon className="up-icon" icon={faChevronUp} />
      </div>
    </div>
  );
}
