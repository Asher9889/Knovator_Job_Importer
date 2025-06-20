function shapeRawData(json: any): any[] {
    const items = json?.RSS?.CHANNEL?.ITEM;

  
    if (!items) return [];
  
    return Array.isArray(items) ? items : [items]; 
}

export default shapeRawData;
  