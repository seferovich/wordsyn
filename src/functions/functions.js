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
          // Concat the new array of items with the existing array
          this.keyMap[index][i][1] = this.keyMap[index][i][1].concat(value)
          found = true 
          break
        }
      }

      // If the key was not found, add a new entry to the hash table
      if (!found) {
        this.keyMap[index].push([key, value])
      } 
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

// We pass in all of the words and synonyms in a single array, and it makes all of the possible "outcomes".
// If I pass ['clean', 'wash', 'rinse'], it will pass:
// ('clean', ['wash', 'rinse']), ('wash', ['clean', 'rinse']) & ('rinse', ['clean', 'wash']) in the set function.
export function create(arr) {
    arr.forEach((word, index) => {
      let syn = arr.filter((w, i) => i !== index)
      ht.set(word, syn)
    })
    
    // The translative rule works when we add words the first time,
    // but if more synonyms are added after creating the initial word, the translative rule doesn't apply.
    // The word that we add synonyms to it, will always be last in the array. 
    // That's why we can update it this way after creating the words:

    // First, we get all synonyms of the word.
    let word = arr[arr.length - 1]
    let syns = ht.get(word)
    
    // Loop over them
    syns.forEach((word, index) => {
      // Get synonyms of the synonym
      let wordSyns = ht.get(word)
      // Filter, same as above
      let syn = syns.filter((w, i) => i !== index && !wordSyns.includes(w))
      // Create the word, but since the set function cheks if the word already exists,
      // it will just concat the other synonyms of the initial word, and it updates (adds all synonyms of init. word) with all other synonyms.
      ht.set(word, syn)
    })
    

    
}

export function search (key){
  return ht.get(key)
    
}

export function getAll(){
  return ht.getAll()
}



