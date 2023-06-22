import React, { useState } from "react";

export default function ServeCard(props) {
  return (
    <div className="serve order-body">
      <h3 className="serve-time">{props.time}</h3>
      <hr />
      <div className="serve-content">
        <div>
          <p>
            {props.name} / {props.hangman}
          </p>
          <div>
            $<p>{props.price}</p>
          </div>
        </div>
        <p className="serve-state">{props.state}</p>
      </div>
      <hr />
      <div className="serve-btn-body">
        <button className="serve-btn">取消預約</button>
        <button className="serve-btn">點擊付款</button>
      </div>
    </div>
  );
}
