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

  

  remove(key){
    let index = this._hash(key)
    if(this.keyMap[index]){
      for(let i = 0; i < this.keyMap[index].length; i++){
        if(this.keyMap[index][i][0] === key){
          this.keyMap[index].splice(i, 1)
        }
      }
    }
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

// So basically, we have a word list outisde the hash table.
// The hash table key is a word and the value is the index of the array of syonyms in the word list array.
// It's easier to edit, remove and update the words like that.
let ht = new HashTable()
let wordList = []

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
  if(wordList[index]){
    return wordList[index]
  }else{
    return undefined
  }   
}

export const changeWord = (word, newWord) => {
  const index = ht.get(word)
  
  // Search for the word and change it
  for(let i = 0; i < wordList[index].length; i++){
    if(wordList[index][i] === word){
      wordList[index][i] = newWord
    }
  }
  // Remove the old word from ht and add the new one
  ht.remove(word)
  ht.set(newWord, index)

  
}


export const remove = (word) => {
  // Get the index in the word list
  const index = ht.get(word)
  
  // Search for the word in the word list and remove it
  for(let i = 0; i < wordList[index].length; i++){
    if(wordList[index][i] === word){
      wordList[index].splice(i, 1)
    }
  }
  // Remove the word from hash table
  ht.remove(word)  
}

export const getAll = () => {
  return wordList
}
