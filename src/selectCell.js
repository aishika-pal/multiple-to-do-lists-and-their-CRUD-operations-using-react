import React from "react";

function selectCell(list, colors ) {
  
  let res = [];
  for (let i of arguments) {
    for (let j=0; j<i.length; j++) {
      if (res[j]) {
        res[j] = {...res[j], color: i[j]}
      } else {
        res[j] = {listID: i[j].listID}
      }
    }
  }
  return res;
}

export default selectCell;