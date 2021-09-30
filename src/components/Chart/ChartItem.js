import React from "react";

const ChartItem = () => {
  return (
    <>
      <div className="lg:flex lg:-mx-4">
        <div classNameName="lg:w-1/2 lg:px-4">
          <div className="card p-5">
            <h3>Area</h3>
            <div className="mt-5">
              Chart
              <canvas id="lineWithShadowElement"></canvas>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ChartItem;
