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
    
    add = (c: string):void => {
        const preHash = c.charCodeAt(0)
        this.hashValue = preHash * Math.pow(this.alphabetSize, this.charCount)
        this.charCount++
    }

    skip = (c: string): void => {
        const preHash = c.charCodeAt(0)        
        this.hashValue = this.hashValue - (preHash * Math.pow(this.alphabetSize, this.charCount - 1))
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