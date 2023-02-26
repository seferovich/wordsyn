// let words = [{
//     word: '',
//     syn: []
// }]

// export const search = (val) => {
//     let start = 0
//     let end = words.length - 1
//     let middle = Math.floor((start + end) / 2 )
//     if(val === ''){
//         return 
//     }
//     while(words[middle].word !== val && start <= end){
        
//         if(words[middle].word > val){
//             end = middle - 1
//         }else{
//             start = middle + 1
//         }

//         middle = Math.floor((start + end) / 2 )

//     }
//     return (words[middle].word === val) ? words[middle].syn : -1
// }

// // Function that is same as the one above, it just returns an index of a word
// const searchForIndex = (val) => {
//     let start = 0
//     let end = words.length - 1
//     let middle = Math.floor((start + end) / 2 )
//     if(val === ''){
//         return 
//     }
//     while(words[middle].word !== val && start <= end){
        
//         if(words[middle].word > val){
//             end = middle - 1
//         }else{
//             start = middle + 1
//         }

//         middle = Math.floor((start + end) / 2 )

//     }
//     return (words[middle].word === val) ? middle : -1
// }

// export const create = (word1, word2) => {
//     // First, we check if the word exists
//     const word1Index = searchForIndex(word1)
//     const word2Index = searchForIndex(word2)

//     // If a word already exists and it doesn't include the synonym, we push the other word(synonym) to it
//     if(word1Index >= 0 && !(words[word1Index].syn.includes(word2))){
//         words[word1Index].syn.push(word2) 
//     }

//     if(word2Index >= 0 && !(words[word2Index].syn.includes(word1))){  
//         words[word2Index].syn.push(word1)     
//     }

//     // If nothing found, create a new word
//     if(word1Index < 0){
//         words.push({word: word1, syn: [word2]})
//     }

//     if(word2Index < 0){
//         words.push({word: word2, syn: [word1]})
//     }
//     // Transitive rule
    

//     // Finally, we sort the array alphabetically
//     words.sort(function compare(a, b) {
//         if ( a.word < b.word ){
//           return -1;
//         }
//         if ( a.word > b.word ){
//           return 1;
//         }
//         return 0;
//       })
    
// }


export class HashTable {
    constructor(size=53){
      this.keyMap = new Array(size)
    }
  
    _hash(key) {
      let total = 0
      let PRIME_NUM = 31
      for (let i = 0; i < Math.min(key.length, 100); i++) {
        let char = key[i]
        let value = char.charCodeAt(0) - 96
        total = (total * PRIME_NUM + value) % this.keyMap.length
      }
      return total
    }
    
    set(key, value){
      let index = this._hash(key)
      if(!this.keyMap[index]){
        this.keyMap[index] = []
      }
      // We check if the key exists so we can update it if it does.
      let found = false
      
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          // Concatenate the new array of items with the existing array
          
          this.keyMap[index][i][1] = this.keyMap[index][i][1].concat(value)
  
          // create(this.keyMap[index][i][1])
          found = true
          
          break
        }
      }

      if(found){
        this.update(key, value)
      }

      
      

      
      
      // If the key was not found, add a new entry to the hash table
      if (!found) {
        this.keyMap[index].push([key, value])
      }
      
    }

    update(key, value){
      let syns = this.get(key)

      for(let i = 0; i < syns.length; i++){
        let wordSyns = this.get(syns[i])
        
        syns.filter(item => !wordSyns.includes(item))

        wordSyns.concat(syns)
        
          
      }
    }

    get(key){
      let index = this._hash(key)
      if(this.keyMap[index]){
        for(let i = 0; i < this.keyMap[index].length; i++){
          if(this.keyMap[index][i][0] === key) {
            return this.keyMap[index][i][1]
          }
        }
      }
      return undefined
    }
    
  }

let ht = new HashTable()

// We pass in all of the words and synonyms in a single array, and it makes 
export function create(arr) {
    arr.forEach((word, index) => {
      let syn = arr.filter((w, i) => i !== index)
      ht.set(word, syn)
    })
}

export function search (key){
  console.log(ht.keyMap)
  return ht.get(key)
    
}

create(['hello', 'hi', 'howdy'])


