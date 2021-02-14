const geoToEng = {
    'ა':'a',
    'ბ':'b',
    'გ':'g',
    'დ':'d',
    'ე':'e',
    'ვ':'v',
    'ზ':'z',
    'თ':'t',
    'ი':'i',
    'კ':'k',
    'ლ':'l',
    'მ':'m',
    'ნ':'n',
    'ო':'o',
    'პ':'p',
    'ჟ':'zh',
    'რ':'r',
    'ს':'s',
    'ტ':'T',
    'უ':'u',
    'ფ':'f',
    'ქ':'q',
    'ღ':'gh',
    'ყ':'y',
    'შ':'sh',
    'ჩ':'ch',
    'ც':'c',
    'ძ':'dz',
    'წ':'ts',
    'ჭ':'ch\'',
    'ხ':'x',
    'ჯ':'j',
    'ჰ':'h'
}

const engToGeo = {
    'a':'ა',
    'b':'ბ',
    'c':'ც',
    'd':'დ',
    'e':'ე',
    'f':'ფ',
    'g':'გ',
    'h':'ჰ',
    'i':'ი',
    'j':'ჯ',
    'k':'კ',
    'l':'ლ',
    'm':'მ',
    'n':'ნ',
    'o':'ო',
    'p':'ქ',
    'r':'რ',
    's':'ს',
    't':'თ',
    'u':'უ',
    'v':'ვ',
    'w':'წ',
    'x':'ხ',
    'y':'ყ',
    'z':'ზ',
    'S':'შ',
    'C':'ჩ',
    'R':'ღ',
    'sh':'შ',
    'dz':'ძ',
    'gh':'ღ',
    'W':'ჭ',
    'zh':'ჟ'
}

/* from X => Geo => Eng */
export function translit(names) {
    let res = [];
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let n = '';
        for (let j = 0; j < name.length; j++){
            let char = name[j];
            if (engToGeo[char]!==undefined){
                char=engToGeo[char];
            }
            if (geoToEng[char]!==undefined){
                char=geoToEng[char];
            }
            n+=char;
        }
        res.push(n);
    }
    console.log(res);
    return res;
}
