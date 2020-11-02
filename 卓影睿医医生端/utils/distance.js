var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

var  gps ={
  bd09togcj02:function(bd_lon, bd_lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = bd_lon - 0.0065;
  var y = bd_lat - 0.006;
  console.log('xy',x,y)
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  console.log( '转换中间介质',z,theta)
  var o={};
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  //console.log('转换结果',o)
  return [gg_lng, gg_lat]
},
 transformlat:function(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
}
,
 transformlng:function(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
},

out_of_china:function(lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
},

gcj02towgs84:function(lng, lat) {
  if (this.out_of_china(lng, lat)) {
      return [lng, lat]
  }
  else {
      var dlat = this.transformlat(lng - 105.0, lat - 35.0);
      var dlng = this.transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [lng * 2 - mglng, lat * 2 - mglat]
  }
},

 getDistance:function(lngFrom, latFrom, lngTo, latTo){
  var rad = function (d) { //计算角度
    return d * Math.PI / 180.0;
  }
  var EARTH_RADIUS = 6378136.49;
  var radLatFrom = rad(latFrom);
  var radLatTo = rad(latTo);
  var a = radLatFrom - radLatTo;
  var b = rad(lngFrom) - rad(lngTo);
  var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
  distance = distance * EARTH_RADIUS;
  distance = Math.round(distance * 10000) / 10000;
  return parseFloat(distance.toFixed(0));
},

 GetDistance:function(lngFrombd, latFrombd, lngTotx, latTotx) {
  var vl =this.bd09togcj02(lngFrombd, latFrombd)
  var vf = this.gcj02towgs84(vl[0], vl[1])
  console.log('vl转后',vl)
  var vt = this.gcj02towgs84(lngTotx, latTotx)
  console.log('vt转后',vt)
  return this.getDistance(vf[0], vf[1], vt[0], vt[1])
}

}


 module.exports= gps
// module.exports= getDistance
// module.exports= GetDistance