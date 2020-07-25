class RollingHash {
    hashValue: number;
    alphabetSize: number;
    prime: number;
    charCount: number;

    constructor(){
        this.hashValue = 0
        this.alphabetSize = 256;
        this.prime = 101
        this.charCount = 0;
    }

    getH = () => {
        return Math.pow(this.alphabetSize, this.charCount - 1) % this.prime
    }
    
    add = (c: string):void => {
        const preHash = c.charCodeAt(0)
        this.hashValue = (this.alphabetSize * this.hashValue + preHash) % this.prime
        //this.hashValue = this.hashValue + preHash * Math.pow(this.alphabetSize, this.charCount)
        this.charCount++
    }

    skip = (c: string): void => {
        const preHash = c.charCodeAt(0)        
        //this.hashValue = this.hashValue - (preHash * Math.pow(this.alphabetSize, this.charCount - 1))
        //this.hashValue = this.hashValue * this.alphabetSize
        const h = this.getH()

        
        console.log("removing", c)
        
        //mit
        //this.hashValue = (this.hashValue - preHash * (h % this.prime ) ) % this.prime
        this.hashValue = (this.hashValue - preHash * (h % this.prime ) ) % this.prime
        /*
        // geekforgeeks
        this.hashValue = (this.alphabetSize * (this.hashValue - preHash * h)) % this.prime
        */
        this.hashValue = this.hashValue < 0 ? this.hashValue + this.prime : this.hashValue
        
        this.charCount--
    }

    hash = (): number => {
        return this.hashValue;
    }
}

const rabinKarp = (pattern: string, text:string): number => {
    if(pattern.length > text.length){
        return -1;
    }

    const rp = new RollingHash()
    const rt = new RollingHash()

    for(let i=0; i < pattern.length; i++){
        rp.add(pattern[i])
        rt.add(text[i])
    }

    if(rp.hash() === rt.hash() && areSameStrs(pattern, text, 0)){
        return 0;
    }

    for(let i = 0; i< (text.length - pattern.length); i++){
        console.log("hash comparing", pattern, rp.hash(), text.slice(i, i+pattern.length), rt.hash())
        if(rp.hash() === rt.hash() && areSameStrs(pattern, text, i)){
            return i;
        }
        rt.skip(text[i])
        rt.add(text[i+pattern.length])
    }

    return -1;
}

const areSameStrs = (s1: string, s2: string, textIndex: number) => {
    for(let i = 0; i<s1.length; i++){
        if(s1[i] !== s2[textIndex]){
            return false;
        }
        textIndex++;
    }
    return true;
}

export default rabinKarp