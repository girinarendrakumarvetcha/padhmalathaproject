export  function getShortCode(str){
  return str.replace(/\s+/g, '_').toLowerCase();
}

export  function getFromShortCode(props,event,field){
  props.change(field,event.target.value.replace(/\s+/g, '_').toLowerCase());
}
