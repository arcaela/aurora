const HTMLElement = window.HTMLElement;
HTMLElement.is = obj=>(obj&&((typeof obj==="object")&&(obj.nodeType===1)||(obj instanceof HTMLElement)));
export default HTMLElement;