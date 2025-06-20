function shapeRawData(json: any): any[] {
    const items = json?.rss?.channel?.item;
  
    if (!items) return [];
  
    return Array.isArray(items) ? items : [items]; 
}

export default shapeRawData;
  