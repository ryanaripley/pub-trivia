export function arrayToSentence (arr) {
  var len = arr.length;
  return arr.reduce(function(a,b,c){
      return a + (c - 1 === len ? ', ' : ' and ') + b;
  });
}
