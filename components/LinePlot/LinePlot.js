import React, { useState, useEffect } from "react";
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from "victory";
import _ from "lodash";

const StreamGraph = () => {
  const [data, setData] = useState(getData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(getData());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function getData() {
    return Array.from({ length: 7 }, () => [
      { x: 1, y: _.random(1, 5) },
      { x: 2, y: _.random(1, 10) },
      { x: 3, y: _.random(2, 10) },
      { x: 4, y: _.random(2, 10) },
      { x: 5, y: _.random(2, 15) },
    ]);
  }

  return (
    <VictoryChart theme={VictoryTheme.material} animate={{ duration: 1000 }}>
      <VictoryStack colorScale="blue">
        {data.map((data, i) => (
          <VictoryArea key={i} data={data} interpolation="basis" />
        ))}
      </VictoryStack>
    </VictoryChart>
  );
};

export default StreamGraph;
