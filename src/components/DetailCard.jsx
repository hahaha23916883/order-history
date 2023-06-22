import React, { useState } from "react";

export default function DetailCard(props) {
  return (
    <div className="list-detail-card">
      <div className="detail-content-header">
        <img className="image" src={props.url} />
        <div className="detail-content-header-text">
          <div className="product-num">
            <p>{props.name}</p>
            <p>x{props.pcs}</p>
          </div>
          <p id="note">無</p>
        </div>
      </div>
      <div className="detail-list">
        <div className="list-content">
          <p className="list-title">單價 : </p>
          <p>${props.price}</p>
        </div>
        {/* <div className="list-content">
          <p className="list-title">狀態 : </p>
          <p>{props.state}</p>
        </div> */}
      </div>
    </div>
  );
}
