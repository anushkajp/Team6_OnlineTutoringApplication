import React from 'react'

const DashboardTile = (props) => {
  const style = {
    width: props.width, 
    height: props.height,
    backgroundColor: props.backgroundColor,
    borderRadius: "30px"
};

  return (
    <div className={props.cln} style={style}>
        <h4>{props.title}</h4>
        {props.children}
    </div>
  )
}

export default DashboardTile;