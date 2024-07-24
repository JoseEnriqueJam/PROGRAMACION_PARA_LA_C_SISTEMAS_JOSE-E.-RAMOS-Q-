class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this._dfs(node, prefix);
    }

    _dfs(node, prefix) {
        let suggestions = [];
        if (node.isEndOfWord) {
            suggestions.push(prefix);
        }
        for (let char in node.children) {
            suggestions = suggestions.concat(this._dfs(node.children[char], prefix + char));
        }
        return suggestions;
    }
}