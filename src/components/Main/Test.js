import React, { useState, useEffect } from 'react';

export default function Test() {
const initialCount = 0;
const [count, setCount] = useState(initialCount);

useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

return (

<div>

<p>Counter: {count}</p>

      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>

</div>

);

}