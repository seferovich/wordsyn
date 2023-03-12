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
      
        this.keyMap[index].push([key, value])
        
      }
  
  
      get(key){
        let index = this._hash(key)
        if(this.keyMap[index]){
          for(let i = 0; i < this.keyMap[index].length; i++){
            if(this.keyMap[index][i][0] === key){
              return this.keyMap[index][i][1]
            }
          }
        }
        return undefined
      }
      
      getAll(){
        let all = []
  
        for(let i = 0; i < this.keyMap.length; i++){
          if(this.keyMap[i]){
            for(let j = 0; j < this.keyMap[i].length; j++){
              all.push(this.keyMap[i][j])
            }
          }
        }
        return all
      }
      
}


let ht = new HashTable()
let wordList = []
// clean wash
export const create = (arr) => {
  // First, we check if the array of synonyms exists.
  let found = false
  let wordListIndex
  for(let i = 0; i < arr?.length; i++){
    const index = ht.get(arr[i])
    
    if(index !== undefined){
      // If it does, we just filter the array so it doesn't containg old synonyms and concat the array
      let syn = arr.filter((w, i) => !wordList[index].includes(w))
      wordListIndex = index
      wordList[index] = wordList[index].concat(syn)
      found = true
    }
  } 
  // If it doesn't, we make a new array of synonyms
  if(!found){
    wordList.push(arr)
  }

  // Loop through each word and check if it exists
  arr.forEach(word => {
    let index = ht.get(word)
    // If it doesn't exist, make a new entry in hash table
    if(index === undefined){
      // If the index we found in the for loop above isn't undefined, we set it as the index of the array of synonyms from the wordList,
      // but if it doesn't exist (undefined), or it was just created, it means that it's the last array in the wordList array.
      
      ht.set(word, wordListIndex === undefined ? wordList.length - 1 : wordListIndex)
    }
    
  })
  

}

export const search = (word) => {
  const index = ht.get(word)
  return wordList[index]
}

