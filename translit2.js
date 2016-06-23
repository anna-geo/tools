function translit(text){

// Массив для транслитерации
    var transl = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh',
    'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch','э':'e','ю':'yu','я':'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'О': 'O', 'П': 'P', 'Р': 'R','С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh',
    'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch','ъ': '', 'ы': 'y', 'ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    var result = '';

    for (var i=0;i<text.length;i++){
        if (transl[text[i]]!=undefined){
            result += transl[text[i]];
        }
        else{
            result += text[i];
        };
    };

    return result;
}

fs = require('fs')
fs.readFile('./streets.geojson', 'utf8', function (err,data) {

  if (err) {
    return console.log(err);
  }
  var geojson = JSON.parse(data);
  var features = geojson.features;

  features.forEach(function(feature,i,features){
  	var translation = translit(feature.properties['NAME']);
  	feature.properties.translation = translation;
  });

  var results = JSON.stringify(geojson, null, 4);

  fs.writeFile("./test.geojson", results, 'utf-8', function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });

});
