import React from 'react'

const DashboardTile = (props) => {
  const style = {
    width: props.width, 
    height: props.height,
    backgroundColor: props.backgroundColor,
    borderRadius: props.border,
    margin: props.margin
};

  return (
    <div className={props.cln} style={style}>
        {props.title ? <h4 className="tile_title">{props.title}</h4> : <></>}
        {props.children}
    </div>
  )
}

export default DashboardTile;