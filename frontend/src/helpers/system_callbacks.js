export  function getShortCode(str){
  return str.replace(/\s+/g, '_').toLowerCase();
}

export  function getFromShortCode(event,props,field){
  props.change(field,event.target.value.replace(/\s+/g, '_').toLowerCase());
}


export  function getFromPrintName(event,props,field){
  props.change(field,event.target.value);
}

export  function checkArray(dataArr){
  return (typeof dataArr != 'undefined' && dataArr.length > 0 ) ?  1 : 0;
}

