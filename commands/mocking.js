const uwufy = require('uwufy')
const _ = require('lodash')
module.exports = {
    name: 'mocking',
    description: 'carlo retard',
    usage: 'mocking [message]',
    execute(msg,args){
        var [_, ...toMocking] = args
        
        msg.channel.send(mocking(toMocking))
    }
};
var dictionary = {
    'a' : ['a','4','@','A'],
    'b' : ['b','8','B','&', '666'],
    'c' : ['c', 'C', '('],
    'd' : ['d', 'D'],
    'e' : ['e', 'E', '3'],
    'f' : ['f', 'F'],
    'g' : ['g', 'G', '9'],
    'h' : ['h', 'H', '#'],
    'i' : ['i', 'I', '1'],
    'j' : ['j', 'J', '7'],
    'k' : ['k', 'K'],
    'l' : ['l', 'L'],
    'm' : ['m', 'M'],
    'n' : ['n', 'N'],
    'o' : ['o', 'O', '0'],
    'p' : ['p', 'P'],
    'q' : ['q','Q'],
    'r' : ['r', 'R'],
    's' : ['s', 'S', '5', '$'],
    't' : ['t', 'T', '7'],
    'u' : ['u', 'U'],
    'v' : ['v', 'V'],
    'w' : ['w', 'W', 'vv', 'VV'],
    'x' : ['x', 'X', 'xXx', 'XxX'],
    'y' : ['y', 'Y'],
    'z' : ['z', 'Z']


}
function mocking(toMocking){
    var huruf = String(toMocking.join(' ')).toLowerCase()
    huruf = Array.from(huruf)
    hasil = ""
    
    _.forEach(huruf, function(value) {
        if((/[a-zA-Z]/).test(value))
        {
            var random = Math.floor((Math.random() * 10))
            var value = dictionary[value][random%dictionary[value].length]
        }
        hasil+=value + ""
    })
    return hasil
}
