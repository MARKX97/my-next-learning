// "use client";

const DynamicChildren = () => (
  <div
    onClick={() => {
      console.log(2222);
    }}
  >
    <p>This is Dynamic Children.</p>
  </div>
);

export default DynamicChildren;
