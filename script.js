//нажатие на кнопку установить параграф
//если параграф не установить, то и нечего будет отображать
$(function () {
    $("#buttonSetFile").click(function () {
        setFile();
    });
});
//нажатие на кнопку показать даты
$(function () {
    $("#buttonGetDates").click(function () {
        //обращается к id=dates и выставляет там даты
        //getDatesSentences() возвращает строку с датами, разделенную "!"
        //здесь я ее разделяю двумя отступами(это "<br><br>"), чтобы выглядело по-человечески, можно спокойно ставить по-другому и так, как нравится
        $("#dates").html(getDatesSentences().replaceAll("!","<br><br>"));
    });
});
//нажатие на кнопку показать важные события
$(function () {
    $("#buttonGetImportant").click(function () {
        //обращается к id=important и выставляет там важну. информацию
        //getImportantSentences() возвращает строку с важной информацией, разделенную "!"
        //здесь я ее разделяю двумя отступами(это "<br><br>"), чтобы выглядело по-человечески, можно спокойно ставить по-другому и так, как нравится
        $("#important").html(getImportantSentences().replaceAll("!","<br><br>"));
    });
});





//то, что мой код

var file;
var sentenceList;
var sizeImp;
var sizeDat;
function setFile() {
    var file = $("#textArea").val().toString();
    $("#textArea").val('');
    file = file.replace(/[?!]/gi, ".").replace(/\n/gi, "").replace("́", "");
    while (file.includes("  ")) file = file.replace("  ", " ");
    var str = "";
    for (var i = 0; i < file.length - 1; i++)
        if (!((file.charAt(i) == '-') && (file.charAt(i - 1) != ' ') && (file.charAt(i + 1) != ' ')))
            str += file.charAt(i);
    this.file = str;
    sentenceList = getSentenceList();
    cutFile();
}

function cutFile() {
    var newFile = file.toLowerCase() + " ";
    newFile = newFile.replace(/(в|вши|вшись|ив|ивши|ившись|ыв|ывши|ывшись|ся|сь|ость|ост|ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею|ем|нн|вш|ющ|щ|ивш|ывш|ующ|ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно|ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я|а|и|нн|ейш|ейше|нейш|нейше|ь|)\s/gi, " ").replace(/[,.-]/gi, " ");
    return newFile;
}
function getSentenceList() {
    var charFile = file.split('');
    for (var i = 0; i < file.length; ++i)
        if (charFile[i] == '.' && (charFile[i - 1] != 'г') && ((charFile[i - 1] <= 'А' || charFile[i - 1] >= 'Я')))
            charFile[i] = '!';
    var newFile = charFile.join("");
    return newFile.split("!");
}
function getImportantSentences() {
    var wordMap = new Map();
    var importantSentences = "";
    var mostPopular = 0;
    var popularWord = [];
    var wordList = cutFile().split(" ");
    for (var s of wordList)
        if (s != "") {
            if (wordMap.has(s)) wordMap.set(s, wordMap.get(s) + 1);
            else wordMap.set(s, 1);
        }
    for (var key of wordMap.keys()) {
        if ((wordMap.get(key) > mostPopular) && (key.length > 3))
            mostPopular = wordMap.get(key);
    }
    for (var key of wordMap.keys())
        if ((wordMap.get(key) > mostPopular - 3) && (key.length > 3)) popularWord.push(key);
    for (var s of sentenceList)
        for (var pw of popularWord) {
            if (s.toLowerCase().includes(pw)) {
                importantSentences = importantSentences + s + "!";
                sizeImp++;
                break;
            }
        }
    if (importantSentences.indexOf("!") < 0) return "";
    return importantSentences.substring(0, importantSentences.length - 1);
}

function getDatesSentences() {
    var sentenceList = getSentenceList();
    var datesSentences = "";
    for (var s of sentenceList) {
        if (s.search(/\d\d\d/gi) != -1) {
            datesSentences = datesSentences + s + "!";
            sizeDat++;
        }
    }
    if (datesSentences.indexOf("!") < 0) return "";
    return datesSentences.substring(0, datesSentences.length - 1);
}
