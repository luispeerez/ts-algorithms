class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert = (word: string) => {
    let n: TrieNode | undefined = this.root;
    let i = 0;

    // Move forward in the tree if characters from word exist
    while (i < word.length) {
      // TODO: Check how to handle undefined case for TS with map.has
      if (n && n.children.has(word[i])) {
        n = n.children.get(word[i]);
      } else {
        break;
      }

      i++;
    }

    // Create the remaining chars, that dont exist in the tree path
    while (i < word.length) {
      // TODO: Check how to handle undefined case for TS with map.has
      n?.children.set(word[i], new TrieNode());
      n = n?.children.get(word[i]);
      i++;
    }

    if (n) {
      //console.log("last n", n);
      n.isEndOfWord = true;
    }

    console.log("ending insert", this.root);
  };

  search = (word: string): boolean => {
    let n: TrieNode | undefined = this.root;
    let i = 0;
    while (i < word.length) {
      if (n && n.children.has(word[i])) {
        n = n.children.get(word[i]);
      } else {
        return false;
      }
      i++;
    }

    return !!n && n.isEndOfWord;
  };

  remove = (word: string): number => {
    this.removeHelper(this.root, word, 0);
    console.log("trie after remove", this.root);
    return 1;
  };

  removeHelper = (current: TrieNode, word: string, i: number): boolean => {
    if (i === word.length) {
      if (!current.isEndOfWord) {
        return false;
      }

      current.isEndOfWord = false;
      return current.children.size === 0;
    }

    let char = word[i];
    let child = current.children.get(char);
    if (!child) {
      return false;
    }

    let shouldDeleteChild =
      this.removeHelper(child, word, i + 1) && !child.isEndOfWord;
    if (shouldDeleteChild) {
      current.children.delete(char);
      return current.children.size === 0;
    }

    return false;

    /*
    var res = this.removeHelper(n.children.get(word[i]), word, i + 1);
    console.log("res", res);
    if (res === 1) {
      n.children.delete(word[i]);
      return n.children.size ? -1 : 1;
    }

    return res;
    */
    //let n = parent.children.get(word[i])

    //if(this.removeHelper(n.children.get(word[i]), word, i+1))
  };
}

export default Trie;
