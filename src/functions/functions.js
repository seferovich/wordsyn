let words = [{
    word: '',
    syn: []
}]


export const search = (val) => {
    let start = 0
    let end = words.length - 1
    let middle = Math.floor((start + end) / 2 )
    if(val === ''){
        return 
    }
    while(words[middle].word !== val && start <= end){
        
        if(words[middle].word > val){
            end = middle - 1
        }else{
            start = middle + 1
        }

        middle = Math.floor((start + end) / 2 )

    }
    return (words[middle].word === val) ? words[middle].syn : -1
}

// Function that is same as the one above, it just returns an index of a word
const searchForIndex = (val) => {
    let start = 0
    let end = words.length - 1
    let middle = Math.floor((start + end) / 2 )
    if(val === ''){
        return 
    }
    while(words[middle].word !== val && start <= end){
        
        if(words[middle].word > val){
            end = middle - 1
        }else{
            start = middle + 1
        }

        middle = Math.floor((start + end) / 2 )

    }
    return (words[middle].word === val) ? middle : -1
}

export const create = (word1, word2) => {
    // First, we check if the word exists
    const word1Index = searchForIndex(word1)
    const word2Index = searchForIndex(word2)

    // If a word already exists and it doesn't include the synonym, we push the other word(synonym) to it
    if(word1Index >= 0 && !(words[word1Index].syn.includes(word2))){
        words[word1Index].syn.push(word2) 
    }

    if(word2Index >= 0 && !(words[word2Index].syn.includes(word1))){  
        words[word2Index].syn.push(word1)     
    }

    // If nothing found, create a new word
    if(word1Index < 0){
        words.push({word: word1, syn: [word2]})
    }

    if(word2Index < 0){
        words.push({word: word2, syn: [word1]})
    }
    // Transitive rule
    

    // Finally, we sort the array alphabetically
    words.sort(function compare(a, b) {
        if ( a.word < b.word ){
          return -1;
        }
        if ( a.word > b.word ){
          return 1;
        }
        return 0;
      })
    
}





