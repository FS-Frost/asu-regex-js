console.log("var asu = asu");

var raw = "Dialogue: 0,1:23:45.67,2:34:56.78,Chitanda,actor,12,23,34,fx,{\\org(83,0.56)\\t(10,20,30,\\fs32\\be2\\pos(12,-12.14))\\fs32}Kirino-san";
console.log(raw);

var l = asu.parseLine(raw)
console.table(l);

var items = asu.parseContent(l.content)
console.table(items);

console.log(asu.contentsToString(items));
