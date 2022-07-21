import { useState } from 'react';


export function AddColor() {
  const [color, setColor] = useState('deepskyblue');
  const colorStyle = {
    backgroundColor: color,
  };
  const InnitialColorList = ["red", "purple", "black"];
  const [colorList, setColorList] = useState(InnitialColorList);
  return (
    <div className='color-container'>
      <input style={colorStyle} className='text-bar' onChange={(event) => setColor(event.target.value)} placeholder="Enter your favourite color" value={color}></input>
      <button className='color-button' onClick={() => setColorList([...colorList, color])}>Add</button>
      {colorList.map((clr, index) => (
        <ColorBox color={clr} key={index} />
      ))}
    </div>
  );
}
function ColorBox({ color }) {

  const colorBoxStyles = {
    width: "210px",
    height: "30px",
    backgroundColor: color,
    marginTop: "5px",
  };
  return (
    <div className='color-box' style={colorBoxStyles}>

    </div>
  );
}
